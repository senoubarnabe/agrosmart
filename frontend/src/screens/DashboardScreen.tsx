import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Dashboard">, NativeStackScreenProps<RootStackParamList>>;
type MetricIcon = keyof typeof MaterialIcons.glyphMap;

const metrics: Array<{ label: string; value: string; suffix?: string; icon: MetricIcon; iconColor: string; iconBg: string }> = [
  { label: "Humidité Sol", value: "65%", icon: "water-drop", iconColor: "#0057ff", iconBg: "#d9e9ff" },
  { label: "Soleil", value: "Fort", icon: "wb-sunny", iconColor: "#f26a00", iconBg: "#fff0bd" },
  { label: "Température", value: "34°C", icon: "device-thermostat", iconColor: "#f0440a", iconBg: "#ffe7c7" },
  { label: "Vent", value: "18", suffix: "km/h", icon: "air", iconColor: "#0b3558", iconBg: "#eef4fb" },
];

export function DashboardScreen({ navigation }: Props) {
  const { firstName } = useOnboarding();
  const { width } = useWindowDimensions();
  const [pumpActive, setPumpActive] = useState(false);
  const compact = width < 720;
  const reservoirLevel = pumpActive ? 22 : 28;
  const autonomy = pumpActive ? "Prévu pour 1 jour d'autonomie" : "Prévu pour 2 jours d'autonomie";
  const displayName = firstName.trim() || "Koffi";

  return (
    <Screen contentStyle={styles.wrap}>
      <AppHeader />

      <View style={styles.greetingCard}>
        <Text style={styles.hello}>Bonjour, {displayName} 👋</Text>
        <Text style={styles.sub}>Voici l'état actuel de votre exploitation.</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusBadgeRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusLabel}>Statut global</Text>
        </View>
        <Text style={styles.statusTitle}>Votre champ est en bon état</Text>
        <View style={styles.statusChips}>
          <Text style={styles.okChip}>Système OK</Text>
          <Text style={styles.optimizedChip}>Optimisé</Text>
        </View>
      </View>

      <View style={styles.metricGrid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={[styles.metricCard, compact && styles.metricCardCompact]}>
            <View style={[styles.metricIcon, { backgroundColor: metric.iconBg }]}>
              <MaterialIcons name={metric.icon} size={27} color={metric.iconColor} />
            </View>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              {metric.suffix ? <Text style={styles.metricSuffix}>{metric.suffix}</Text> : null}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.bottomGrid, compact && styles.bottomGridCompact]}>
        <View style={[styles.block, compact && styles.blockCompact]}>
          <Text style={styles.sectionTitle}>Contrôle manuel</Text>
          <Pressable onPress={() => setPumpActive((value) => !value)} style={[styles.pumpCard, pumpActive && styles.pumpActive]}>
            <View style={[styles.pumpIcon, pumpActive && styles.pumpIconActive]}>
              <MaterialIcons name="settings-input-component" size={30} color={pumpActive ? colors.primary : colors.onSurfaceVariant} />
            </View>
            <View style={styles.pumpTextWrap}>
              <Text style={[styles.pumpTitle, pumpActive && styles.pumpTitleActive]}>Pompe: {pumpActive ? "ACTIVE" : "ARRÊTÉE"}</Text>
              <Text style={[styles.pumpCopy, pumpActive && styles.pumpCopyActive]}>{pumpActive ? "Arrosage en cours..." : "Appuyez pour démarrer/arrêter"}</Text>
            </View>
            <View style={[styles.pumpState, pumpActive && styles.pumpStateActive]}>
              <MaterialIcons name={pumpActive ? "check" : "close"} size={22} color={pumpActive ? colors.primary : colors.outline} />
            </View>
          </Pressable>
        </View>

        <View style={[styles.block, compact && styles.blockCompact]}>
          <Text style={styles.sectionTitle}>Niveau réservoir</Text>
          <Pressable onPress={() => navigation.navigate("Program")} style={styles.reservoirCard}>
            <View style={styles.gauge}>
              <View
                style={[
                  styles.gaugeArc,
                  {
                    borderTopColor: reservoirLevel <= 25 ? colors.primary : colors.primaryContainer,
                    borderRightColor: reservoirLevel <= 25 ? colors.primary : colors.primaryContainer,
                  },
                ]}
              />
              <Text style={styles.gaugeValue}>{reservoirLevel}%</Text>
            </View>
            <View style={styles.reservoirTextWrap}>
              <Text style={styles.reservoirTitle}>Disponible</Text>
              <Text style={styles.reservoirCopy}>{autonomy}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: 900, paddingHorizontal: spacing.mobile, paddingTop: 16 },
  greetingCard: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 860,
    backgroundColor: "rgba(255,255,255,0.62)",
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}44`,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 30,
  },
  hello: { ...type.h1, fontFamily: fonts.heading, color: colors.primary },
  sub: { ...type.body, fontFamily: fonts.body, color: colors.onSurface, marginTop: 2 },
  statusCard: {
    width: "100%",
    maxWidth: 860,
    alignSelf: "center",
    minHeight: 148,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: 26,
    paddingVertical: 24,
    marginBottom: 30,
    ...shadow.card,
  },
  statusBadgeRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  statusDot: { width: 15, height: 15, borderRadius: 8, backgroundColor: colors.primaryContainer },
  statusLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, textTransform: "uppercase", letterSpacing: 1.2 },
  statusTitle: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  statusChips: { flexDirection: "row", gap: 34, marginTop: 26 },
  okChip: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, textTransform: "uppercase" },
  optimizedChip: { ...type.labelSm, fontFamily: fonts.body, color: colors.secondary, textTransform: "uppercase" },
  metricGrid: { width: "100%", maxWidth: 860, alignSelf: "center", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 20, marginBottom: 28 },
  metricCard: {
    width: "48.6%",
    minHeight: 172,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    ...shadow.card,
  },
  metricCardCompact: { minHeight: 150, paddingHorizontal: 12 },
  metricIcon: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  metricLabel: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, textAlign: "center" },
  metricValueRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", marginTop: 2 },
  metricValue: { ...type.h1, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  metricSuffix: { ...type.labelSm, fontFamily: fonts.body, color: colors.outlineVariant, marginBottom: 7, marginLeft: 2 },
  bottomGrid: { width: "100%", maxWidth: 860, alignSelf: "center", flexDirection: "row", gap: 28, marginBottom: 24 },
  bottomGridCompact: { flexDirection: "column", gap: 24 },
  block: { flex: 1, minWidth: 0 },
  blockCompact: { width: "100%", flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
  sectionTitle: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, textTransform: "uppercase", letterSpacing: 1.6, marginBottom: 10, paddingLeft: 2 },
  pumpCard: {
    width: "100%",
    minHeight: 112,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}77`,
    backgroundColor: colors.surfaceContainerLow,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    ...shadow.card,
  },
  pumpActive: { backgroundColor: colors.primaryContainer, borderColor: colors.primaryContainer },
  pumpIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surfaceContainerHighest, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pumpIconActive: { backgroundColor: colors.primaryFixed },
  pumpTextWrap: { flex: 1, minWidth: 0 },
  pumpTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, textTransform: "uppercase" },
  pumpTitleActive: { color: colors.onPrimary },
  pumpCopy: { ...type.body, fontFamily: fonts.body, color: colors.onSurface, marginTop: 2 },
  pumpCopyActive: { color: colors.onPrimary },
  pumpState: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surfaceContainerHighest, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pumpStateActive: { backgroundColor: colors.surfaceContainerLowest },
  reservoirCard: {
    width: "100%",
    minHeight: 112,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    ...shadow.card,
  },
  gauge: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", borderWidth: 8, borderColor: colors.surfaceContainerHighest, position: "relative", flexShrink: 0 },
  gaugeArc: { position: "absolute", width: 90, height: 90, borderRadius: 45, borderWidth: 8, borderLeftColor: "transparent", borderBottomColor: "transparent", transform: [{ rotate: "-24deg" }] },
  gaugeValue: { ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  reservoirTextWrap: { flex: 1, minWidth: 0 },
  reservoirTitle: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  reservoirCopy: { ...type.body, fontFamily: fonts.body, color: colors.onSurface, marginTop: 2 },
});
