import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "DetailedForecast">;
type IconName = keyof typeof MaterialIcons.glyphMap;

const details = [
  { icon: "water-drop" as IconName, label: "HUMIDITÉ", value: "64%", tone: "#eaf2ff", iconColor: "#1d4ed8" },
  { icon: "compress" as IconName, label: "PRESSION", value: "1012 hPa", tone: "#fff4e7", iconColor: colors.secondary },
  { icon: "wb-sunny" as IconName, label: "LEVER DE SOLEIL", value: "06:42", tone: "#fff8dd", iconColor: colors.secondary },
  { icon: "brightness-3" as IconName, label: "COUCHER DE SOLEIL", value: "19:15", tone: "#f6edff", iconColor: "#7e22ce" },
];

const week = [
  { day: "DEMAIN", icon: "wb-sunny" as IconName, rain: "0%", high: "33°", low: "24°" },
  { day: "MER. 24", icon: "wb-sunny" as IconName, rain: "15%", high: "31°", low: "23°" },
  { day: "JEU. 25", icon: "water-drop" as IconName, rain: "85%", high: "28°", low: "22°" },
  { day: "VEN. 26", icon: "wb-sunny" as IconName, rain: "40%", high: "30°", low: "23°" },
  { day: "SAM. 27", icon: "wb-sunny" as IconName, rain: "5%", high: "34°", low: "25°" },
  { day: "DIM. 28", icon: "wb-sunny" as IconName, rain: "0%", high: "35°", low: "26°" },
  { day: "LUN. 29", icon: "water-drop" as IconName, rain: "20%", high: "32°", low: "24°" },
];

