import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Mic } from "lucide-react-native";

import { colors, spacing } from "@/src/theme";

interface RecordButtonProps {
  onPress?: () => void;
}

export default function RecordButton({ onPress }: RecordButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outerCircle, pressed && styles.pressed]}
    >
      <View style={styles.innerCircle}>
        <Mic size={24} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },

  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
});
