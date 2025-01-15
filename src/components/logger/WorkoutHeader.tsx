import React, { useEffect, useState } from "react";
import { Text, View } from "../general/Themed";
import dummyWorkouts from "@/data/dummyWorkouts";
import { calculateDuration } from "@/utils/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const WorkoutHeader = () => {
  const [timer, settimer] = useState("00:00:00");

  const workout = dummyWorkouts[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = calculateDuration(
        new Date(workout.createdAt),
        new Date()
      );
      settimer(duration);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [workout]);

  return (
    <View style={{ gap: 10, backgroundColor: "transparent", marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Workout Tracker</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "transparent",
          gap: 4,
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="clock" size={18} color="gray" />
        <Text style={{ fontSize: 18 }}>{timer}</Text>
      </View>
    </View>
  );
};

export default WorkoutHeader;
