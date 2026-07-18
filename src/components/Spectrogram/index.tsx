import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";

interface SpectrogramProps {
  width?: number;
  height?: number;
  barCount?: number;
}

export default function Spectrogram({
  width = 320,
  height = 160,
  barCount = 80,
}: SpectrogramProps) {
  const bars = useMemo(() => {
    const items: { x: number; y: number; w: number; h: number; opacity: number }[] = [];
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const seed = Math.sin(i * 12.9898 + 1) * 43758.5453;
      const normalized = seed - Math.floor(seed);
      const intensity = 0.3 + normalized * 0.7;
      const barHeight = height * (0.2 + normalized * 0.8);
      const y = height - barHeight;

      items.push({
        x: i * barWidth,
        y,
        w: barWidth - 1,
        h: barHeight,
        opacity: intensity,
      });
    }

    return items;
  }, [width, height, barCount]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="spectrogramGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#7C3AED" stopOpacity="1" />
            <Stop offset="0.5" stopColor="#F59E0B" stopOpacity="1" />
            <Stop offset="1" stopColor="#EF4444" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Rect x={0} y={0} width={width} height={height} fill="#0F172A" rx={12} />

        {bars.map((bar, index) => (
          <Rect
            key={index}
            x={bar.x}
            y={bar.y}
            width={bar.w}
            height={bar.h}
            fill="url(#spectrogramGradient)"
            opacity={bar.opacity}
            rx={1}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
});
