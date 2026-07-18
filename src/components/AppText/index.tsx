import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

import { typography } from "@/src/theme";

type Variant =
  | "display"
  | "heading"
  | "title"
  | "body"
  | "bodySmall"
  | "caption";

interface AppTextProps extends TextProps {
  variant?: Variant;
  style?: TextStyle | TextStyle[];
}

export default function AppText({
  variant = "body",
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text style={[typography[variant] as TextStyle, style]} {...props}>
      {children}
    </Text>
  );
}
