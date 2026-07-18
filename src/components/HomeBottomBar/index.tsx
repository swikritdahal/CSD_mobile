import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { History, LogIn, LogOut } from "lucide-react-native";

import RecordButton from "@/src/components/RecordButton";
import { colors, fontFamilies, spacing } from "@/src/theme";

interface HomeBottomBarProps {
  isSignedIn: boolean;
  onToggleAuth: () => void;
  onRecord?: () => void;
  onHistory?: () => void;
}

export default function HomeBottomBar({
  isSignedIn,
  onToggleAuth,
  onRecord,
  onHistory,
}: HomeBottomBarProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.sideButton} onPress={onHistory}>
        <History size={24} color={colors.text.secondary} />
        <Text style={styles.label}>History</Text>
      </Pressable>

      <RecordButton onPress={onRecord} />

      <Pressable style={styles.sideButton} onPress={onToggleAuth}>
        {isSignedIn ? (
          <>
            <LogOut size={24} color={colors.text.secondary} />
            <Text style={styles.label}>Logout</Text>
          </>
        ) : (
          <>
            <LogIn size={24} color={colors.text.secondary} />
            <Text style={styles.label}>Login</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },

  sideButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minWidth: 64,
  },

  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.text.secondary,
  },
});
