import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  List,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react-native";

import Button from "@/src/components/Button";
import Spectrogram from "@/src/components/Spectrogram";
import { colors, fontFamilies, radius, spacing } from "@/src/theme";

type AnalysisTab = "waveform" | "spectrogram";

export default function Analysis() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("spectrogram");
  const { width: screenWidth } = useWindowDimensions();

  const spectrogramWidth = screenWidth - spacing.xl * 2 - spacing.md * 2;
  const spectrogramHeight = spectrogramWidth * 0.5;

  const confidence = 88;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Analysis</Text>
          <Text style={styles.headerSubtitle}>Detailed diagnosis report</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recordedCard}>
          <View style={styles.playButton}>
            <Play size={24} color={colors.text.inverse} fill={colors.text.inverse} />
          </View>
          <View style={styles.recordedInfo}>
            <Text style={styles.recordedLabel}>Recorded</Text>
            <Text style={styles.recordedDate}>12 Jul 2026 • 8:42 PM</Text>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>0:15</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === "waveform" && styles.tabActive]}
            onPress={() => setActiveTab("waveform")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "waveform" && styles.tabTextActive,
              ]}
            >
              Waveform
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "spectrogram" && styles.tabActive]}
            onPress={() => setActiveTab("spectrogram")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "spectrogram" && styles.tabTextActive,
              ]}
            >
              Spectrogram
            </Text>
          </Pressable>
        </View>

        <View style={styles.spectrogramContainer}>
          <Spectrogram
            width={spectrogramWidth}
            height={spectrogramHeight}
          />
          <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>20k</Text>
            <Text style={styles.axisLabel}>5k</Text>
            <Text style={styles.axisLabel}>1k</Text>
            <Text style={styles.axisLabel}>100</Text>
          </View>
          <View style={styles.xAxis}>
            <Text style={styles.axisLabel}>0s</Text>
            <Text style={styles.axisLabel}>4s</Text>
            <Text style={styles.axisLabel}>8s</Text>
            <Text style={styles.axisLabel}>12s</Text>
            <Text style={styles.axisLabel}>15s</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldCheck size={20} color={colors.success} />
            <Text style={styles.sectionTitle}>Most Likely Cause</Text>
          </View>
          <Text style={styles.causeTitle}>Engine is Healthy</Text>
          <Text style={styles.causeSubtitle}>High Confidence</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${confidence}%` }]} />
          </View>
          <Text style={styles.progressValue}>≈ {confidence}%</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Explanation</Text>
          </View>
          <Text style={styles.bodyText}>
            The sound is consistent with a normal engine idle. We didn&apos;t
            detect any abnormal patterns that usually indicate issues.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <List size={20} color={colors.text.secondary} />
            <Text style={styles.sectionTitle}>Other Possibilities</Text>
          </View>
          <Pressable style={styles.listItem}>
            <Text style={styles.listItemText}>Normal engine component noise</Text>
            <ChevronRight size={18} color={colors.text.tertiary} />
          </Pressable>
          <Pressable style={styles.listItem}>
            <Text style={styles.listItemText}>
              Slight valve train noise (normal range)
            </Text>
            <ChevronRight size={18} color={colors.text.tertiary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Wrench size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>What You Can Do</Text>
          </View>
          <Pressable style={styles.actionRow}>
            <Text style={styles.bodyText}>
              No immediate action needed. Keep up with regular maintenance.
            </Text>
            <ChevronRight size={18} color={colors.text.tertiary} />
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save Report"
          variant="outline"
          onPress={() => console.log("Save report")}
          leftIcon={<FileText size={20} color={colors.primary} />}
          style={styles.footerButton}
        />
        <Button
          title="Share"
          onPress={() => console.log("Share")}
          leftIcon={<Share2 size={20} color={colors.text.inverse} />}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundGolden,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    minHeight: 164,
  },

  backButton: {
    paddingTop: 4,
    marginRight: spacing.sm,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 32,
    lineHeight: 40,
    color: colors.primaryLight,
  },

  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },

  recordedCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  recordedInfo: {
    flex: 1,
  },

  recordedLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text.primary,
  },

  recordedDate: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },

  durationBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
  },

  durationText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.text.secondary,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.lg,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },

  tabActive: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  tabTextActive: {
    color: colors.text.inverse,
    fontFamily: fontFamilies.bold,
  },

  spectrogramContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  yAxis: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    bottom: spacing.md + 20,
    justifyContent: "space-between",
  },

  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    paddingLeft: 28,
  },

  axisLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: colors.text.tertiary,
  },

  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: colors.text.primary,
  },

  causeTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.success,
    marginBottom: spacing.xs,
  },

  causeSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceSecondary,
    marginBottom: spacing.xs,
  },

  progressFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },

  progressValue: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: "right",
  },

  bodyText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    flex: 1,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },

  listItemText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  footer: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: colors.backgroundGolden,
  },

  footerButton: {
    flex: 1,
  },
});
