import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { DataCard } from "../components/DataCard";
import { ProgressGauge } from "../components/ProgressGauge";
import { Screen } from "../components/Screen";
import { dashboardMetrics, wateringHistory } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Dashboard">, NativeStackScreenProps<RootStackParamList>>;

export function DashboardScreen({ navigation }: Props) {
  const [pumpActive, setPumpActive] = useState(true);
  const isHealthy = pumpActive;

  return (
    <Screen>
      <AppHeader />
      <View style={styles.heroHeader}>
        <View>
          <Text style={styles.hello}>Bonjour, Koffi 👋</Text>
          <Text style={styles.sub}>Votre champ maraîcher est surveillé en temps réel.</Text>
        </View>
      </View>

      <View style={[styles.statusCard, !isHealthy && styles.statusWarning]}>
        <Text style={styles.statusLabel}>État global</Text>
        <Text style={styles.statusTitle}>{isHealthy ? "Votre champ est en bon état" : "Surveillance requise"}</Text>
        <Text style={styles.statusText}>
          {isHealthy ? "Humidité stable et irrigation optimisée." : "La pompe est arrêtée, vérifiez les besoins hydriques."}
        </Text>
        <MaterialIcons name="eco" size={110} color="rgba(0,69,13,0.10)" style={styles.statusIcon} />
        <View style={styles.chips}>
          <Text style={styles.chip}>Système OK</Text>
          <Text style={styles.chipAmber}>Optimisé</Text>
        </View>
      </View>

      <View style={styles.metricGrid}>{dashboardMetrics.map((metric) => <DataCard key={metric.label} {...metric} />)}</View>

      <Text style={styles.sectionTitle}>Contrôle irrigation</Text>
      <Pressable onPress={() => setPumpActive((value) => !value)} style={[styles.pumpCard, !pumpActive && styles.pumpOff]}>
        <View style={styles.pumpIcon}>
          <MaterialIcons name="water" size={32} color={colors.onPrimary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.pumpTitle}>{pumpActive ? "Pompe: ACTIVE" : "Pompe: ARRÊTÉE"}</Text>
          <Text style={styles.pumpText}>{pumpActive ? "Arrosage en cours..." : "Appuyez pour démarrer"}</Text>
        </View>
        <MaterialIcons name={pumpActive ? "toggle-on" : "toggle-off"} size={42} color={pumpActive ? colors.secondaryContainer : colors.surfaceDim} />
      </Pressable>

      <View style={styles.reservoir}>
        <ProgressGauge value={72} label="Réservoir" />
        <View style={{ flex: 1 }}>
          <Text style={styles.resTitle}>Autonomie eau</Text>
          <Text style={styles.resCopy}>Prévu pour 4 jours. Aucune fuite détectée sur le réseau.</Text>
          <Pressable onPress={() => navigation.navigate("Program")} style={styles.programLink}>
            <Text style={styles.programText}>Voir le programme</Text>
            <MaterialIcons name="arrow-forward" size={18} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Historique récent</Text>
      {wateringHistory.slice(0, 2).map((item) => (
        <View key={item.time} style={styles.historyRow}>
          <View style={styles.historyIcon}><MaterialIcons name="check-circle" size={22} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.historyTitle}>{item.crop} • {item.volume}</Text>
            <Text style={styles.historyText}>{item.time} • {item.duration} • {item.type}</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.stackMd },
  hello: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary },
  sub: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  statusCard: { borderRadius: radius.card, backgroundColor: colors.primaryFixed, padding: 18, marginBottom: 16, overflow: "hidden", ...shadow.card },
  statusWarning: { backgroundColor: colors.errorContainer },
  statusLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryFixedVariant, textTransform: "uppercase" },
  statusTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimaryFixed, marginTop: 8 },
  statusText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryFixedVariant, marginTop: 6, width: "78%" },
  statusIcon: { position: "absolute", right: -22, bottom: -24 },
  chips: { flexDirection: "row", gap: 8, marginTop: 16 },
  chip: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryFixed, backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6, overflow: "hidden" },
  chipAmber: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSecondaryContainer, backgroundColor: colors.secondaryContainer, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6, overflow: "hidden" },
  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  sectionTitle: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase", marginTop: 20, marginBottom: 10, paddingLeft: 4 },
  pumpCard: { borderRadius: radius.card, padding: 16, backgroundColor: colors.primary, flexDirection: "row", alignItems: "center", gap: 12, ...shadow.lift },
  pumpOff: { backgroundColor: colors.inverseSurface },
  pumpIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  pumpTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimary },
  pumpText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer, marginTop: 2 },
  reservoir: { flexDirection: "row", gap: 18, alignItems: "center", backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, ...shadow.card },
  resTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  resCopy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  programLink: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  programText: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary },
  historyRow: { flexDirection: "row", alignItems: "center", gap: 12, borderRadius: radius.lg, backgroundColor: colors.surfaceContainerLowest, padding: 12, marginBottom: 10, ...shadow.card },
  historyIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryFixed },
  historyTitle: { ...type.label, fontFamily: fonts.body, color: colors.onSurface },
  historyText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 2 },
});
