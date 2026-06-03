import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radius, shadow, type } from "../theme";

type Props = {
  culture: {
    name: string;
    stage: string;
    health: string;
    progress: number;
    week: string;
    next: string;
    humidity: string;
    image: string;
    alert: boolean;
  };
};

export function CultureCard({ culture }: Props) {
  const tone = culture.alert ? colors.secondaryContainer : colors.primary;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image source={{ uri: culture.image }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{culture.name}</Text>
            <Text style={[styles.badge, culture.alert ? styles.badgeMuted : styles.badgeWarm]}>{culture.stage}</Text>
          </View>
          <View style={styles.healthRow}>
            <View style={[styles.dot, { backgroundColor: tone }]} />
            <Text style={[styles.health, { color: tone }]}>{culture.health}</Text>
          </View>
          <Text style={styles.week}>Croissance : {culture.week}</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${culture.progress}%` }]} />
          </View>
          <Text style={styles.percent}>{culture.progress}%</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.stat}>
          <MaterialIcons name="water-drop" size={21} color={colors.secondary} />
          <View>
            <Text style={styles.statLabel}>Prochain arrosage</Text>
            <Text style={styles.statValue}>{culture.next}</Text>
          </View>
        </View>
        <View style={styles.stat}>
          <MaterialIcons name="device-thermostat" size={21} color={colors.primary} />
          <View>
            <Text style={styles.statLabel}>Humidité sol</Text>
            <Text style={styles.statValue}>{culture.humidity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    marginBottom: 16,
    ...shadow.card,
  },
  top: { flexDirection: "row", gap: 14 },
  image: { width: 96, height: 96, borderRadius: radius.lg },
  info: { flex: 1 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", gap: 8, alignItems: "flex-start" },
  name: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, flex: 1 },
  badge: { ...type.labelSm, fontFamily: fonts.body, borderRadius: radius.md, paddingHorizontal: 8, paddingVertical: 4, overflow: "hidden" },
  badgeWarm: { backgroundColor: colors.tertiaryFixed, color: colors.onTertiaryFixed },
  badgeMuted: { backgroundColor: colors.surfaceContainerHigh, color: colors.onSurfaceVariant },
  healthRow: { flexDirection: "row", gap: 6, alignItems: "center", marginTop: 6 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  health: { ...type.labelSm, fontFamily: fonts.body },
  week: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 12 },
  progressBg: { height: 10, borderRadius: 5, backgroundColor: colors.surfaceContainer, overflow: "hidden", marginTop: 5 },
  progressFill: { height: "100%", borderRadius: 5, backgroundColor: colors.primaryFixedDim },
  percent: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurface, alignSelf: "flex-end", marginTop: 2 },
  bottom: { flexDirection: "row", borderTopWidth: 1, borderTopColor: `${colors.outlineVariant}55`, marginTop: 16, paddingTop: 14, gap: 10 },
  stat: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  statLabel: { fontSize: 10, lineHeight: 13, fontWeight: "700", color: colors.onSurfaceVariant, textTransform: "uppercase", fontFamily: fonts.body },
  statValue: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurface },
});
