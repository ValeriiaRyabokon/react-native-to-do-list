import React from "react";
import { View,StyleSheet, TouchableOpacity, onOpen } from "react-native";
import {THEME} from '../theme';
import {AppTextBold} from './ui/AppTextBold'

export const Todo = ({todo, onDelete, onOpen}) => {
  return (
    <TouchableOpacity
     activeOpacity={0.5}
     onPress={onOpen.bind(null, todo.id)}
     onLongPress={onDelete.bind(null, todo.id)}
     >
    <View style={styles.todo}>
      <AppTextBold>
          {todo.title}
      </AppTextBold>
    </View>
    </TouchableOpacity>
  );
}; 
const styles = StyleSheet.create({
  todo: {
      flexDirection:'row',
      alignItems:'center',
      padding:15,
      borderWidth:1,
      borderColor:THEME.TODOS_COLOR,
      borderRadius:10,
      marginBottom:10,

  }
});
