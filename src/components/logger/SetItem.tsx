import React, { useState } from "react";
import { Text, TextInput, View } from "../general/Themed";
import { ExerciseSet } from "@/types/models";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CustomButton from "../general/CustomButton";

type SetItem = {
  index: number;
  set: ExerciseSet;
};

const SetItem = ({ index, set }: SetItem) => {
  const [weight, setweight] = useState(set.weight?.toString() || "");
  const [reps, setreps] = useState(set.reps?.toString() || "");

  const handleWeightChange = () => {
    console.warn("Weight changed to: ", weight);
  };

  const handleRepsChange = () => {
    console.warn("Weight changed to: ", reps);
  };

  const renderRightActions = () => (
    <CustomButton
      onPress={() => console.warn("Deleting set: ", set.id)}
      title="Delete"
      type="link"
      style={{ width: "auto", padding: 5 }}
      color="crimson"
    />
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: "auto", fontWeight: "bold", fontSize: 16 }}>
          {index + 1}
        </Text>
        <TextInput
          style={{
            width: 60,
            padding: 5,
            paddingVertical: 10,
            fontSize: 16,
            textAlign: "center",
          }}
          placeholder="50"
          value={weight}
          onChangeText={setweight}
          onBlur={handleWeightChange}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            width: 60,
            padding: 5,
            paddingVertical: 10,
            fontSize: 16,
            textAlign: "center",
          }}
          placeholder="8"
          value={reps}
          onChangeText={setreps}
          onBlur={handleRepsChange}
          keyboardType="numeric"
        />
      </View>
    </Swipeable>
  );
};

export default SetItem;
