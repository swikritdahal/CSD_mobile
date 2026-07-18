import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { colors, fontFamilies, spacing } from "@/src/theme";

export default function SignIn() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Sign in:", { emailOrPhone, password });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/csd_splash_bg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={28} color={colors.text.inverse} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Welcome back. Sign in to continue diagnosing your car.
          </Text>

          <View style={styles.form}>
            <Input
              label="Email or Phone Number"
              placeholder="Enter your email or phone"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Button title="Sign In" onPress={handleSignIn} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
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

  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },

  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 36,
    color: colors.text.inverse,
  },

  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.inverse,
    opacity: 0.85,
  },

  form: {
    gap: spacing.md,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.inverse,
    opacity: 0.85,
  },

  footerLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: colors.primary,
  },
});
