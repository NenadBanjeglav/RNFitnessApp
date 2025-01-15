import React, { useState } from "react";
import CustomButton from "../general/CustomButton";
import { FlatList, Modal, Pressable } from "react-native";
import { Text, TextInput, View } from "../general/Themed";
import Card from "../general/Card";
import AntDesign from "@expo/vector-icons/AntDesign";
import exercises from "@/data/exercises";

type SelectExerciseModal = {
  onSelectExercise: (name: string) => void;
};

const SelectExerciseModal = ({ onSelectExercise }: SelectExerciseModal) => {
  const [isOpen, setisOpen] = useState(false);
  const [search, setsearch] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CustomButton
        onPress={() => setisOpen(true)}
        title="Select Exercise"
        style={{ marginBottom: 10 }}
      />

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setisOpen(false)}
      >
        <View
          style={{
            backgroundColor: "rbga(0,0,0,0.8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{ width: "100%", height: "100%" }}
            title="Select Exercise"
          >
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setsearch}
              style={{ padding: 10, marginVertical: 10 }}
            />

            <AntDesign
              name="close"
              size={20}
              color="gray"
              style={{ position: "absolute", right: 10, top: 10 }}
              onPress={() => setisOpen(false)}
            />
            <FlatList
              data={filteredExercises}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <Pressable
                  style={{ gap: 3 }}
                  onPress={() => {
                    onSelectExercise(item.name);
                    setisOpen(false);
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ color: "gray" }}>{item.muscleGroups[0]}</Text>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </>
  );
};

export default SelectExerciseModal;
