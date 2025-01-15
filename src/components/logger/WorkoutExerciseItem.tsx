import React from "react";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import SetItem from "./SetItem";
import { ExerciseSet } from "@/types/models";
import CustomButton from "../general/CustomButton";

const WorkoutExerciseItem = () => {
  const sets: ExerciseSet[] = [
    { id: "1", weight: 20, reps: 18, exerciseId: "e1" },
    { id: "2", weight: 25, reps: 15, exerciseId: "e1" },
    { id: "3", weight: 30, reps: 12, exerciseId: "e2" },
    { id: "4", weight: 35, reps: 10, exerciseId: "e2" },
    { id: "5", weight: 40, reps: 8, exerciseId: "e3" },
    { id: "6", weight: 45, reps: 6, exerciseId: "e3" },
    { id: "7", weight: 50, reps: 5, exerciseId: "e4" },
    { id: "8", weight: 55, reps: 4, exerciseId: "e4" },
  ];
  return (
    <Card title="Exercise">
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          gap: 5,
        }}
      >
        <Text style={{ marginRight: "auto" }}>Set</Text>
        <Text style={{ width: 60, textAlign: "center", fontWeight: "bold" }}>
          kg
        </Text>
        <Text style={{ width: 60, textAlign: "center", fontWeight: "bold" }}>
          Reps
        </Text>
      </View>

      <View style={{ gap: 5 }}>
        {sets.map((set, i) => (
          <SetItem key={set.id} index={i} set={set} />
        ))}
      </View>
      <CustomButton
        title="+ Add Set"
        type="link"
        onPress={() => console.warn("Adding Set")}
        style={{ padding: 10, marginTop: 10 }}
      />
    </Card>
  );
};

export default WorkoutExerciseItem;
