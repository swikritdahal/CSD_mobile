import React, { useEffect, useState } from "react";
import {
  Animated,
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
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react-native";

import CircularProgress from "@/src/components/CircularProgress";
import Spectrogram from "@/src/components/Spectrogram";
import { colors, fontFamilies, radius, spacing } from "@/src/theme";

interface AccordionItem {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
}

const OTHER_POSSIBILITIES: AccordionItem[] = [
  {
    title: "Normal engine vibration",
    detail:
      "Engines naturally produce vibrations during operation. The frequency and amplitude of this recording fall within the normal range for this vehicle model.",
    severity: "low",
  },
  {
    title: "Slight valve train noise",
    detail:
      "Minor ticking from the valve train is common, especially during cold starts. The rhythmic pattern detected here is within acceptable tolerances and does not indicate excessive wear.",
    severity: "medium",
  },
  {
    title: "Exhaust heat shield rattle",
    detail:
      "A loose heat shield can produce intermittent rattling sounds. Given the absence of high-frequency metallic clatter in this recording, this is unlikely but worth a visual check during your next service.",
    severity: "low",
  },
];

const SEVERITY_COLORS = {
  low: colors.success,
  medium: colors.warning,
  high: colors.error,
};

type Tab = "overview" | "explanation";

function SkeletonBar({
  widthPercent,
  height = 12,
}: {
  widthPercent: number;
  height?: number;
}) {
  const pulseAnim = new Animated.Value(0.3);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeletonBar,
        { width: `${widthPercent}%` as unknown as number, height, opacity: pulseAnim },
      ]}
    />
  );
}

function SkeletonContent() {
  return (
    <View style={styles.skeletonContainer}>
      <SkeletonBar widthPercent={60} height={14} />
      <SkeletonBar widthPercent={90} height={10} />
      <SkeletonBar widthPercent={75} height={10} />
      <SkeletonBar widthPercent={40} height={10} />
    </View>
  );
}

