import React from "react";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import { StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { WorkoutWithExercises } from "@/types/models";
import dayjs from "dayjs";
import { getBestSet } from "@/app/services/setService";

import { getWorkoutTotalWeight } from "@/app/services/workoutService";
import { calculateDuration } from "@/utils/time";

type WorkoutListItem = {
  workout: WorkoutWithExercises;
};

const WorkoutListItem = ({ workout }: WorkoutListItem) => {
  const { createdAt, exercises, finishedAt } = workout;

  return (
    <Card
      title={dayjs(createdAt).format("dddd, D MMM")}
      style={{ gap: 10 }}
      href={`/workout/${workout.id}`}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold" }}>Exercise</Text>
        <Text style={{ fontWeight: "bold" }}>Best Set</Text>
      </View>

      {exercises.map((e) => {
        const { id, name, sets } = e;
        const bestSet = getBestSet(sets);

        return (
          <View
            key={id}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {sets.length && (
              <>
                <Text style={{ color: "gray" }}>
                  {sets.length} x {name}
                </Text>

                <Text style={{ color: "gray" }}>
                  {bestSet
                    ? `${bestSet.reps} ${
                        bestSet.weight ? `x ${bestSet.weight} kg` : "reps"
                      }`
                    : `null`}
                </Text>
              </>
            )}
          </View>
        );
      })}

      <View
        style={{
          flexDirection: "row",
          gap: 20,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#333",
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <FontAwesome5 name="clock" size={16} color="gray" />
          <Text>{calculateDuration(createdAt, finishedAt)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <FontAwesome5 name="weight-hanging" size={16} color="gray" />
          <Text>{getWorkoutTotalWeight(workout)} kg</Text>
        </View>
      </View>
    </Card>
  );
};

export default WorkoutListItem;