export function DetailedForecastScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.headerBand}>
            <AppHeader title="Prévisions Détaillées" back onBack={() => navigation.goBack()} />
          </View>

          <View style={styles.content}>
            <View style={styles.hero}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroPlace}>AUJOURD'HUI, ABOMEY-CALAVI</Text>
                <View style={styles.heroTempRow}>
                  <Text style={styles.temp}>32°</Text>
                  <View>
                    <Text style={styles.sun}>Ensoleillé</Text>
                    <Text style={styles.feels}>Ressenti 35°</Text>
                  </View>
                </View>
                <View style={styles.heroChips}>
                  <WeatherChip icon="water-drop" text="12% Pluie" />
                  <WeatherChip icon="air" text="18 km/h" />
                </View>
              </View>
              <MaterialIcons name="wb-sunny" size={160} color="rgba(255,255,255,0.08)" style={styles.sunWatermark} />
            </View>

            <View style={styles.uvCard}>
              <MaterialIcons name="wb-sunny" size={54} color={colors.surfaceContainerLowest} />
              <Text style={styles.uvLabel}>INDICE UV</Text>
              <Text style={styles.uvValue}>8 - Élevé</Text>
              <View style={styles.uvPill}>
                <Text style={styles.uvPillText}>PROTECTION REQUISE</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Détails du jour</Text>
            <View style={styles.detailGrid}>
              {details.map((item) => (
                <View key={item.label} style={styles.detailCard}>
                  <View style={[styles.detailIcon, { backgroundColor: item.tone }]}>
                    <MaterialIcons name={item.icon} size={18} color={item.iconColor} />
                  </View>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.weekHeader}>
              <Text style={styles.sectionTitle}>Météo sur 7 jours</Text>
              <Text style={styles.updated}>Mise à jour 14:00</Text>
            </View>
            <View style={styles.weekList}>
              {week.map((day) => (
                <View key={day.day} style={styles.dayRow}>
                  <Text style={styles.dayName}>{day.day}</Text>
                  <View style={styles.dayWeather}>
                    <MaterialIcons name={day.icon} size={24} color={colors.secondary} />
                    <Text style={styles.dayRain}>{day.rain}</Text>
                  </View>
                  <View style={styles.dayTemps}>
                    <Text style={styles.high}>{day.high}</Text>
                    <Text style={styles.low}>{day.low}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.advice}>
              <View style={styles.adviceIcon}>
                <MaterialIcons name="memory" size={34} color={colors.onPrimary} />
              </View>
              <Text style={styles.adviceTitle}>Conseil d'irrigation spécial</Text>
              <Text style={styles.adviceText}>Prévoyez d'augmenter l'irrigation samedi en raison des pics de température (35°C).</Text>
              <Pressable onPress={() => navigation.navigate("Program")} style={styles.programButton}>
                <Text style={styles.programText}>PROGRAMMER L'ARROSAGE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <ForecastBottomBar navigation={navigation} />
    </SafeAreaView>
  );
}

function WeatherChip({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View style={styles.chip}>
      <MaterialIcons name={icon} size={18} color={colors.surfaceContainerLowest} />
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );
}

function ForecastBottomBar({ navigation }: { navigation: Props["navigation"] }) {
  return (
    <View style={styles.bottomBar}>
      <TabButton icon="home" label="Accueil" onPress={() => navigation.navigate("MainTabs", { screen: "Dashboard" })} />
      <TabButton icon="eco" label="Cultures" onPress={() => navigation.navigate("MainTabs", { screen: "Crops" })} />
      <TabButton active icon="wb-sunny" label="Météo" onPress={() => navigation.goBack()} />
      <TabButton icon="notifications" label="Alertes" badge onPress={() => navigation.navigate("MainTabs", { screen: "Alerts" })} />
      <TabButton icon="settings" label="Paramètres" onPress={() => navigation.navigate("MainTabs", { screen: "Settings" })} />
    </View>
  );
}

function TabButton({
  icon,
  label,
  active,
  badge,
  onPress,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  badge?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tabItem, active && styles.tabActive]}>
      <View>
        <MaterialIcons name={icon} size={24} color={active ? colors.onSecondaryContainer : colors.onSurfaceVariant} />
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        )}
      </View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 124,
  },
  inner: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
  headerBand: {
    paddingHorizontal: spacing.mobile,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 69, 13, 0.08)",
  },
  content: {
    paddingHorizontal: spacing.mobile,
    paddingTop: 20,
  },
  hero: {
    minHeight: 250,
    borderRadius: 28,
    backgroundColor: colors.primary,
    overflow: "hidden",
    padding: 30,
    marginBottom: 30,
    ...shadow.lift,
  },
  heroCopy: {
    flex: 1,
    zIndex: 2,
  },
  heroPlace: {
    ...type.label,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.body,
    color: "rgba(255,255,255,0.78)",
  },
  heroTempRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginTop: 12,
  },
  temp: {
    fontSize: 62,
    lineHeight: 68,
    fontWeight: "900",
    fontFamily: fonts.heading,
    color: colors.onPrimary,
  },
  sun: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    fontFamily: fonts.heading,
    color: colors.onPrimary,
    marginTop: 4,
  },
  feels: {
    ...type.body,
    fontFamily: fonts.body,
    color: "rgba(255,255,255,0.82)",
  },
  heroChips: {
    flexDirection: "row",
    gap: 12,
    marginTop: 60,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.24)",
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipText: {
    ...type.label,
    fontFamily: fonts.body,
    color: colors.onPrimary,
  },
  sunWatermark: {
    position: "absolute",
    right: -18,
    bottom: -20,
  },
  uvCard: {
    minHeight: 220,
    borderRadius: radius.xl,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    ...shadow.card,
  },
  uvLabel: {
    ...type.label,
    letterSpacing: 0.6,
    fontFamily: fonts.body,
    color: colors.onPrimary,
    marginTop: 10,
  },
  uvValue: {
    ...type.h1,
    fontFamily: fonts.heading,
    color: colors.onPrimary,
    marginTop: 10,
  },
  uvPill: {
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 12,
  },
  uvPillText: {
    ...type.labelSm,
    fontFamily: fonts.body,
    color: colors.onPrimary,
  },
  sectionTitle: {
    ...type.h2,
    fontFamily: fonts.heading,
    color: colors.primary,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
    marginBottom: 30,
  },
  detailCard: {
    width: "47.8%",
    minHeight: 148,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,69,13,0.06)",
    ...shadow.card,
  },
  detailIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    ...type.h2,
    fontFamily: fonts.heading,
    color: colors.primary,
    marginTop: 10,
  },
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  updated: {
    ...type.labelSm,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
  },
  weekList: {
    gap: 10,
  },
  dayRow: {
    minHeight: 84,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    ...shadow.card,
  },
  dayName: {
    ...type.body,
    fontWeight: "800",
    fontFamily: fonts.body,
    color: colors.onSurface,
    width: 86,
  },
  dayWeather: {
    alignItems: "center",
    width: 70,
  },
  dayRain: {
    ...type.labelSm,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.outline,
  },
  dayTemps: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 14,
    minWidth: 68,
  },
  high: {
    ...type.body,
    fontWeight: "900",
    fontFamily: fonts.heading,
    color: colors.primary,
  },
  low: {
    ...type.label,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.outline,
  },
  advice: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.primary,
    backgroundColor: "rgba(42, 107, 44, 0.12)",
    alignItems: "center",
    padding: 26,
    marginTop: 28,
  },
  adviceIcon: {
    width: 70,
    height: 70,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    ...shadow.lift,
  },
  adviceTitle: {
    ...type.h2,
    fontFamily: fonts.heading,
    color: colors.primary,
    textAlign: "center",
  },
  adviceText: {
    ...type.body,
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: 10,
  },
  programButton: {
    height: 60,
    alignSelf: "stretch",
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  programText: {
    ...type.label,
    letterSpacing: 0.5,
    fontFamily: fonts.body,
    color: colors.onPrimary,
  },
  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    maxWidth: 1280,
    alignSelf: "center",
    height: 76,
    borderRadius: 28,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    ...shadow.lift,
  },
  tabItem: {
    minWidth: 58,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    paddingHorizontal: 8,
  },
  tabActive: {
    backgroundColor: colors.secondaryFixed,
    paddingHorizontal: 14,
  },
  tabLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.secondary,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -9,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    fontFamily: fonts.body,
    color: colors.onError,
  },
});
