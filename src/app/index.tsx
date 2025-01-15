import CustomButton from "@/components/general/CustomButton";
import { View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import dummyWorkouts from "@/data/dummyWorkouts";
import { Link } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: "transparent",
      }}
    >
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume Workout" />
      </Link>

      <FlatList
        data={dummyWorkouts}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
