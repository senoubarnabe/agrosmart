import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CultureDetail">;

const tomatoHero =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJp8c0w5b8IyYr_lLnVgRRHECE48SGYmd2FC4u4nwBoWCNpFT1QqWcYPs9lrblJe-T7Dau2eeQ0NAP48UE24yJSr215H-XQJZ5N2I451SJUL9RtuhcJH51_e8Vko-cFi41Je32LwgeheQbcG7MuEjt_5rMv72v0-9h-oBKTQgSmYM88S70oTfqqqkx0hgyFgJhNba-xiPHvOuDlumtEEZhpsdKoClpPP8fzXFy85W3oLfwtotuYk_KPLLVIo5tyvUch6_rjnOTaOa8";

export function CultureDetailScreen({ navigation, route }: Props) {
  const { cultures } = useOnboarding();
  const selectedCulture = cultures.find((culture) => culture.name === route.params?.cultureName) ?? cultures[0];
  const name = cleanCultureName(selectedCulture.name);
  const isTomato = name.toLowerCase().includes("tomate");
  const progress = selectedCulture.progress;
  const heroImage = isTomato ? tomatoHero : selectedCulture.image;

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerIcon} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Détail : {name}
        </Text>
        <View style={styles.monitorIcon}>
          <MaterialIcons name="monitor" size={22} color={colors.primary} />
        </View>
      </View>

      <ImageBackground source={{ uri: heroImage }} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroShade} />
        <View style={styles.heroBadges}>
          <View style={styles.healthBadge}>
            <MaterialIcons name="check-circle" size={18} color={colors.primary} />
            <Text style={styles.healthBadgeText} numberOfLines={1}>
              {selectedCulture.health}
            </Text>
          </View>
          <View style={styles.stageBadge}>
            <Text style={styles.stageBadgeText} numberOfLines={1}>
              {selectedCulture.stage}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.cardLabel}>Progression de croissance</Text>
          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>
        <Text style={styles.progressTitle}>{selectedCulture.week}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.infoLine}>
          <MaterialIcons name="info" size={18} color={colors.primary} />
          <Text style={styles.infoLineText}>Récolte prévue dans environ 5 semaines.</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard icon="water-drop" label="Humidité du sol" value={isTomato ? "72%" : selectedCulture.humidity.split(" ")[0]} note="Optimal (65-75%)" />
        <MetricCard icon="favorite" label="Santé Globale" value={selectedCulture.alert ? "71%" : "98%"} note="Score de vigueur" />
        <Pressable onPress={() => navigation.navigate("HarvestForecast")} style={({ pressed }) => [styles.harvestCard, pressed && styles.cardPressed]}>
          <View style={styles.harvestIcon}>
            <MaterialIcons name="event-available" size={24} color={colors.primary} />
          </View>
          <View style={styles.harvestText}>
            <Text style={styles.cardLabel}>Récolte estimée</Text>
            <Text style={styles.harvestValue}>15 Octobre 2024</Text>
          </View>
          <MaterialIcons name="chevron-right" size={28} color={colors.onSurfaceVariant} />
        </Pressable>
      </View>

      <View style={styles.scheduleHeader}>
        <Text style={styles.sectionTitle}>Programme de la semaine</Text>
        <Pressable onPress={() => navigation.navigate("WeeklySchedule")} hitSlop={10}>
          <Text style={styles.seeAll}>VOIR TOUT</Text>
        </Pressable>
      </View>

      <View style={styles.scheduleCard}>
        <ScheduleRow day="AUJ" date="12" title="Arrosage Matinal" subtitle="06:30 • 15 Litres / m²" icon="sensors" active />
        <ScheduleRow day="DEM" date="13" title="Fertilisation bio" subtitle="08:00 • Nutriments NPK" icon="eco" />
        <ScheduleRow day="JEU" date="14" title="Contrôle Insectes" subtitle="17:00 • Inspection visuelle" icon="bug-report" last />
      </View>

      <Pressable onPress={() => navigation.navigate("WateringActive", { cultureName: name })} style={({ pressed }) => [styles.waterButton, pressed && styles.waterButtonPressed]}>
        <MaterialIcons name="water-drop" size={22} color={colors.onPrimary} />
        <Text style={styles.waterButtonText}>Arroser maintenant</Text>
      </Pressable>
    </Screen>
  );
}

