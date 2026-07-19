import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies } from "@/src/theme";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

export default function CircularProgress({
  percentage,
  size = 80,
  strokeWidth = 6,
  color = colors.success,
  trackColor = colors.surfaceSecondary,
}: CircularProgressProps) {
  const half = size / 2;
  const clamped = Math.min(Math.max(percentage, 0), 100);

  // Right half fills from 0% to 50%
  // Left half fills from 50% to 100%
  const rightRotation = clamped <= 50
    ? (180 - (clamped / 50) * 180)
    : 0;
  const leftRotation = clamped > 50
    ? (180 - ((clamped - 50) / 50) * 180)
    : 180;

  const fillRing = (borderColors: [string, string, string, string]) => ({
    position: "absolute" as const,
    top: 0,
    width: size,
    height: size,
    borderRadius: half,
    borderWidth: strokeWidth,
    borderTopColor: borderColors[0],
    borderRightColor: borderColors[1],
    borderBottomColor: borderColors[2],
    borderLeftColor: borderColors[3],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Track ring */}
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: strokeWidth,
            borderColor: trackColor,
          },
        ]}
      />

      {/* Right half fill */}
      <View
        style={[
          styles.clip,
          {
            top: 0,
            right: 0,
            width: half,
            height: size,
          },
        ]}
      >
        <View
          style={[
            fillRing([color, color, "transparent", "transparent"]),
            {
              left: -half,
              transform: [{ rotate: `${rightRotation}deg` }],
            },
          ]}
        />
      </View>

      {/* Left half fill */}
      <View
        style={[
          styles.clip,
          {
            top: 0,
            left: 0,
            width: half,
            height: size,
          },
        ]}
      >
        <View
          style={[
            fillRing(["transparent", "transparent", color, color]),
            {
              right: -half,
              transform: [{ rotate: `${leftRotation}deg` }],
            },
          ]}
        />
      </View>

      {/* Center overlay to create donut hole */}
      <View
        style={{
          position: "absolute",
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth * 2) / 2,
          backgroundColor: colors.surface,
        }}
      />

      {/* Percentage text */}
      <Text style={[styles.label, { fontSize: size * 0.225 }]}>
        {clamped}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
  },
  clip: {
    position: "absolute",
    overflow: "hidden",
  },
  label: {
    fontFamily: fontFamilies.bold,
    color: colors.text.primary,
    position: "absolute",
  },
});
