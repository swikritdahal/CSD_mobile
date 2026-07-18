import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { colors, fontFamilies, radius, spacing } from "@/src/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.text.tertiary}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },

  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.primary,
  },

  input: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 52,
  },

  inputError: {
    borderColor: colors.error,
  },

  error: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.error,
  },
});
