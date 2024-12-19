import { View, Text, StyleSheet } from "react-native";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    gap: 8,
    padding: 40,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
