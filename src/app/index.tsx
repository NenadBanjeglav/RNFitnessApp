import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderWidth: 1,
      }}
    >
      <Link href="/workout/current">Resume Current Workout</Link>
      <Link href="/workout/123">Open Workout with id 123</Link>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
