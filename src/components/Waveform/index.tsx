import React from "react";
import { StyleSheet, View } from "react-native";

interface WaveformProps {
  color: string;
  barCount?: number;
  width?: number;
  height?: number;
}

export default function Waveform({
  color,
  barCount = 40,
  width = 120,
  height = 28,
}: WaveformProps) {
  // Precompute pseudo-random heights so they are stable per instance.
  const bars = Array.from({ length: barCount }, (_, i) => {
    const seed = Math.sin(i * 12.9898 + 1) * 43758.5453;
    const normalized = seed - Math.floor(seed);
    return 0.25 + normalized * 0.75;
  });

  const barWidth = Math.max(2, (width - (barCount - 1) * 2) / barCount);

  return (
    <View style={[styles.container, { width, height }]}>
      {bars.map((factor, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              width: barWidth,
              height: height * factor,
              backgroundColor: color,
              marginRight: index < barCount - 1 ? 2 : 0,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  bar: {
    borderRadius: 2,
  },
});
