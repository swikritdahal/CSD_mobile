import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
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
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const hasIcons = leftIcon || rightIcon;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.text.inverse : colors.primary}
        />
      ) : hasIcons ? (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.leftSlot}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text` as const],
              styles.centeredText,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightSlot}>{rightIcon}</View>}
        </View>
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${variant}Text` as const],
            textStyle,
          ]}
        >
          {title}
        </Text>
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

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  leftSlot: {
    marginRight: spacing.sm,
  },

  rightSlot: {
    marginLeft: spacing.sm,
  },

  text: {
    ...typography.body,
    fontWeight: "600",
  },

  centeredText: {
    flex: 1,
    textAlign: "center",
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
