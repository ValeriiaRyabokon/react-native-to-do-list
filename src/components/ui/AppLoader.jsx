import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";

export const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={THEME.NAVBAR_COLOR} />
  </View>
);
const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});
