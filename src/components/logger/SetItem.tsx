import React, { useState } from "react";
import { Text, TextInput, View } from "../general/Themed";
import { ExerciseSet } from "@/types/models";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CustomButton from "../general/CustomButton";
import { useWorkouts } from "@/app/store";

type SetItem = {
  index: number;
  set: ExerciseSet;
};

const SetItem = ({ index, set }: SetItem) => {
  const [weight, setweight] = useState(set.weight?.toString() || "");
  const [reps, setreps] = useState(set.reps?.toString() || "");
  const updateSet = useWorkouts((state) => state.updateSet);
  const deleteSet = useWorkouts((state) => state.deleteSet);

  const handleWeightChange = () => {
    updateSet(set.id, { weight: parseFloat(weight) });
  };

  const handleRepsChange = () => {
    updateSet(set.id, { reps: parseInt(reps) });
  };

  const renderRightActions = () => (
    <CustomButton
      onPress={() => deleteSet(set.id)}
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
