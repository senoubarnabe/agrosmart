import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "WeeklySchedule">;
type FilterValue = "all" | "water" | "fertilize" | "maintenance";
type ScheduleEvent = {
  category: FilterValue;
  icon: keyof typeof MaterialIcons.glyphMap;
  tone: string;
  bg: string;
  title: string;
  status?: string;
  statusTone?: string;
  statusBg?: string;
  place: string;
  detail: string;
  muted?: boolean;
  editable?: boolean;
  danger?: boolean;
};
type ScheduleDay = {
  date: string;
  title: string;
  meta: string;
  active?: boolean;
  events: ScheduleEvent[];
};

const gardenImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDamhi4yVa6U_b-MZX7JYU4F7QUbG9SzYIXjLY9lqH7w83xrlIrMAnF2otsEUTGO6yzjvJqWP9AqBtn4Ov5KfNlkLlTYHAp8joaO_GqOQsRbjUjA08HgRh54dFkwFpzntk4ECLutI7K4i-Si2rEYpzn_WSZIcZk-lQVNr_QccoAl1B8JSLSS-td5Vcv7FGrfequjwgBw_xGkCsuIjzYx-iiD8jgkkgVgY7M_-y2-eMnLT90or5htkpHlNSMLMSbEdhRx_88wa0PdMcI";

const filters: { label: string; value: FilterValue; icon?: keyof typeof MaterialIcons.glyphMap }[] = [
  { label: "Tout voir", value: "all" },
  { label: "Arrosage", value: "water", icon: "water-drop" },
  { label: "Fertilisation", value: "fertilize", icon: "eco" },
  { label: "Maintenance", value: "maintenance", icon: "build" },
];

const days: ScheduleDay[] = [
  {
    date: "12",
    title: "Lundi, 12 Juin",
    meta: "AUJOURD'HUI • 3 ÉVÉNEMENTS",
    active: true,
    events: [
      { category: "water" as FilterValue, icon: "water-drop" as const, tone: "#2563eb", bg: "#eff6ff", title: "Arrosage automatique", status: "TERMINÉ", statusTone: colors.onPrimary, statusBg: colors.primaryContainer, place: "Zone A: Tomates & Poivrons", detail: "06:00 - 06:45 • 450L" },
      { category: "maintenance" as FilterValue, icon: "build" as const, tone: colors.secondaryContainer, bg: "#fff7ed", title: "Nettoyage des buses", status: "EN COURS", statusTone: colors.onSecondaryContainer, statusBg: colors.secondaryContainer, place: "Secteur Nord-Est • Filtres secondaires", detail: "09:30 - 10:30" },
      { category: "fertilize" as FilterValue, icon: "eco" as const, tone: colors.primary, bg: colors.primaryFixed, title: "Fertigation N-P-K", status: "À VENIR", statusTone: colors.onSurfaceVariant, statusBg: colors.surfaceContainerHighest, place: "Zone C: Verger d'agrumes", detail: "17:00 • Dosage Bio-12", muted: true },
    ],
  },
  {
    date: "13",
    title: "Mardi, 13 Juin",
    meta: "DEMAIN • 1 ÉVÉNEMENT",
    events: [{ category: "water" as FilterValue, icon: "water-drop" as const, tone: "#2563eb", bg: "#eff6ff", title: "Arrosage matinal", place: "Zone B: Maïs doux", detail: "05:30 - 06:15", editable: true }],
  },
  {
    date: "14",
    title: "Mercredi, 14 Juin",
    meta: "2 ÉVÉNEMENTS",
    events: [
      { category: "water" as FilterValue, icon: "water-drop" as const, tone: "#2563eb", bg: "#eff6ff", title: "Arrosage Zone A", place: "Tomates & Poivrons", detail: "06:00" },
      { category: "maintenance" as FilterValue, icon: "warning" as const, tone: colors.error, bg: colors.errorContainer, title: "Révision Pompe Solaire", place: "Inspection trimestrielle requise", detail: "Priorité Haute", danger: true },
    ],
  },
];

