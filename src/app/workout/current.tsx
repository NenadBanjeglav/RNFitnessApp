import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import { Stack } from "expo-router";
import CustomButton from "@/components/general/CustomButton";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";

const CurrentWorkoutScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              title="Finish"
              onPress={() => console.log("Finish Workout")}
              style={{ padding: 7, width: "auto", paddingHorizontal: 15 }}
            />
          ),
        }}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={headerHeight}
      >
        <KeyboardAwareFlatList
          data={[1, 2]}
          renderItem={() => <WorkoutExerciseItem />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={headerHeight}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name: string) =>
                console.log("Exercise Selected: ", name)
              }
            />
          }
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default CurrentWorkoutScreen;
