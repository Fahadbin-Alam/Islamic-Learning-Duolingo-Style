import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

// Placeholder: another agent fills this gallery in.
export default function LearnGallery() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.snow },
  text: { fontFamily: fonts.displayHeavy, fontSize: 22, color: colors.inkSoft }
});
