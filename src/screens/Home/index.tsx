import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeBottomBar from "@/src/components/HomeBottomBar";
import HomeHeader from "@/src/components/HomeHeader";
import { colors, fontFamilies, spacing } from "@/src/theme";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />

        <View style={styles.centerContent}>
          <Image
            source={require("@/assets/images/csd_home_background.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.instruction}>
            Click on record so we can{"\n"}
            diagnose what could be{"\n"}
            wrong with your car.
          </Text>
        </View>

        <View style={styles.bottomBarWrapper}>
          <HomeBottomBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundGolden,
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
  },

  illustration: {
    width: 340,
    height: 340,
  },

  instruction: {
    fontFamily: fontFamilies.italic,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: colors.primaryLight,
    marginTop: -40,
  },

  bottomBarWrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
