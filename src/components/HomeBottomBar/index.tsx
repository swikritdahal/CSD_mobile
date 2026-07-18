import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ClipboardList, LogOut } from "lucide-react-native";

import RecordButton from "@/src/components/RecordButton";
import { colors, fontFamilies, spacing } from "@/src/theme";

interface HomeBottomBarProps {
  onRecord?: () => void;
}

export default function HomeBottomBar({ onRecord }: HomeBottomBarProps) {
  const handleHistory = () => {
    router.push("/history");
  };

  const handleLogout = () => {
    router.push("/sign-in");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.dock}>
        <View style={styles.content}>
          <Pressable style={styles.sideButton} onPress={handleHistory}>
            <ClipboardList size={20} color={colors.text.secondary} />
            <Text style={styles.label}>History</Text>
          </Pressable>

          <View style={styles.recordButton}>
            <RecordButton onPress={onRecord} />
          </View>

          <Pressable style={styles.sideButton} onPress={handleLogout}>
            <LogOut size={20} color={colors.text.secondary} />
            <Text style={styles.label}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    height: 64,
  },

  dock: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  sideButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minWidth: 52,
  },

  recordButton: {
    marginTop: -36,
  },

  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: colors.text.secondary,
  },
});
