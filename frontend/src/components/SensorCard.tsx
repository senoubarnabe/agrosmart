import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import type { IconName } from "../data/mockData";
import { colors, fonts, radius, shadow, type } from "../theme";

type Props = { label: string; value: string; icon: IconName; ok: boolean };

export function SensorCard({ label, value, icon, ok }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: ok ? colors.primaryFixed : colors.secondaryFixed }]}>
        <MaterialIcons name={icon} size={28} color={ok ? colors.primary : colors.secondary} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.status}>
        <View style={[styles.dot, { backgroundColor: ok ? colors.primary : colors.secondaryContainer }]} />
        <Text style={[styles.value, { color: ok ? colors.primary : colors.secondary }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    ...shadow.card,
  },
  icon: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  label: { ...type.label, fontFamily: fonts.body, color: colors.onSurface },
  status: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  value: { ...type.labelSm, fontFamily: fonts.body },
});
