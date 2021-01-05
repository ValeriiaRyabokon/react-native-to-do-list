import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import { THEME } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";

export const AddToDo = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("You should text smth!");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Your ToDo"
        onChangeText={setValue}
        autoCorrect={false}
      />
      <MaterialIcons.Button
        name="add-task"
        size={24}
        color="white"
        onPress={pressHandler}
      >
        Add
      </MaterialIcons.Button>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "80%",
    height: 50,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: THEME.TODOS_COLOR,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
  },
});
