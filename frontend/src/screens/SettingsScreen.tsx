import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";

const rows = [
  ["person", "Profil agriculteur", "Koffi, Cotonou"],
  ["language", "Langue", "Français"],
  ["notifications", "Notifications", "Alertes critiques activées"],
  ["wifi", "Connexion", "Firebase/API IoT à brancher plus tard"],
] as const;

export function SettingsScreen() {
  const [soil, setSoil] = useState(42);
  const [tank, setTank] = useState(72);
  const [leak, setLeak] = useState(false);

  return (
    <Screen>
      <AppHeader />
      <Text style={styles.title}>Paramètres ⚙️</Text>
      <Text style={styles.copy}>Configurez votre application et simulez vos capteurs.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Application</Text>
        {rows.map(([icon, title, text]) => (
          <View key={title} style={styles.row}>
            <View style={styles.icon}><MaterialIcons name={icon} size={23} color={colors.primary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{title}</Text>
              <Text style={styles.rowText}>{text}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
          </View>
        ))}
      </View>

      <View style={styles.simCard}>
        <Text style={styles.simTitle}>Mode simulation IoT</Text>
        <Text style={styles.simCopy}>Ces contrôles imitent les valeurs envoyées par l'ESP32 pour tester les écrans.</Text>

        <SimulatorRow label="Humidité sol" value={`${soil}%`} left="Sec" right="Humide" onMinus={() => setSoil(Math.max(0, soil - 5))} onPlus={() => setSoil(Math.min(100, soil + 5))} />
        <SimulatorRow label="Niveau réservoir" value={`${tank}%`} left="Vide" right="Plein" onMinus={() => setTank(Math.max(0, tank - 5))} onPlus={() => setTank(Math.min(100, tank + 5))} />

        <Pressable onPress={() => setLeak((value) => !value)} style={[styles.leakToggle, leak && styles.leakActive]}>
          <MaterialIcons name={leak ? "warning" : "check-circle"} size={24} color={leak ? colors.onError : colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.leakTitle, leak && styles.leakTitleActive]}>{leak ? "Fuite simulée" : "Aucune fuite"}</Text>
            <Text style={[styles.leakText, leak && styles.leakTextActive]}>Appuyez pour tester l'alerte fuite d'eau.</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.resetCard}>
        <MaterialIcons name="restart-alt" size={26} color={colors.error} />
        <View style={{ flex: 1 }}>
          <Text style={styles.resetTitle}>Paramètres de simulation</Text>
          <Text style={styles.resetText}>Réinitialiser les valeurs mockées avant la démonstration.</Text>
        </View>
      </View>
    </Screen>
  );
}

function SimulatorRow({
  label,
  value,
  left,
  right,
  onMinus,
  onPlus,
}: {
  label: string;
  value: string;
  left: string;
  right: string;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <View style={styles.simRow}>
      <View style={styles.simRowTop}>
        <Text style={styles.simLabel}>{label}</Text>
        <Text style={styles.simValue}>{value}</Text>
      </View>
      <View style={styles.stepper}>
        <Pressable onPress={onMinus} style={styles.stepBtn}><MaterialIcons name="remove" size={20} color={colors.primary} /></Pressable>
        <View style={styles.stepTrack}><View style={styles.stepFill} /></View>
        <Pressable onPress={onPlus} style={styles.stepBtn}><MaterialIcons name="add" size={20} color={colors.primary} /></Pressable>
      </View>
      <View style={styles.stepLabels}><Text style={styles.stepText}>{left}</Text><Text style={styles.stepText}>{right}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: spacing.stackMd },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 12, ...shadow.card },
  sectionTitle: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, textTransform: "uppercase", padding: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: radius.lg },
  icon: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primaryFixed, alignItems: "center", justifyContent: "center" },
  rowTitle: { ...type.label, fontFamily: fonts.body, color: colors.onSurface },
  rowText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 2 },
  simCard: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, marginTop: 16, ...shadow.card },
  simTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.secondary },
  simCopy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 6, marginBottom: 16 },
  simRow: { marginBottom: 16 },
  simRowTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  simLabel: { ...type.label, fontFamily: fonts.body, color: colors.onSurface },
  simValue: { ...type.label, fontFamily: fonts.body, color: colors.primary },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryFixed, alignItems: "center", justifyContent: "center" },
  stepTrack: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surfaceContainerHigh, overflow: "hidden" },
  stepFill: { width: "58%", height: "100%", backgroundColor: colors.primaryFixedDim },
  stepLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  stepText: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
  leakToggle: { flexDirection: "row", gap: 12, alignItems: "center", borderRadius: radius.lg, backgroundColor: colors.primaryFixed, padding: 12 },
  leakActive: { backgroundColor: colors.error },
  leakTitle: { ...type.label, fontFamily: fonts.body, color: colors.primary },
  leakTitleActive: { color: colors.onError },
  leakText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryFixedVariant, marginTop: 2 },
  leakTextActive: { color: colors.onError },
  resetCard: { flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: colors.errorContainer, borderRadius: radius.card, padding: 16, marginTop: 16 },
  resetTitle: { ...type.label, fontFamily: fonts.body, color: colors.error },
  resetText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onErrorContainer, marginTop: 2 },
});
