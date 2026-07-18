import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Mic } from "lucide-react-native";

import { colors, fontFamilies, radius, spacing } from "@/src/theme";

interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
  result: string;
}

const MOCK_RECORDINGS: Recording[] = [
  {
    id: "1",
    title: "Engine knocking sound",
    date: "Today, 9:41 AM",
    duration: "0:05",
    result: "Possible engine mount issue",
  },
  {
    id: "2",
    title: "Brake squeal",
    date: "Yesterday, 4:20 PM",
    duration: "0:04",
    result: "Brake pads worn",
  },
  {
    id: "3",
    title: "Suspension noise",
    date: "Jul 18, 10:15 AM",
    duration: "0:06",
    result: "Check shock absorbers",
  },
  {
    id: "4",
    title: "Exhaust rattle",
    date: "Jul 17, 6:30 PM",
    duration: "0:03",
    result: "Loose heat shield",
  },
];

export default function History() {
  const renderItem = ({ item }: { item: Recording }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Mic size={20} color={colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.date} • {item.duration}
        </Text>
        <Text style={styles.result}>{item.result}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>History</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={MOCK_RECORDINGS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.text.primary,
  },

  placeholder: {
    width: 40,
  },

  list: {
    padding: spacing.xl,
    gap: spacing.md,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundGolden,
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    flex: 1,
    gap: spacing.xs,
  },

  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: colors.text.primary,
  },

  meta: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },

  result: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: colors.primary,
  },
});