function cleanCultureName(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(" ") : name;
}

function MetricCard({ icon, label, value, note }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; note: string }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIcon}>
        <MaterialIcons name={icon} size={26} color={colors.primary} />
      </View>
      <Text style={styles.metricLabel} numberOfLines={2}>
        {label}
      </Text>
      <Text style={styles.metricValue} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.metricNote} numberOfLines={1}>
        {note}
      </Text>
    </View>
  );
}

function ScheduleRow({
  day,
  date,
  title,
  subtitle,
  icon,
  active,
  last,
}: {
  day: string;
  date: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.scheduleRow, last && styles.scheduleRowLast]}>
      <View style={[styles.dateBox, active && styles.dateBoxActive]}>
        <Text style={[styles.dateDay, active && styles.dateDayActive]}>{day}</Text>
        <Text style={[styles.dateNumber, active && styles.dateDayActive]}>{date}</Text>
      </View>
      <View style={styles.scheduleCopy}>
        <Text style={styles.scheduleTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.scheduleSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.scheduleIcon}>
        <MaterialIcons name={icon} size={22} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0 },
  header: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: spacing.mobile,
    backgroundColor: colors.surfaceDim,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}70`,
  },
  headerIcon: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary },
  monitorIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  hero: {
    height: 232,
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    borderRadius: radius.card,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: colors.surfaceContainerHigh,
  },
  heroImage: { borderRadius: radius.card },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  heroBadges: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 14 },
  healthBadge: {
    maxWidth: "58%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  healthBadgeText: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, flexShrink: 1 },
  stageBadge: {
    maxWidth: "38%",
    borderRadius: radius.full,
    backgroundColor: colors.tertiaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  stageBadgeText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onTertiaryFixed },
  progressCard: {
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}70`,
    padding: 18,
    ...shadow.card,
  },
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  cardLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  progressPercent: { ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  progressTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, marginTop: 6 },
  progressTrack: { height: 12, borderRadius: radius.full, backgroundColor: colors.surfaceContainer, overflow: "hidden", marginTop: 14 },
  progressFill: { height: "100%", borderRadius: radius.full, backgroundColor: colors.primaryFixedDim },
  infoLine: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: 12,
  },
  infoLineText: { flex: 1, ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginHorizontal: spacing.mobile, marginTop: spacing.stackMd },
  metricCard: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 148,
    minHeight: 154,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}70`,
    padding: 16,
    justifyContent: "center",
    ...shadow.card,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricLabel: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  metricValue: { fontSize: 34, lineHeight: 40, fontWeight: "800", fontFamily: fonts.heading, color: colors.primary, marginTop: 4 },
  metricNote: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline, marginTop: 2 },
  harvestCard: {
    width: "100%",
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}70`,
    padding: 16,
    ...shadow.card,
  },
  cardPressed: { transform: [{ scale: 0.99 }], opacity: 0.94 },
  harvestIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  harvestText: { flex: 1, minWidth: 0 },
  harvestValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, marginTop: 2 },
  scheduleHeader: {
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.primary, flex: 1 },
  seeAll: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, letterSpacing: 0.6 },
  scheduleCard: {
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackSm,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}70`,
    overflow: "hidden",
    ...shadow.card,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}60`,
  },
  scheduleRowLast: { borderBottomWidth: 0 },
  dateBox: {
    width: 56,
    height: 60,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  dateBoxActive: { backgroundColor: colors.primary },
  dateDay: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  dateDayActive: { color: colors.onPrimary },
  dateNumber: { fontSize: 22, lineHeight: 28, fontWeight: "800", fontFamily: fonts.heading, color: colors.primary },
  scheduleCopy: { flex: 1, minWidth: 0 },
  scheduleTitle: { ...type.label, fontFamily: fonts.heading, color: colors.onSurface },
  scheduleSubtitle: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 3 },
  scheduleIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  waterButton: {
    minHeight: 62,
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    marginBottom: spacing.stackSm,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...shadow.lift,
  },
  waterButtonPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  waterButtonText: { ...type.bodyLg, fontFamily: fonts.heading, color: colors.onPrimary },
});
