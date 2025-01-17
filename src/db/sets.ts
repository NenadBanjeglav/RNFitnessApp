import { ExerciseSet } from "@/types/models";
import { getDB } from ".";
import { DbExerciseSet } from "@/types/db";

export const saveSet = async (set: ExerciseSet) => {
  try {
    const db = await getDB();

    await db.runAsync(
      `INSERT OR REPLACE INTO sets(id,exercise_id,reps,weight,one_rm) VALUES(?,?,?,?,?)
            `,
      set.id,
      set.exerciseId,
      set.reps ?? null,
      set.weight ?? null,
      set.oneRM ?? null
    );
  } catch (error) {
    console.log(error);
  }
};

const parseSet = (exerciseSet: DbExerciseSet): ExerciseSet => {
  return {
    id: exerciseSet.id,
    exerciseId: exerciseSet.exercise_id,
    reps: exerciseSet.reps,
    weight: exerciseSet.weight,
    oneRM: exerciseSet.one_rm,
  };
};

export const getSets = async (exerciseId: string): Promise<ExerciseSet[]> => {
  try {
    const db = await getDB();

    const sets = await db.getAllAsync<DbExerciseSet>(
      `SELECT * FROM sets WHERE exercise_id = ?`,
      exerciseId
    );

    return sets.map(parseSet);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteSet = async (setId: string) => {
  try {
    const db = await getDB();
    await db.runAsync("DELETE FROM sets WHERE id=?", setId);
  } catch (error) {
    console.log(error);
  }
};
