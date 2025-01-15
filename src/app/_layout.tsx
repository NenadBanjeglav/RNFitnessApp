import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="workout/current" options={{ title: "Workout" }} />
      <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
    </Stack>
  );
};

export default RootLayout;
