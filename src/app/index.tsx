import CustomButton from "@/components/general/CustomButton";
import { View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import { Link, router } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { useWorkouts } from "./store";

const HomeScreen = () => {
  const currrentWorkout = useWorkouts((state) => state.currentWorkout);
  const startWorkout = useWorkouts((state) => state.startWorkout);
  const workouts = useWorkouts((state) => state.workouts);

  const onStartWorkout = () => {
    startWorkout();
    router.push("/workout/current");
  };

  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: "transparent",
      }}
    >
      {currrentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume Workout" />
        </Link>
      ) : (
        <CustomButton title="Start New Workout" onPress={onStartWorkout} />
      )}

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
