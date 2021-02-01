import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  DELETE_TODO,
  FETCH_TODOS,
  HIDE_LOADER,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import {Http} from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    const data= await Http.post('https://react-native-to-do-list-3c052-default-rtdb.firebaseio.com/todos.json', {title})
    dispatch({ type: ADD_TODO, id: data.name, title });
  };
  const deleteTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Delete todo",
      `Are you sure to want delete "${todo.title}" ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(`https://react-native-to-do-list-3c052-default-rtdb.firebaseio.com/todos/${id}.json`)
            dispatch({ type: DELETE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const fetchTodos = async () => {
    showLoader();
    clearError()
    try {
      const data = await Http.get("https://react-native-to-do-list-3c052-default-rtdb.firebaseio.com/todos.json")
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something wrong...");
      console.log(e);
    } finally{
      hideLoader();
    }
};

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await Http.patch(`https://react-native-to-do-list-3c052-default-rtdb.firebaseio.com/todos/${id}.json`, {title})
     dispatch({ type: UPDATE_TODO, id, title }); 
    } catch(e){
      showError("Something wrong...");
      console.log(e);
    }

  }
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        deleteTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
