import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import { forecast48h } from "../data/mockData";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Weather">, NativeStackScreenProps<RootStackParamList>>;

export function WeatherScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader />
      <Text style={styles.title}>Météo & Anticipation ⛅</Text>
      <Text style={styles.copy}>Analyse prédictive pour adapter l'arrosage avant les coups de chaleur.</Text>

      <View style={styles.forecastRow}>
        {forecast48h.map((item) => (
          <View key={item.label} style={styles.forecastCard}>
            <Text style={styles.forecastLabel}>{item.label}</Text>
            <MaterialIcons name={item.icon} size={27} color={item.icon === "thunderstorm" ? colors.water : colors.secondaryContainer} />
            <Text style={styles.forecastTemp}>{item.temp}</Text>
          </View>
        ))}
      </View>

      <View style={styles.impactCard}>
        <MaterialIcons name="warning" size={28} color={colors.onSecondaryContainer} />
        <View style={{ flex: 1 }}>
          <Text style={styles.impactLabel}>Impact sur l'irrigation</Text>
          <Text style={styles.impactTitle}>Demain: 38°C + Vent fort</Text>
          <View style={styles.recoChip}>
            <MaterialIcons name="water-drop" size={13} color={colors.primary} />
            <Text style={styles.recoText}>Arrosage préventif à 6h00 recommandé</Text>
          </View>
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate("DetailedForecast")} style={styles.graphCard}>
        <View style={styles.graphHeader}>
          <View>
            <Text style={styles.graphTitle}>Humidité du sol</Text>
            <Text style={styles.graphSub}>Dernières 24h</Text>
          </View>
          <Text style={styles.graphValue}>64%</Text>
        </View>
        <View style={styles.bars}>
          {[36, 48, 52, 68, 60, 76, 70, 82].map((height, index) => (
            <View key={index} style={[styles.bar, { height }]} />
          ))}
        </View>
      </Pressable>

      <View style={styles.twoCols}>
        <Mini icon="air" label="Vent" value="14 km/h" />
        <Mini icon="eco" label="Évaporation" value="5.2 mm/j" />
      </View>
    </Screen>
  );
}

function Mini({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.mini}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={styles.miniLabel}>{label}</Text>
      <Text style={styles.miniValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: spacing.stackMd },
  forecastRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  forecastCard: { flex: 1, borderRadius: radius.lg, backgroundColor: colors.surfaceContainerLowest, alignItems: "center", paddingVertical: 12, ...shadow.card },
  forecastLabel: { fontSize: 9, lineHeight: 12, fontWeight: "800", fontFamily: fonts.body, color: colors.outline, textTransform: "uppercase" },
  forecastTemp: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, marginTop: 4 },
  impactCard: { flexDirection: "row", gap: 12, borderRadius: radius.card, backgroundColor: colors.secondaryContainer, padding: 16, ...shadow.card },
  impactLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSecondaryContainer, textTransform: "uppercase" },
  impactTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSecondaryContainer, marginTop: 4 },
  recoChip: { flexDirection: "row", gap: 4, alignItems: "center", alignSelf: "flex-start", backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 },
  recoText: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary },
  graphCard: { marginTop: 16, borderRadius: radius.card, backgroundColor: colors.surfaceContainerLowest, padding: 18, ...shadow.card },
  graphHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  graphTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  graphSub: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase", marginTop: 2 },
  graphValue: { ...type.h1, fontFamily: fonts.heading, color: colors.primary },
  bars: { height: 104, flexDirection: "row", gap: 8, alignItems: "flex-end", marginTop: 18 },
  bar: { flex: 1, borderRadius: 8, backgroundColor: colors.primaryFixedDim },
  twoCols: { flexDirection: "row", gap: 12, marginTop: 16 },
  mini: { flex: 1, borderRadius: radius.card, backgroundColor: colors.surfaceContainerLowest, padding: 16, ...shadow.card },
  miniLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 8 },
  miniValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, marginTop: 2 },
});
