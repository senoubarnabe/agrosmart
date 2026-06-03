import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import type { IconName } from "../data/mockData";
import { colors, fonts, radius, shadow, type } from "../theme";

type Props = { label: string; value: string; icon: IconName; tone?: string };

export function DataCard({ label, value, icon, tone = colors.primary }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${tone}20` }]}>
        <MaterialIcons name={icon} size={26} color={tone} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    padding: 16,
    ...shadow.card,
  },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  label: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  value: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface, marginTop: 4 },
});
