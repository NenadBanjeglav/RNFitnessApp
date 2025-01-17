import { deleteSet, saveSet } from "@/db/sets";
import { ExerciseSet } from "@/types/models";
import * as Crypto from "expo-crypto";

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    // Calculate effective oneRM for each set
    const currentOneRM = calculateEffectiveOneRM(set);
    const bestOneRM = bestSet ? calculateEffectiveOneRM(bestSet) : 0;

    return currentOneRM! > bestOneRM! ? set : bestSet;
  }, null);
};

// Helper function to calculate effective oneRM
const calculateEffectiveOneRM = (set: ExerciseSet) => {
  if (set.oneRM !== null) {
    return set.oneRM;
  }
  if (set.weight === null) {
    // Bodyweight exercise: estimate oneRM based on reps
    const bodyweightFactor = 1; // Adjust based on assumptions (e.g., 1 for bodyweight pull-ups)
    return (set.reps || 0) * bodyweightFactor;
  }
  // Weighted exercise: calculate oneRM using standard formula
  return (set.weight || 0) * (1 + (set.reps || 0) / 30);
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const createSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId,
  };
  return newSet;
};

export const updateSet = (
  set: ExerciseSet,
  updatedFields: Pick<ExerciseSet, "reps" | "weight">
) => {
  const updatedSet = { ...set };
  if (updatedFields.reps !== undefined) {
    updatedSet.reps = updatedFields.reps;
  }
  if (updatedFields.weight !== undefined) {
    updatedSet.weight = updatedFields.weight;
  }

  if (updatedSet.weight !== undefined && updatedSet.reps !== undefined) {
    updatedSet.oneRM = updatedSet.weight * (36.0 / (37.0 - updatedSet.reps));
  }

  saveSet(updatedSet);

  return updatedSet;
};

const isSetComplete = (set: ExerciseSet) => {
  return set.reps && set.reps > 0;
};

export const cleanSets = (sets: ExerciseSet[]) => {
  const completeSets = sets.filter(isSetComplete);

  const incompleteSets = sets.filter((s) => !isSetComplete(s));

  incompleteSets.forEach(({ id }) => deleteSet(id));

  return completeSets;
};
