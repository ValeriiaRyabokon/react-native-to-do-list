import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { THEME } from "../theme";
import { AppTextBold } from "./ui/AppTextBold";

export const Navbar = ({ title }) => {
  return (
    <View style={{...styles.navbar,...Platform.select({
      ios:styles.navbarIOS,
      android:styles.navbarAndroid
    })}}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
};
const styles = StyleSheet.create({
  navbar: {
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",

    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.NAVBAR_COLOR,
  },
  navbarIOS: {
    borderBottomColor: THEME.NAVBAR_COLOR,
    borderBottomWidth: 2,
  },
  text: {
    color: Platform.OS==="ios"? THEME.NAVBAR_COLOR : 'white',
    fontSize: 20,
  },
});
