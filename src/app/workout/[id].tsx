import { Text } from "@/components/general/Themed";
import WorkoutExerciseItem from "@/components/workouts/WorkoutExerciseItem";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { useWorkouts } from "../store";

const WorkoutScreen = () => {
  const { id } = useLocalSearchParams();

  const workout = useWorkouts((state) =>
    state.workouts.find((workout) => workout.id === id)
  );

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      contentContainerStyle={{ gap: 8, padding: 8 }}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={
        <>
          <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>
            Workout Details
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            {dayjs(workout.createdAt).format("dddd, D MMM")}
          </Text>
        </>
      }
    />
  );
};

export default WorkoutScreen;
