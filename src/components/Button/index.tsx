import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { colors, radius, spacing, typography } from "@/src/theme/index";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
}: ButtonProps) {
  const buttonStyles: ViewStyle[] = [
    styles.button as ViewStyle,
    styles[variant] as ViewStyle,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];

  const textStyles = [styles.text, styles[`${variant}Text` as const]];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [...buttonStyles, pressed && styles.pressed]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.text.inverse : colors.primary}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },

  fullWidth: {
    width: "100%",
  },

  pressed: {
    opacity: 0.85,
  },

  disabled: {
    opacity: 0.5,
  },

  primary: {
    backgroundColor: colors.primary,
  },

  secondary: {
    backgroundColor: colors.surface,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },

  ghost: {
    backgroundColor: "transparent",
  },

  text: {
    ...typography.text,
  },

  primaryText: {
    color: colors.text.inverse,
  },

  secondaryText: {
    color: colors.text.primary,
  },

  outlineText: {
    color: colors.primary,
  },

  ghostText: {
    color: colors.primary,
  },
});
