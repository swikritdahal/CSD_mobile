import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { colors, spacing } from "@/src/theme";

export default function SplashScreen() {
  const handleGetStarted = () => {
    console.log("Get Started");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/csd_splash_bg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View />

          <View style={styles.bottomContent}>
            <View style={styles.textContainer}>
              <AppText variant="display" style={styles.title}>
                Your Smart{"\n"}Car Assistant
              </AppText>

              <AppText variant="body" style={styles.subtitle}>
                Understand your vehicle before
                {"\n"}
                visiting a mechanic.
              </AppText>
            </View>

            <Button title="Get Started" onPress={handleGetStarted} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacing.xl,
  },

  bottomContent: {
    gap: spacing.xl,
    paddingBottom: spacing.lg,
  },

  textContainer: {
    gap: spacing.md,
  },

  title: {
    color: colors.text.inverse,
    lineHeight: 44,
  },

  subtitle: {
    color: colors.text.inverse,
    opacity: 0.9,
    lineHeight: 24,
  },
});
