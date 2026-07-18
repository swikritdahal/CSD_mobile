import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { colors, spacing } from "@/src/theme";

export default function SplashScreen() {
  const handleGetStarted = () => {
    router.push("/(tabs)");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
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
          <View style={styles.topContent}>
            <Text style={styles.headline}>
              <Text style={styles.headlineItalic}>Your Smart </Text>
              <Text style={styles.headlineBold}>Car{"\n"}Assistant</Text>
            </Text>

            <AppText variant="body" style={styles.subtext}>
              Track, manage, and control your car{'\n'}effortlessly in one place.
            </AppText>
          </View>

          <View style={styles.bottomContent}>
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
              textStyle={styles.getStartedText}
              leftIcon={
                <View style={styles.iconCircle}>
                  <MaterialIcons
                    name="directions-car"
                    size={20}
                    color="#fff"
                  />
                </View>
              }
              rightIcon={
                <View style={styles.arrowRow}>
                  <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color={colors.primary}
                  />
                  <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color={colors.primary}
                    style={{ marginLeft: -8 }}
                  />
                </View>
              }
            />

            <View style={styles.signInRow}>
              <AppText variant="bodySmall" style={styles.signInText}>
                Already have an account?{" "}
              </AppText>
              <Pressable onPress={handleSignIn}>
                <Text style={styles.signInLink}>Sign in</Text>
              </Pressable>
            </View>
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
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing["4xl"],
    paddingBottom: spacing.lg,
  },

  topContent: {
    gap: spacing.md,
  },

  headline: {
    fontSize: 40,
    lineHeight: 44,
    color: colors.text.inverse,
  },

  headlineItalic: {
    fontFamily: "Inter_400Regular_Italic",
  },

  headlineBold: {
    fontFamily: "Inter_700Bold",
  },

  subtext: {
    color: colors.text.inverse,
    opacity: 0.85,
  },

  bottomContent: {
    gap: spacing.lg,
  },

  getStartedButton: {
    backgroundColor: "#FFFFFF",
  },

  getStartedText: {
    color: colors.text.primary,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  signInText: {
    color: colors.text.inverse,
    opacity: 0.85,
  },

  signInLink: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
});