export function WeeklyScheduleScreen({ navigation }: Props) {
  const { profileImage } = useOnboarding();
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("all");
  const filteredDays = days
    .map((day) => ({ ...day, events: selectedFilter === "all" ? day.events : day.events.filter((event) => event.category === selectedFilter) }))
    .filter((day) => day.events.length > 0);

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={26} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>Programme Hebdomadaire</Text>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </View>

      <View style={styles.filters}>
        {filters.map((filter) => {
          const active = selectedFilter === filter.value;
          return (
            <Pressable key={filter.value} onPress={() => setSelectedFilter(filter.value)} style={({ pressed }) => [styles.filterPill, active && styles.filterPillActive, pressed && styles.pressed]}>
              {filter.icon ? <MaterialIcons name={filter.icon} size={18} color={active ? colors.onSecondaryContainer : colors.onSurfaceVariant} /> : null}
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.timeline}>
        {filteredDays.map((day, index) => (
          <DaySection key={day.date} {...day} last={index === filteredDays.length - 1} />
        ))}
      </View>

      <Pressable style={({ pressed }) => [styles.moreDaysRow, pressed && styles.pressed]}>
        <View style={styles.moreDaysCopy}>
          <MaterialIcons name="calendar-month" size={24} color={colors.outline} />
          <Text style={styles.moreDaysText}>Afficher les jours restants (15-18 Juin)</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
      </Pressable>

      <ImageBackground source={{ uri: gardenImage }} style={styles.imageCard} imageStyle={styles.imageCardImage}>
        <View style={styles.imageShade} />
        <View style={styles.imageCopy}>
          <Text style={styles.imageTitle}>Prévisions favorables</Text>
          <Text style={styles.imageText}>Faible probabilité de pluie, maintenez le programme d'arrosage.</Text>
        </View>
      </ImageBackground>

      <Pressable style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
        <MaterialIcons name="add" size={30} color={colors.onPrimary} />
      </Pressable>
    </Screen>
  );
}

function DaySection({ date, title, meta, active, events, last }: ScheduleDay & { last: boolean }) {
  return (
    <View style={styles.daySection}>
      <View style={styles.dayHeader}>
        <View style={[styles.dayBubble, active && styles.dayBubbleActive]}>
          <Text style={[styles.dayDate, active && styles.dayDateActive]}>{date}</Text>
        </View>
        <View style={styles.dayTitleWrap}>
          <Text style={styles.dayTitle}>{title}</Text>
          <Text style={[styles.dayMeta, active && styles.dayMetaActive]}>{meta}</Text>
        </View>
      </View>
      <View style={styles.eventsWrap}>
        {!last ? <View style={styles.timelineLine} /> : null}
        {events.map((event) => <EventCard key={`${date}-${event.title}`} {...event} />)}
      </View>
    </View>
  );
}

function EventCard({
  icon,
  tone,
  bg,
  title,
  status,
  statusTone,
  statusBg,
  place,
  detail,
  muted,
  editable,
  danger,
}: ScheduleEvent) {
  return (
    <Pressable style={({ pressed }) => [styles.eventCard, muted && styles.eventMuted, pressed && styles.pressed]}>
      <View style={[styles.eventIcon, { backgroundColor: bg }]}>
        <MaterialIcons name={icon} size={24} color={tone} />
      </View>
      <View style={styles.eventCopy}>
        <View style={styles.eventTitleRow}>
          <Text style={styles.eventTitle} numberOfLines={1}>{title}</Text>
          {status ? <Text style={[styles.statusPill, { backgroundColor: statusBg, color: statusTone }]} numberOfLines={1}>{status}</Text> : null}
        </View>
        <Text style={styles.eventPlace} numberOfLines={1}>{place}</Text>
        <View style={styles.eventDetailRow}>
          <MaterialIcons name={danger ? "priority-high" : "schedule"} size={15} color={danger ? colors.error : colors.outline} />
          <Text style={[styles.eventDetail, danger && styles.eventDetailDanger]} numberOfLines={1}>{detail}</Text>
        </View>
      </View>
      {editable ? (
        <View style={styles.editButton}>
          <MaterialIcons name="edit" size={21} color={colors.primary} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 26 },
  header: { minHeight: 64, flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: spacing.mobile, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: `${colors.outlineVariant}60` },
  backButton: { width: 34, height: 34, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  avatar: { width: 40, height: 40, borderRadius: radius.full, borderWidth: 2, borderColor: colors.primaryFixed },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: spacing.mobile, paddingTop: 16, paddingBottom: 20 },
  filterPill: { minHeight: 38, flexDirection: "row", alignItems: "center", gap: 6, borderRadius: radius.full, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant, paddingHorizontal: 14 },
  filterPillActive: { backgroundColor: colors.secondaryContainer, borderColor: colors.secondaryContainer },
  filterText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  filterTextActive: { color: colors.onSecondaryContainer },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  timeline: { paddingHorizontal: spacing.mobile, gap: spacing.stackMd },
  daySection: { position: "relative" },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 },
  dayBubble: { zIndex: 2, width: 42, height: 42, borderRadius: radius.full, backgroundColor: colors.surfaceContainerHighest, alignItems: "center", justifyContent: "center" },
  dayBubbleActive: { backgroundColor: colors.primary },
  dayDate: { ...type.label, fontFamily: fonts.heading, color: colors.onSurface },
  dayDateActive: { color: colors.onPrimary },
  dayTitleWrap: { flex: 1, minWidth: 0 },
  dayTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  dayMeta: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
  dayMetaActive: { color: colors.primary },
  eventsWrap: { marginLeft: 20, paddingLeft: 28, gap: 12, position: "relative" },
  timelineLine: { position: "absolute", left: 0, top: 0, bottom: -24, width: 2, borderLeftWidth: 2, borderStyle: "dashed", borderLeftColor: colors.outlineVariant },
  eventCard: { flexDirection: "row", alignItems: "flex-start", gap: 12, borderRadius: radius.xl, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant, padding: 13, ...shadow.card },
  eventMuted: { opacity: 0.82 },
  eventIcon: { width: 46, height: 46, borderRadius: radius.full, alignItems: "center", justifyContent: "center" },
  eventCopy: { flex: 1, minWidth: 0 },
  eventTitleRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  eventTitle: { flex: 1, ...type.label, fontFamily: fonts.heading, color: colors.onSurface },
  statusPill: { maxWidth: 78, borderRadius: radius.full, paddingHorizontal: 7, paddingVertical: 3, fontSize: 9, lineHeight: 12, fontWeight: "800", overflow: "hidden" },
  eventPlace: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 3 },
  eventDetailRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  eventDetail: { flex: 1, ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
  eventDetailDanger: { color: colors.error },
  editButton: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  moreDaysRow: { marginHorizontal: spacing.mobile, marginTop: spacing.stackMd, paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: colors.outlineVariant, gap: 12 },
  moreDaysCopy: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, minWidth: 0 },
  moreDaysText: { flex: 1, ...type.label, fontFamily: fonts.heading, color: colors.onSurface },
  imageCard: { height: 192, marginHorizontal: spacing.mobile, marginTop: 12, borderRadius: radius.xl, overflow: "hidden", justifyContent: "flex-end" },
  imageCardImage: { borderRadius: radius.xl },
  imageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,69,13,0.48)" },
  imageCopy: { padding: 18 },
  imageTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimary },
  imageText: { ...type.label, fontFamily: fonts.body, color: colors.inverseOnSurface, marginTop: 4 },
  fab: { alignSelf: "flex-end", width: 56, height: 56, borderRadius: radius.full, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginRight: spacing.mobile, marginTop: spacing.stackMd, ...shadow.lift },
});
