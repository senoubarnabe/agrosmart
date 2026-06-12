import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Line, Path, Stop } from "react-native-svg";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Weather">, NativeStackScreenProps<RootStackParamList>>;
type IconName = keyof typeof MaterialIcons.glyphMap;

const hourlyForecast = [
  { label: "Maintenant", temp: "32°", icon: "wb-sunny" as IconName, active: true },
  { label: "15h00", temp: "34°", icon: "wb-sunny" as IconName },
  { label: "18h00", temp: "30°", icon: "wb-cloudy" as IconName },
  { label: "21h00", temp: "26°", icon: "nights-stay" as IconName },
  { label: "Demain", temp: "22°", icon: "thunderstorm" as IconName, accent: colors.secondary },
  { label: "09h00", temp: "19°", icon: "water-drop" as IconName, accent: colors.water },
];

export function WeatherScreen({ navigation }: Props) {
  const [selectedForecast, setSelectedForecast] = useState("Maintenant");

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.headerBand}>
        <AppHeader />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Météo & Anticipation 🌥️</Text>
        <Text style={styles.copy}>Analyse prédictive pour vos cultures en temps réel.</Text>

        <View style={styles.sectionHeader}>
          <Text numberOfLines={1} style={styles.sectionTitle}>Prévisions 48h</Text>
          <Pressable onPress={() => navigation.navigate("DetailedForecast")} hitSlop={10}>
            <Text numberOfLines={1} style={styles.seeAll}>VOIR TOUT</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forecastRow} style={styles.forecastScroller}>
          {hourlyForecast.map((item) => (
            <ForecastCard
              key={item.label}
              label={item.label}
              temp={item.temp}
              icon={item.icon}
              active={selectedForecast === item.label}
              accent={item.accent}
              onPress={() => setSelectedForecast(item.label)}
            />
          ))}
        </ScrollView>

        <Pressable onPress={() => navigation.navigate("Program")} style={styles.impactCard}>
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
              <Text numberOfLines={2} style={styles.recoText}>Arrosage préventif à 06h00 recommandé</Text>
            </View>
          </View>
          <View style={styles.impactGlow} />
        </Pressable>

        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View>
              <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={styles.graphTitle}>Humidité du sol</Text>
              <Text numberOfLines={1} style={styles.graphSub}>Dernières 24 heures</Text>
            </View>
            <View style={styles.graphScore}>
              <Text numberOfLines={1} style={styles.graphValue}>64%</Text>
              <Text numberOfLines={1} style={styles.graphStatus}>OPTIMAL</Text>
            </View>
          </View>
          <HumidityCurve />
        </View>

        <View style={styles.twoCols}>
          <Mini icon="air" label="Vent" value="14 km/h" />
          <Mini icon="eco" label="EVP" value="5.2 mm/j" />
        </View>
      </View>
    </Screen>
  );
}

function ForecastCard({
  label,
  temp,
  icon,
  active,
  accent,
  onPress,
}: {
  label: string;
  temp: string;
  icon: IconName;
  active: boolean;
  accent?: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.forecastCard, active && styles.forecastActive, pressed && styles.cardPressed]}>
      <Text numberOfLines={1} style={[styles.forecastLabel, active && styles.forecastLabelActive]}>
        {label}
      </Text>
      <MaterialIcons name={icon} size={34} color={active ? colors.surfaceContainerLowest : accent ?? colors.onSurfaceVariant} />
      <Text style={[styles.forecastTemp, active && styles.forecastTempActive]}>{temp}</Text>
    </Pressable>
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
    width: "100%",
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
  forecastScroller: {
    marginBottom: 34,
    marginHorizontal: -spacing.mobile,
  },
  forecastRow: {
    gap: spacing.gutter,
    paddingBottom: 8,
    paddingHorizontal: spacing.mobile,
  },
  forecastCard: {
    width: 96,
    minHeight: 104,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    ...shadow.card,
  },
  forecastActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    transform: [{ scale: 1.05 }],
  },
  cardPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
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
    minHeight: 130,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.secondaryContainer,
    padding: 18,
    marginBottom: 30,
    overflow: "hidden",
    ...shadow.card,
  },
  impactGlow: {
    position: "absolute",
    top: -34,
    right: -34,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  warningBox: {
    width: 48,
    height: 48,
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
    fontSize: 17,
    lineHeight: 24,
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
    paddingHorizontal: 10,
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
    minHeight: 328,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
    ...shadow.card,
  },
  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  graphTitle: {
    ...type.h2,
    fontSize: 20,
    lineHeight: 26,
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
    height: 188,
    marginTop: 30,
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
    gap: 12,
    marginTop: 22,
    marginBottom: 24,
  },
  mini: {
    flex: 1,
    minHeight: 132,
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
    backgroundColor: colors.surfaceContainerHighest,
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
