import React, { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import HomeBottomBar from "@/src/components/HomeBottomBar";
import { colors, fontFamilies, radius, spacing } from "@/src/theme";

type Status = "healthy" | "needs-attention" | "critical";

interface Recording {
  id: string;
  title: string;
  subtitle: string;
  day: string;
  monthShort: string;
  month: string;
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

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "healthy", label: "Healthy" },
  { key: "needs-attention", label: "Needs Attention" },
  { key: "critical", label: "Critical" },
];

const MOCK_RECORDINGS: Recording[] = [
  {
    id: "1",
    title: "Engine idle hum",
    subtitle: "Likely: Healthy",
    day: "12",
    monthShort: "Jul",
    month: "July 2026",
    status: "healthy",
  },
  {
    id: "2",
    title: "Metallic clicking",
    subtitle: "Likely: Worn bearing",
    day: "10",
    monthShort: "Jul",
    month: "July 2026",
    status: "needs-attention",
  },
  {
    id: "3",
    title: "High-pitched squeal",
    subtitle: "Likely: Belt issue",
    day: "04",
    monthShort: "Jul",
    month: "July 2026",
    status: "critical",
  },
  {
    id: "4",
    title: "Engine knocking sound",
    subtitle: "Likely: Engine mount issue",
    day: "28",
    monthShort: "Jun",
    month: "June 2026",
    status: "needs-attention",
  },
  {
    id: "5",
    title: "Brake squeal",
    subtitle: "Likely: Brake pads worn",
    day: "15",
    monthShort: "Jun",
    month: "June 2026",
    status: "critical",
  },
];

interface Section {
  title: string;
  data: Recording[];
}

export default function History() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sections = useMemo<Section[]>(() => {
    const grouped = new Map<string, Recording[]>();

    MOCK_RECORDINGS.forEach((item) => {
      if (!grouped.has(item.month)) {
        grouped.set(item.month, []);
      }
      grouped.get(item.month)!.push(item);
    });

    return Array.from(grouped.entries()).map(([title, data]) => ({
      title,
      data,
    }));
  }, []);

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const renderItem = ({ item }: { item: Recording }) => {
    const config = STATUS_CONFIG[item.status];
    const StatusIcon = config.icon;

    return (
      <Pressable
        onPress={() => router.push("/analysis")}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View
          style={[styles.statusBorder, { backgroundColor: config.color }]}
        />

        <View style={styles.dateColumn}>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.monthText}>{item.monthShort}</Text>
        </View>

        <View style={styles.iconContainer}>
          <StatusIcon size={20} color={config.color} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        </View>

        <View style={styles.chevronContainer}>
          <ChevronRight size={20} color={colors.text.tertiary} />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text.primary} />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>History</Text>
            <Text style={styles.headerSubtitle}>Your past sound diagnoses</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Search size={20} color={colors.text.tertiary} />
            <TextInput
              style={styles.searchText}
              placeholder="Search recordings..."
              placeholderTextColor={colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable style={styles.filterButton}>
            <SlidersHorizontal size={20} color={colors.text.primary} />
          </Pressable>
        </View>

        <View style={styles.chipRow}>
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.key;
            const isHealthy = filter.key === "healthy";
            const isCritical = filter.key === "critical";
            const chipColor = isCritical
              ? colors.error
              : isHealthy
              ? colors.success
              : filter.key === "needs-attention"
              ? colors.warning
              : colors.primary;

            return (
              <Pressable
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key)}
                style={[
                  styles.chip,
                  isSelected && { backgroundColor: chipColor },
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
                    isSelected && { color: colors.text.inverse },
                  ]}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <HomeBottomBar />
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
    paddingHorizontal: spacing.xl,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
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

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  searchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
  },

  searchText: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: colors.text.primary,
  },

  filterButton: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: colors.surface,
  },

  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  chipText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.primary,
  },

  listContent: {
    paddingBottom: spacing.xl,
  },

  sectionHeader: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
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

  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  statusBorder: {
    width: 4,
    alignSelf: "stretch",
  },

  dateColumn: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },

  dayText: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.text.primary,
  },

  monthText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  cardContent: {
    flex: 1,
    paddingVertical: spacing.md,
  },

  titleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: colors.text.primary,
  },

  subtitleText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },

  chevronContainer: {
    alignSelf: "flex-start",
    paddingTop: spacing.md,
    paddingRight: spacing.md,
    paddingLeft: spacing.sm,
  },
});
