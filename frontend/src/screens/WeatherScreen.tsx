import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Line, Path, Stop } from "react-native-svg";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Weather">, NativeStackScreenProps<RootStackParamList>>;
type IconName = keyof typeof MaterialIcons.glyphMap;

const hourlyForecast = [
  { label: "Maintenant", temp: "32°", active: true },
  { label: "15h00", temp: "34°" },
  { label: "18h00", temp: "30°" },
  { label: "21h00", temp: "26°" },
];

export function WeatherScreen({ navigation }: Props) {
  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.headerBand}>
        <AppHeader title="Météo & Anticipation" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Météo & Anticipation 🌥️</Text>
        <Text style={styles.copy}>Analyse prédictive pour vos cultures en temps réel.</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prévisions 48h</Text>
          <Pressable onPress={() => navigation.navigate("DetailedForecast")} hitSlop={10}>
            <Text style={styles.seeAll}>VOIR TOUT</Text>
          </Pressable>
        </View>

        <View style={styles.forecastRow}>
          {hourlyForecast.map((item) => (
            <ForecastCard key={item.label} label={item.label} temp={item.temp} active={Boolean(item.active)} />
          ))}
        </View>

        <View style={styles.impactCard}>
          <View style={styles.warningBox}>
            <MaterialIcons name="warning-amber" size={30} color={colors.surfaceContainerLowest} />
          </View>
          <View style={styles.impactTextBox}>
            <Text style={styles.impactLabel}>ANALYSE D'IMPACT</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.74} style={styles.impactTitle}>
              ⚠️ Demain: 38°C + Vent fort
            </Text>
            <View style={styles.recoChip}>
              <MaterialIcons name="water-drop" size={14} color={colors.surfaceContainerLowest} />
              <Text style={styles.recoText}>Arrosage préventif à 06h00 recommandé</Text>
            </View>
          </View>
        </View>

        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View>
              <Text style={styles.graphTitle}>Humidité du sol</Text>
              <Text style={styles.graphSub}>Dernières 24 heures</Text>
            </View>
            <View style={styles.graphScore}>
              <Text style={styles.graphValue}>64%</Text>
              <Text style={styles.graphStatus}>OPTIMAL</Text>
            </View>
          </View>
          <HumidityCurve />
        </View>

        <View style={styles.twoCols}>
          <Mini icon="air" label="VITESSE DU VENT" value="14 km/h" />
          <Mini icon="eco" label="EVAPOTRANSPIRATION" value="5.2 mm/j" />
        </View>
      </View>
    </Screen>
  );
}

function ForecastCard({ label, temp, active }: { label: string; temp: string; active: boolean }) {
  return (
    <View style={[styles.forecastCard, active && styles.forecastActive]}>
      <Text numberOfLines={1} style={[styles.forecastLabel, active && styles.forecastLabelActive]}>
        {label}
      </Text>
      <MaterialIcons name="wb-sunny" size={34} color={active ? colors.surfaceContainerLowest : colors.outline} />
      <Text style={[styles.forecastTemp, active && styles.forecastTempActive]}>{temp}</Text>
    </View>
  );
}

function HumidityCurve() {
  return (
    <View style={styles.chartWrap}>
      <Svg width="100%" height={176} viewBox="0 0 520 176" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="humidityFill" x1="0" y1="48" x2="0" y2="150" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.16" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        {[34, 82, 130].map((y) => (
          <Line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(0, 69, 13, 0.11)" strokeWidth="1" strokeDasharray="6 7" />
        ))}
        <Path
          d="M0 130 C52 106 116 102 164 108 C226 116 282 84 318 54 C356 24 421 54 442 94 C462 132 504 118 520 36 L520 158 L0 158 Z"
          fill="url(#humidityFill)"
        />
        <Path
          d="M0 130 C52 106 116 102 164 108 C226 116 282 84 318 54 C356 24 421 54 442 94 C462 132 504 118 520 36"
          fill="none"
          stroke={colors.primary}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <View style={styles.axisLabels}>
        <Text style={styles.axisText}>12:00</Text>
        <Text style={styles.axisText}>18:00</Text>
        <Text style={styles.axisText}>00:00</Text>
        <Text style={styles.axisText}>06:00</Text>
        <Text style={[styles.axisText, styles.axisNow]}>Maintenant</Text>
      </View>
    </View>
  );
}

