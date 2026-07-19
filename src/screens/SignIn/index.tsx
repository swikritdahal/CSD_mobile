import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

import Button from "@/src/components/Button";
import { colors, fontFamilies, radius, spacing } from "@/src/theme";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignIn = () => {
    console.log("Sign in:", { id, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>CSD</Text>
        </View>

        <View style={styles.formHeader}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue diagnosing your car.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <Text
              style={[
                styles.label,
                focusedField === "id" && styles.labelActive,
              ]}
            >
              ID
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "id" && styles.inputActive,
              ]}
              placeholder="Email or mobile number (US)"
              placeholderTextColor={colors.text.tertiary}
              value={id}
              onChangeText={setId}
              onFocus={() => setFocusedField("id")}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text
              style={[
                styles.label,
                focusedField === "password" && styles.labelActive,
              ]}
            >
              Password
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "password" && styles.inputActive,
              ]}
              placeholder="Enter your password"
              placeholderTextColor={colors.text.tertiary}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
  },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
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

  logoContainer: {
    alignItems: "center",
  },

  logoText: {
    fontFamily: fontFamilies.bold,
    fontSize: 42,
    color: colors.primary,
    letterSpacing: 4,
  },

  formHeader: {
    gap: spacing.xs,
  },

  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    color: colors.text.primary,
  },

  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text.secondary,
  },

  form: {
    gap: spacing.md,
  },

  fieldContainer: {
    gap: spacing.xs,
  },

  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  labelActive: {
    color: colors.primary,
    fontFamily: fontFamilies.bold,
  },

  input: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    color: colors.text.primary,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    height: 50,
  },

  inputActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}06`,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -spacing.xs,
  },

  forgotPasswordText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.primary,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.sm,
  },

  footerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  footerLink: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: colors.primary,
  },
});
