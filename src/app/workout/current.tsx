import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "@/components/general/CustomButton";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import { useWorkouts } from "../store";
import { Redirect } from "expo-router";
import { View } from "@/components/general/Themed";

const CurrentWorkoutScreen = () => {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const finishWorkout = useWorkouts((state) => state.finishWorkout);
  const addExercise = useWorkouts((state) => state.addExercise);

  const headerHeight = useHeaderHeight();

  if (!currentWorkout) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <KeyboardAwareFlatList
        data={currentWorkout.exercises}
        renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
        contentContainerStyle={{ gap: 10, padding: 10, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={headerHeight}
        ListHeaderComponent={
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <WorkoutHeader />
            <CustomButton
              title="Finish"
              onPress={() => {
                finishWorkout();
              }}
              style={{ width: "auto" }}
            />
          </View>
        }
        ListFooterComponent={
          <SelectExerciseModal
            onSelectExercise={(name: string) => addExercise(name)}
          />
        }
      />
    </>
  );
};

export default CurrentWorkoutScreen;
