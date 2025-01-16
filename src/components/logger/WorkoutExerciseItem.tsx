import React from "react";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import SetItem from "./SetItem";
import { ExerciseSet, ExerciseWithSets } from "@/types/models";
import CustomButton from "../general/CustomButton";
import { useWorkouts } from "@/app/store";

type WorkoutExerciseItem = {
  exercise: ExerciseWithSets;
};
const WorkoutExerciseItem = ({ exercise }: WorkoutExerciseItem) => {
  const { sets, name, id } = exercise;
  const addSet = useWorkouts((state) => state.addSet);
  return (
    <Card title={name}>
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
        onPress={() => addSet(id)}
        style={{ padding: 10, marginTop: 10 }}
      />
    </Card>
  );
};

export default WorkoutExerciseItem;