export default function Analysis() {
  const { width: screenWidth } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const spectrogramWidth = screenWidth - spacing.lg * 2 - spacing.md * 2;
  const spectrogramHeight = spectrogramWidth * 0.5;

  const confidence = 88;

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Analysis</Text>
          <Text style={styles.headerSubtitle}>Detailed diagnosis report</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Spectrogram */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: "rgba(15, 152, 168, 0.12)" },
              ]}
            >
              <CheckCircle2 size={16} color={colors.primary} />
            </View>
            <Text style={styles.cardHeaderTitle}>Spectrogram</Text>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.recordedRow}>
              <View style={styles.recordedInfo}>
                <Text style={styles.recordedTitle}>Engine idle hum</Text>
                <Text style={styles.recordedDate}>
                  12 Jul 2026  •  8:42 PM
                </Text>
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>0:15</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Spectrogram width={spectrogramWidth} height={spectrogramHeight} />
            <View style={styles.axisRow}>
              <Text style={styles.axisLabel}>0s</Text>
              <Text style={styles.axisLabel}>15s</Text>
            </View>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <Pressable
            style={[
              styles.tab,
              activeTab === "overview"
                ? styles.tabActive
                : styles.tabInactive,
            ]}
            onPress={() => handleTabChange("overview")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "overview" && styles.tabTextActive,
              ]}
            >
              Overview
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === "explanation"
                ? styles.tabActive
                : styles.tabInactive,
            ]}
            onPress={() => handleTabChange("explanation")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "explanation" && styles.tabTextActive,
              ]}
            >
              Explanation
            </Text>
          </Pressable>
        </View>

        {/* Card 2: Most Likely Cause / Explanation */}
        <View style={styles.card}>
          {activeTab === "overview" ? (
            <>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.headerIcon,
                    { backgroundColor: "rgba(34, 197, 94, 0.12)" },
                  ]}
                >
                  <ShieldCheck size={16} color={colors.success} />
                </View>
                <Text style={styles.cardHeaderTitle}>Most Likely Cause</Text>
              </View>

              <View style={styles.cardBody}>
                {isLoading ? (
                  <SkeletonContent />
                ) : (
                  <>
                    <View style={styles.causeTopRow}>
                      <View style={styles.causeLeft}>
                        <Text style={styles.causeLabel}>Engine is Healthy</Text>
                        <Text style={styles.causeMeta}>
                          No abnormal sound patterns detected
                        </Text>
                      </View>
                      <View style={styles.causeRight}>
                        <CircularProgress
                          percentage={confidence}
                          size={80}
                          strokeWidth={6}
                          color={colors.success}
                        />
                      </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.confidenceTags}>
                      <View
                        style={[
                          styles.tag,
                          { backgroundColor: "rgba(34, 197, 94, 0.12)" },
                        ]}
                      >
                        <Text
                          style={[styles.tagText, { color: colors.success }]}
                        >
                          High confidence
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.headerIcon,
                    { backgroundColor: "rgba(15, 152, 168, 0.12)" },
                  ]}
                >
                  <Sparkles size={16} color={colors.primary} />
                </View>
                <Text style={styles.cardHeaderTitle}>Explanation</Text>
              </View>

              <View style={styles.cardBody}>
                {isLoading ? (
                  <SkeletonContent />
                ) : (
                  <Text style={styles.bodyText}>
                    The recorded sound matches the acoustic profile of a healthy
                    engine at idle. We analyzed frequency distribution, harmonic
                    content, and transient events. No knocking, misfire, or belt
                    slippage signatures were detected.
                  </Text>
                )}
              </View>
            </>
          )}
        </View>

        {/* Card 3: Other Possibilities / What You Can Do */}
        <View style={styles.card}>
          {activeTab === "overview" ? (
            <>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.headerIcon,
                    { backgroundColor: "rgba(107, 114, 128, 0.12)" },
                  ]}
                >
                  <AlertCircle size={16} color={colors.text.secondary} />
                </View>
                <Text style={styles.cardHeaderTitle}>Other Possibilities</Text>
              </View>

              <View style={styles.cardBody}>
                {isLoading ? (
                  <SkeletonContent />
                ) : (
                  OTHER_POSSIBILITIES.map((item) => {
                    const isExpanded = expandedItems.has(item.title);
                    const sevColor = SEVERITY_COLORS[item.severity];

                    return (
                      <Pressable
                        key={item.title}
                        style={styles.accordionItem}
                        onPress={() => toggleItem(item.title)}
                      >
                        <View style={styles.accordionHeader}>
                          <View style={styles.accordionLeft}>
                            <View
                              style={[
                                styles.severityDot,
                                { backgroundColor: sevColor },
                              ]}
                            />
                            <Text style={styles.accordionTitle}>
                              {item.title}
                            </Text>
                          </View>
                          <ChevronDown
                            size={18}
                            color={colors.text.tertiary}
                            style={[
                              styles.chevronIcon,
                              isExpanded && styles.chevronExpanded,
                            ]}
                          />
                        </View>
                        {isExpanded && (
                          <Text style={styles.accordionDetail}>
                            {item.detail}
                          </Text>
                        )}
                      </Pressable>
                    );
                  })
                )}
              </View>
            </>
          ) : (
            <>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.headerIcon,
                    { backgroundColor: "rgba(15, 152, 168, 0.12)" },
                  ]}
                >
                  <Wrench size={16} color={colors.primary} />
                </View>
                <Text style={styles.cardHeaderTitle}>What You Can Do</Text>
              </View>

              <View style={styles.cardBody}>
                {isLoading ? (
                  <SkeletonContent />
                ) : (
                  <Text style={styles.bodyText}>
                    No immediate action is required. Continue with your regular
                    maintenance schedule and record another session if you notice
                    any changes in engine sound.
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing["3xl"],
    paddingBottom: spacing.lg,
  },

  backButton: {
    width: 40,
    paddingTop: 2,
  },

  headerCenter: {
    alignItems: "center",
  },

  headerSpacer: {
    width: 40,
  },

  headerTitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 20,
    lineHeight: 28,
    color: colors.primaryLight,
    textAlign: "center",
  },

  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: "center",
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  headerIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  cardHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: colors.text.primary,
  },

  cardBody: {
    padding: spacing.md,
  },

  // Recorded
  recordedRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  recordedInfo: {
    flex: 1,
  },

  recordedTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: colors.text.primary,
  },

  recordedDate: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: colors.text.tertiary,
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

  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },

  axisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  axisLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: colors.text.tertiary,
  },

  // Tab Bar
  tabBar: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    alignItems: "center",
    borderWidth: 1.5,
  },

  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  tabInactive: {
    backgroundColor: "transparent",
    borderColor: colors.border,
  },

  tabText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  tabTextActive: {
    fontFamily: fontFamilies.bold,
    color: colors.text.inverse,
  },

  // Most Likely Cause
  causeTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  causeLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },

  causeLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 2,
  },

  causeMeta: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.tertiary,
  },

  causeRight: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Confidence tags
  confidenceTags: {
    flexDirection: "row",
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },

  tagText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
  },

  // Body text
  bodyText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },

  // Accordion
  accordionItem: {
    paddingVertical: spacing.sm,
  },

  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  accordionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  accordionTitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },

  chevronIcon: {
    transform: [{ rotate: "0deg" }],
  },

  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },

  accordionDetail: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
    marginTop: spacing.sm,
    paddingLeft: spacing.md + 8,
  },

  // Skeleton
  skeletonContainer: {
    gap: spacing.sm,
  },

  skeletonBar: {
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },
});
