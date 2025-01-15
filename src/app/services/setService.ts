import { ExerciseSet } from "@/types/models";

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
