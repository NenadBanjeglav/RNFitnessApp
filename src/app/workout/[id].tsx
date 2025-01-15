import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const WorkoutScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>WorkoutScreen: {id}</Text>
    </View>
  );
};

export default WorkoutScreen;
