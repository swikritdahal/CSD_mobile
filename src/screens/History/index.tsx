import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react-native";

import HomeBottomBar from "@/src/components/HomeBottomBar";
import { colors, fontFamilies, radius, spacing } from "@/src/theme";

type Status = "healthy" | "needs-attention" | "critical";

interface Recording {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  dateObj: Date;
  status: Status;
}

const STATUS_CONFIG: Record<
  Status,
  { color: string; icon: typeof CheckCircle; label: string }
> = {
  healthy: {
    color: colors.success,
    icon: CheckCircle,
    label: "Healthy",
  },
  "needs-attention": {
    color: colors.warning,
    icon: AlertCircle,
    label: "Needs Attention",
  },
  critical: {
    color: colors.error,
    icon: AlertTriangle,
    label: "Critical",
  },
};

const CATEGORY_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "healthy", label: "Healthy" },
  { key: "needs-attention", label: "Needs Attention" },
  { key: "critical", label: "Critical" },
];

const DATE_FILTERS: {
  key: string;
  label: string;
  filter: (d: Date) => boolean;
}[] = [
  { key: "all", label: "All time", filter: () => true },
  {
    key: "week",
    label: "This week",
    filter: (d) => {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return d >= weekAgo;
    },
  },
  {
    key: "month",
    label: "This month",
    filter: (d) => {
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    },
  },
  {
    key: "3months",
    label: "Last 3 months",
    filter: (d) => {
      const now = new Date();
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return d >= threeMonthsAgo;
    },
  },
  {
    key: "6months",
    label: "Last 6 months",
    filter: (d) => {
      const now = new Date();
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return d >= sixMonthsAgo;
    },
  },
];

