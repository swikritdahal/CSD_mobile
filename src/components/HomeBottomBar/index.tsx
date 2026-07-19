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
            <ClipboardList size={24} color={colors.text.secondary} />
            <Text style={styles.label}>History</Text>
          </Pressable>

          <View style={styles.recordButton}>
            <RecordButton onPress={onRecord} />
          </View>

          <Pressable style={styles.sideButton} onPress={handleLogout}>
            <LogOut size={24} color={colors.text.secondary} />
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
  },

  dock: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  sideButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minWidth: 64,
  },

  recordButton: {
    marginTop: -44,
  },

  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.text.secondary,
  },
});
