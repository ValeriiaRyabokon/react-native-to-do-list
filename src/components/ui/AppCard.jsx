import React from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const AppCard = (props) => (
  <View style={{...styles.default,...props.style}}>{props.children}</View>
);
const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: THEME.NAVBAR_COLOR,
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: "#d8bfd8",
    borderRadius: 10,
  },
});
 