const MOCK_RECORDINGS: Recording[] = [
  {
    id: "1",
    title: "Engine idle hum",
    subtitle: "Likely: Healthy",
    date: "12 Jul 2026",
    dateObj: new Date(2026, 6, 12),
    status: "healthy",
  },
  {
    id: "2",
    title: "Metallic clicking",
    subtitle: "Likely: Worn bearing",
    date: "10 Jul 2026",
    dateObj: new Date(2026, 6, 10),
    status: "needs-attention",
  },
  {
    id: "3",
    title: "High-pitched squeal",
    subtitle: "Likely: Belt issue",
    date: "04 Jul 2026",
    dateObj: new Date(2026, 6, 4),
    status: "critical",
  },
  {
    id: "4",
    title: "Engine knocking sound",
    subtitle: "Likely: Engine mount issue",
    date: "28 Jun 2026",
    dateObj: new Date(2026, 5, 28),
    status: "needs-attention",
  },
  {
    id: "5",
    title: "Brake squeal",
    subtitle: "Likely: Brake pads worn",
    date: "15 Jun 2026",
    dateObj: new Date(2026, 5, 15),
    status: "critical",
  },
  {
    id: "6",
    title: "Idle vibration",
    subtitle: "Likely: Normal engine operation",
    date: "08 Jul 2026",
    dateObj: new Date(2026, 6, 8),
    status: "healthy",
  },
  {
    id: "7",
    title: "Exhaust rattle",
    subtitle: "Likely: Loose heat shield",
    date: "22 Jun 2026",
    dateObj: new Date(2026, 5, 22),
    status: "needs-attention",
  },
  {
    id: "8",
    title: "Transmission whine",
    subtitle: "Likely: Low fluid level",
    date: "05 May 2026",
    dateObj: new Date(2026, 4, 5),
    status: "critical",
  },
  {
    id: "9",
    title: "Fan belt chirp",
    subtitle: "Likely: Belt misalignment",
    date: "18 Jul 2026",
    dateObj: new Date(2026, 6, 18),
    status: "needs-attention",
  },
  {
    id: "10",
    title: "Coolant hiss",
    subtitle: "Likely: Normal operating temperature",
    date: "14 Jul 2026",
    dateObj: new Date(2026, 6, 14),
    status: "healthy",
  },
  {
    id: "11",
    title: "Air filter noise",
    subtitle: "Likely: Clogged air filter",
    date: "10 Jun 2026",
    dateObj: new Date(2026, 5, 10),
    status: "needs-attention",
  },
  {
    id: "12",
    title: "Starter motor grind",
    subtitle: "Likely: Worn starter gear",
    date: "02 May 2026",
    dateObj: new Date(2026, 4, 2),
    status: "critical",
  },
  {
    id: "13",
    title: "Steering pump whine",
    subtitle: "Likely: Low power steering fluid",
    date: "20 Jun 2026",
    dateObj: new Date(2026, 5, 20),
    status: "needs-attention",
  },
  {
    id: "14",
    title: "Engine purr",
    subtitle: "Likely: Healthy",
    date: "01 Jul 2026",
    dateObj: new Date(2026, 6, 1),
    status: "healthy",
  },
  {
    id: "15",
    title: "Suspension creak",
    subtitle: "Likely: Worn bushings",
    date: "12 May 2026",
    dateObj: new Date(2026, 4, 12),
    status: "needs-attention",
  },
  {
    id: "16",
    title: "AC compressor rattle",
    subtitle: "Likely: Failing compressor clutch",
    date: "25 Jun 2026",
    dateObj: new Date(2026, 5, 25),
    status: "critical",
  },
  {
    id: "17",
    title: "Smooth idle",
    subtitle: "Likely: Healthy",
    date: "06 Jul 2026",
    dateObj: new Date(2026, 6, 6),
    status: "healthy",
  },
  {
    id: "18",
    title: "Wheel bearing hum",
    subtitle: "Likely: Worn wheel bearing",
    date: "16 May 2026",
    dateObj: new Date(2026, 4, 16),
    status: "critical",
  },
  {
    id: "19",
    title: "Fuel pump buzz",
    subtitle: "Likely: Normal fuel delivery",
    date: "09 Jul 2026",
    dateObj: new Date(2026, 6, 9),
    status: "healthy",
  },
  {
    id: "20",
    title: "Timing chain rattle",
    subtitle: "Likely: Chain tensioner wear",
    date: "08 May 2026",
    dateObj: new Date(2026, 4, 8),
    status: "critical",
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

function SkeletonRow() {
  return (
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonIcon} />
      <View style={styles.skeletonContent}>
        <SkeletonBar widthPercent={55} height={14} />
        <SkeletonBar widthPercent={40} height={10} />
      </View>
    </View>
  );
}

function SkeletonSection() {
  return (
    <View style={styles.section}>
      <SkeletonBar widthPercent={25} height={12} />
      <View style={styles.sectionCard}>
        <SkeletonRow />
        <View style={styles.divider} />
        <SkeletonRow />
        <View style={styles.divider} />
        <SkeletonRow />
      </View>
    </View>
  );
}

export default function History() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredRecordings = useMemo(() => {
    return MOCK_RECORDINGS.filter((r) => {
      if (selectedCategory !== "all" && r.status !== selectedCategory)
        return false;

      const dateFilter = DATE_FILTERS.find((f) => f.key === selectedDateFilter);
      if (dateFilter && !dateFilter.filter(r.dateObj)) return false;

      return true;
    });
  }, [selectedCategory, selectedDateFilter]);

  const groupedRecordings = useMemo(() => {
    const groups: { month: string; data: Recording[] }[] = [];
    const map = new Map<string, Recording[]>();

    const sorted = [...filteredRecordings].sort(
      (a, b) => b.dateObj.getTime() - a.dateObj.getTime()
    );

    for (const recording of sorted) {
      const key = `${MONTHS[recording.dateObj.getMonth()]} ${recording.dateObj.getFullYear()}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(recording);
    }

    for (const [month, data] of map) {
      groups.push({ month, data });
    }

    return groups;
  }, [filteredRecordings]);

  const hasActiveFilters =
    selectedCategory !== "all" || selectedDateFilter !== "all";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedDateFilter("all");
  };

  const renderRow = ({ item }: { item: Recording }) => {
    const config = STATUS_CONFIG[item.status];
    const StatusIcon = config.icon;
    const rowBg = `${config.color}10`;
    const borderColor = config.color;

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/analysis",
            params: {
              id: item.id,
              title: item.title,
              status: item.status,
              date: item.date,
            },
          })
        }
        style={({ pressed }) => [
          styles.row,
          { backgroundColor: rowBg, borderLeftColor: borderColor },
          pressed && styles.rowPressed,
        ]}
      >
        <View
          style={[styles.rowIcon, { backgroundColor: `${config.color}20` }]}
        >
          <StatusIcon size={18} color={config.color} />
        </View>

        <View style={styles.rowContent}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.rowSubtitle} numberOfLines={1}>
            {config.label} · {item.date}
          </Text>
        </View>

        <ChevronRight size={18} color={colors.text.tertiary} />
      </Pressable>
    );
  };

  const renderMonthSection = ({
    item,
  }: {
    item: { month: string; data: Recording[] };
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{item.month.toUpperCase()}</Text>
      <View style={styles.sectionCard}>
        {item.data.map((recording, index) => (
          <View key={recording.id}>
            {renderRow({ item: recording })}
            {index < item.data.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );

  const activeDateLabel =
    DATE_FILTERS.find((f) => f.key === selectedDateFilter)?.label || "All time";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text.primary} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>History</Text>
            <Text style={styles.headerSubtitle}>Your past sound diagnoses</Text>
          </View>
          <View style={styles.backButton} />
        </View>

        <View style={styles.dateFilterRow}>
          <Pressable
            style={styles.dateFilterButton}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar size={16} color={colors.primary} />
            <Text style={styles.dateFilterText}>{activeDateLabel}</Text>
            <ChevronRight
              size={14}
              color={colors.text.tertiary}
              style={[
                styles.dateChevron,
                showDatePicker && styles.dateChevronOpen,
              ]}
            />
          </Pressable>
        </View>

        {showDatePicker && (
          <View style={styles.dateOptions}>
            {DATE_FILTERS.map((filter) => {
              const isSelected = selectedDateFilter === filter.key;
              return (
              <Pressable
                key={filter.key}
                style={[
                  styles.dateOption,
                  isSelected && styles.dateOptionSelected,
                ]}
                onPress={() => {
                  setSelectedDateFilter(filter.key);
                  setShowDatePicker(false);
                  triggerLoading();
                }}
                >
                  <Text
                    style={[
                      styles.dateOptionText,
                      isSelected && styles.dateOptionTextSelected,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.chipRow}>
          {CATEGORY_FILTERS.map((filter) => {
            const isSelected = selectedCategory === filter.key;
            const chipColor =
              filter.key === "critical"
                ? colors.error
                : filter.key === "healthy"
                  ? colors.success
                  : filter.key === "needs-attention"
                    ? colors.warning
                    : colors.primary;

            return (
              <Pressable
                key={filter.key}
                onPress={() => {
                  setSelectedCategory(filter.key);
                  triggerLoading();
                }}
                style={[
                  styles.chip,
                  isSelected
                    ? { backgroundColor: chipColor }
                    : { borderColor: chipColor, borderWidth: 1.5 },
                ]}
              >
                {filter.key !== "all" && (
                  <View
                    style={[
                      styles.chipDot,
                      { backgroundColor: chipColor },
                      isSelected && { backgroundColor: colors.surface },
                    ]}
                  />
                )}
                <Text
                  style={[
                    styles.chipText,
                    isSelected
                      ? { color: colors.text.inverse }
                      : { color: chipColor },
                  ]}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isLoading ? (
          <View style={styles.listContent}>
            <SkeletonSection />
            <SkeletonSection />
          </View>
        ) : groupedRecordings.length > 0 ? (
          <FlatList
            data={groupedRecordings}
            keyExtractor={(item) => item.month}
            renderItem={renderMonthSection}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <ClipboardList size={48} color={colors.text.tertiary} />
            <Text style={styles.emptyTitle}>No recordings found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your filters
            </Text>
            {hasActiveFilters && (
              <Pressable style={styles.clearButton} onPress={clearAllFilters}>
                <Text style={styles.clearButtonText}>Clear filters</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      <HomeBottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
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

  dateFilterRow: {
    marginBottom: spacing.md,
  },

  dateFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  dateFilterText: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.primary,
  },

  dateChevron: {
    transform: [{ rotate: "0deg" }],
  },

  dateChevronOpen: {
    transform: [{ rotate: "90deg" }],
  },

  dateOptions: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },

  dateOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  dateOptionSelected: {
    backgroundColor: `${colors.primary}12`,
  },

  dateOptionText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  dateOptionTextSelected: {
    fontFamily: fontFamilies.bold,
    color: colors.primary,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "transparent",
  },

  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  chipText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
  },

  listContent: {
    paddingBottom: spacing.xl,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionHeader: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: colors.text.secondary,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },

  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    borderLeftWidth: 3,
  },

  rowPressed: {
    opacity: 0.85,
  },

  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  rowContent: {
    flex: 1,
  },

  rowTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: colors.text.primary,
  },

  rowSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.tertiary,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 36 + spacing.md * 2,
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing["4xl"],
    gap: spacing.sm,
  },

  emptyTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text.primary,
    marginTop: spacing.sm,
  },

  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.tertiary,
  },

  clearButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  clearButtonText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: colors.text.inverse,
  },

  skeletonBar: {
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },

  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },

  skeletonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
  },

  skeletonContent: {
    flex: 1,
    gap: spacing.xs,
  },
});
