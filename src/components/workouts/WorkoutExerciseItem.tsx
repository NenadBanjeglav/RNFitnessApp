import React from "react";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import { ExerciseWithSets } from "@/types/models";
import { getBestSet } from "@/app/services/setService";
import Colors from "@/constants/Colors";

type WorkoutExerciseItem = {
  exercise: ExerciseWithSets;
};

const WorkoutExerciseItem = ({ exercise }: WorkoutExerciseItem) => {
  const bestSet = getBestSet(exercise.sets);
  return (
    <Card title={exercise.name}>
      {exercise.sets.map((set, i) => (
        <View
          key={set.id}
          style={[
            { flexDirection: "row", gap: 15, padding: 8 },
            {
              backgroundColor:
                set.id === bestSet?.id
                  ? Colors.dark.tint + "50"
                  : "transparent",
            },
          ]}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>{i + 1}.</Text>

          <Text style={{ fontSize: 16 }}>
            {set.reps}
            {set.weight ? `x ${set.weight} kg` : `reps`}
          </Text>
          {set.oneRM && (
            <Text
              style={{ fontSize: 16, marginLeft: "auto", fontWeight: "bold" }}
            >
              {set.oneRM} kg
            </Text>
          )}
        </View>
      ))}
    </Card>
  );
};

export default WorkoutExerciseItem;
