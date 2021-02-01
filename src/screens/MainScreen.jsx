import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AddToDo } from "../components/AddToDo";
import { Todo } from "../components/Todo";
import { AppLoader } from "../components/ui/AppLoader";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";
import {AppButton} from '../components/ui/AppButton'
import {AppText} from '../components/ui/AppText'

export const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const { addTodo, todos, deleteTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });
  if (loading) {
    return <AppLoader />;
  }
  if (error) {
    <View style={styles.center}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Try Again</AppButton>
    </View>;
  }
  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onDelete={deleteTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );
  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={require("../assets/llamaNoTodo.png")}
        />
        <View style={styles.textWrap}>
          <Text style={styles.text}>
            Honey, you don't have any todo today. Please add!
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View>
      <AddToDo onSubmit={addTodo} />
      {content}
    </View>
  );
};
const styles = StyleSheet.create({
  imgWrap: {
    padding: 20,
    height: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  img: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  textWrap: {
    marginTop: 30,
  },
  text: {
    fontSize: 18,
  },
  center:{
   justifyContent:"center",
   alignItems:'center'
  },
  error:{
    color:'red',
    fontSize:20
  }
});
