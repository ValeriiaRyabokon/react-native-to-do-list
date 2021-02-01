import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const { todos, updateTodo, deleteTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const todo = todos.find((t) => t.id === todoId);
  const [modal, setModal] = useState(false);
  const saveHandler = async (title) => {
    await updateTodo(todo.id, title);
    setModal(false);
  };
  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <AntDesign name="edit" size={24} color="white" />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            onPress={() => changeScreen(null)}
            color={THEME.NAVBAR_COLOR}
          >
            <Ionicons
              name="ios-arrow-back-circle-outline"
              size={24}
              color="white"
            />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DELETE_COLOR}
            onPress={() => deleteTodo(todo.id)}
          >
            <MaterialCommunityIcons
              name="delete-variant"
              size={24}
              color="white"
            />
          </AppButton>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