function Mini({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={styles.mini}>
      <View style={styles.miniIcon}>
        <MaterialIcons name={icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.miniLabel}>{label}</Text>
      <Text style={styles.miniValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerBand: {
    paddingHorizontal: spacing.mobile,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 69, 13, 0.08)",
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.mobile,
    paddingTop: 20,
  },
  title: {
    ...type.h1Mobile,
    fontSize: 29,
    lineHeight: 36,
    fontFamily: fonts.heading,
    color: colors.onSurface,
  },
  copy: {
    ...type.body,
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    ...type.h2,
    fontFamily: fonts.heading,
    color: colors.onSurface,
  },
  seeAll: {
    ...type.label,
    letterSpacing: 0.8,
    fontFamily: fonts.body,
    color: colors.primary,
  },
  forecastRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 34,
  },
  forecastCard: {
    flex: 1,
    minHeight: 148,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 69, 13, 0.06)",
    ...shadow.card,
  },
  forecastActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  forecastLabel: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
  },
  forecastLabelActive: {
    fontWeight: "800",
    color: colors.surfaceContainerLowest,
  },
  forecastTemp: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    fontFamily: fonts.heading,
    color: colors.onSurfaceVariant,
  },
  forecastTempActive: {
    color: colors.surfaceContainerLowest,
  },
  impactCard: {
    minHeight: 146,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.secondaryContainer,
    padding: 22,
    marginBottom: 30,
    ...shadow.card,
  },
  warningBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  impactTextBox: {
    flex: 1,
    minWidth: 0,
  },
  impactLabel: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
    fontFamily: fonts.body,
    color: colors.surfaceContainerLowest,
  },
  impactTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    fontFamily: fonts.heading,
    color: colors.surfaceContainerLowest,
    marginTop: 8,
  },
  recoChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radius.full,
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 10,
    maxWidth: "100%",
  },
  recoText: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    fontFamily: fonts.body,
    color: colors.surfaceContainerLowest,
  },
  graphCard: {
    minHeight: 360,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 26,
    paddingTop: 28,
    paddingBottom: 18,
    ...shadow.card,
  },
  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  graphTitle: {
    ...type.h2,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fonts.heading,
    color: colors.onSurface,
  },
  graphSub: {
    ...type.label,
    fontFamily: fonts.body,
    fontWeight: "500",
    color: colors.outline,
    marginTop: 2,
  },
  graphScore: {
    alignItems: "flex-end",
  },
  graphValue: {
    ...type.h1,
    fontFamily: fonts.heading,
    color: colors.primary,
  },
  graphStatus: {
    ...type.labelSm,
    fontFamily: fonts.body,
    color: colors.primary,
    marginTop: 2,
  },
  chartWrap: {
    height: 210,
    marginTop: 38,
    overflow: "hidden",
  },
  axisLabels: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  axisText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.outline,
  },
  axisNow: {
    color: colors.primary,
    fontWeight: "800",
  },
  twoCols: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
    marginBottom: 24,
  },
  mini: {
    flex: 1,
    minHeight: 154,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(0, 69, 13, 0.07)",
    backgroundColor: colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  miniIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    ...shadow.card,
  },
  miniLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    fontFamily: fonts.body,
    color: colors.outline,
    textAlign: "center",
  },
  miniValue: {
    ...type.h2,
    fontFamily: fonts.heading,
    color: colors.onSurface,
    marginTop: 6,
    textAlign: "center",
  },
});
