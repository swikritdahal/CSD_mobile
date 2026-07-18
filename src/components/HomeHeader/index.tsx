import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { User } from "lucide-react-native";

import { colors, fontFamilies, spacing } from "@/src/theme";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.hiText}>Hi Abhaya,</Text>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Let&apos;s keep your car{"\n"}running smoothly.
        </Text>
      </View>

      <View style={styles.avatar}>
        <User size={24} color={colors.text.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },

  greeting: {
    flex: 1,
    gap: spacing.xs,
  },

  hiText: {
    fontFamily: fontFamilies.regular,
    fontSize: 20,
    lineHeight: 28,
    color: colors.text.primary,
  },

  welcomeText: {
    fontFamily: fontFamilies.italic,
    fontSize: 32,
    lineHeight: 40,
    color: colors.primaryLight,
  },

  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.md,
  },
});
