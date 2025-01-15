import { Text } from "@/components/general/Themed";
import WorkoutExerciseItem from "@/components/workouts/WorkoutExerciseItem";
import dummyWorkouts from "@/data/dummyWorkouts";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const WorkoutScreen = () => {
  const { id } = useLocalSearchParams();

  const workout = dummyWorkouts.find((w) => w.id === id);

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
