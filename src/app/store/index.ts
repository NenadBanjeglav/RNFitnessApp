import { ExerciseSet, WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  finishWorkout,
  getCurrentWorkoutWithExercises,
  getWorkoutsWithExercises,
  newWorkout,
} from "../services/workoutService";
import { createExercise } from "../services/exerciseService";
import { createSet, updateSet } from "../services/setService";
import { current } from "immer";
import { deleteSet } from "@/db/sets";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  loadWorkout: VoidFunction;
  startWorkout: () => void;
  finishWorkout: () => void;

  addExercise: (name: string) => void;

  addSet: (exerciseid: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, "reps" | "weight">
  ) => void;

  deleteSet: (setId: string) => void;
};

export const useWorkouts = create<State & Actions>()(
  immer<State & Actions>((set, get) => ({
    currentWorkout: null,
    workouts: [],

    loadWorkout: async () => {
      set({
        currentWorkout: await getCurrentWorkoutWithExercises(),
        workouts: await getWorkoutsWithExercises(),
      });
    },

    startWorkout: () => {
      set({ currentWorkout: newWorkout() });
    },

    finishWorkout: () => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }

      const finishedWorkout = finishWorkout(currentWorkout);

      set((state) => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout);
      });
    },

    addExercise: (name: string) => {
      const { currentWorkout } = get();
      if (!currentWorkout) {
        return;
      }

      const newExercise = createExercise(name, currentWorkout.id);

      set((state) => {
        state.currentWorkout?.exercises.push(newExercise);
      });
    },

    addSet: (exerciseId: string) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(
          (e) => e.id === exerciseId
        );

        exercise?.sets.push(newSet);
      });
    },

    updateSet: (setId, updatedFields) => {
      set(({ currentWorkout }) => {
        if (!currentWorkout) {
          return;
        }

        // Find the exercise containing the set
        const exercise = currentWorkout.exercises.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );

        // Find the index of the set to update
        const setIndex = exercise?.sets.findIndex((set) => set.id === setId);

        if (!exercise || setIndex === undefined || setIndex === -1) {
          return; // If set is not found, exit
        }

        // Update the set using the provided `updateSet` service
        const updatedSet = updateSet(
          current(exercise.sets[setIndex]),
          updatedFields
        );

        exercise.sets[setIndex] = updatedSet;
      });
    },

    deleteSet: (setId) => {
      deleteSet(setId);
      set(({ currentWorkout }) => {
        if (!currentWorkout) {
          return;
        }
        const exercise = currentWorkout?.exercises.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );

        if (!exercise) {
          return;
        }
        exercise.sets = exercise?.sets.filter((set) => set.id !== setId);

        if (exercise.sets.length === 0) {
          currentWorkout.exercises = currentWorkout?.exercises.filter(
            (ex) => ex.id !== exercise.id
          );
        }
      });
    },
  }))
);
