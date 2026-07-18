import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeBottomBar from "@/src/components/HomeBottomBar";
import HomeHeader from "@/src/components/HomeHeader";
import { colors, fontFamilies, fontSources, spacing } from "@/src/theme";

export default function Home() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const [isSignedIn, setIsSignedIn] = useState(mode === "signedIn");
  const [fontsLoaded] = useFonts(fontSources);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader isSignedIn={isSignedIn} />

        <View style={styles.centerContent}>
          <Image
            source={require("@/assets/images/csd_home_background.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.instruction}>
            Click on record (bottom-center){"\n"}
            so we diagnose what could be{"\n"}
            wrong with your car.
          </Text>
        </View>

        <View style={styles.bottomBarWrapper}>
          <HomeBottomBar
            isSignedIn={isSignedIn}
            onToggleAuth={() => setIsSignedIn((prev) => !prev)}
            onRecord={() => {}}
            onHistory={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },

  illustration: {
    width: 280,
    height: 280,
  },

  instruction: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: colors.text.secondary,
  },

  bottomBarWrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
