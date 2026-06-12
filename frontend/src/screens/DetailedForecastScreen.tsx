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
  { icon: "water-drop" as IconName, label: "Humidité", value: "64%", tone: "#dbeafe", iconColor: "#1d4ed8" },
  { icon: "compress" as IconName, label: "Pression", value: "1012 hPa", tone: "#ffedd5", iconColor: colors.secondary },
  { icon: "wb-twilight" as IconName, label: "Lever du soleil", value: "06:42", tone: "#fef3c7", iconColor: colors.secondary },
  { icon: "bedtime" as IconName, label: "Coucher du soleil", value: "19:15", tone: "#f3e8ff", iconColor: "#7e22ce" },
];

const week = [
  { day: "Demain", icon: "wb-sunny" as IconName, rain: "0%", high: "33°", low: "24°", color: colors.secondaryContainer, bold: true },
  { day: "Mer. 24", icon: "cloud" as IconName, rain: "15%", high: "31°", low: "23°", color: colors.outline },
  { day: "Jeu. 25", icon: "grain" as IconName, rain: "85%", high: "28°", low: "22°", color: colors.water, rainColor: colors.water },
  { day: "Ven. 26", icon: "wb-cloudy" as IconName, rain: "40%", high: "30°", low: "23°", color: colors.water },
  { day: "Sam. 27", icon: "wb-sunny" as IconName, rain: "5%", high: "34°", low: "25°", color: colors.secondaryContainer },
  { day: "Dim. 28", icon: "wb-sunny" as IconName, rain: "0%", high: "35°", low: "26°", color: colors.secondaryContainer },
  { day: "Lun. 29", icon: "cloud" as IconName, rain: "20%", high: "32°", low: "24°", color: colors.outline },
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
                <Text style={styles.heroPlace}>Aujourd'hui, Dakar</Text>
                <View style={styles.heroTempRow}>
                  <Text style={styles.temp}>32°</Text>
                  <View style={styles.sunTextWrap}>
                    <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.76} style={styles.sun}>Ensoleillé</Text>
                    <Text numberOfLines={1} style={styles.feels}>Ressenti 35°</Text>
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

            <View style={styles.titleRow}>
              <MaterialIcons name="insights" size={23} color={colors.primary} />
              <Text numberOfLines={1} style={styles.sectionTitle}>Détails du jour</Text>
            </View>
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
              <View style={styles.titleRow}>
                <MaterialIcons name="calendar-month" size={23} color={colors.primary} />
              <Text numberOfLines={2} style={styles.sectionTitle}>Prévisions sur 7 jours</Text>
              </View>
              <Text numberOfLines={2} style={styles.updated}>Prochaine mise à jour: 14:00</Text>
            </View>
            <View style={styles.weekList}>
              {week.map((day) => (
                <View key={day.day} style={styles.dayRow}>
                  <Text numberOfLines={1} style={styles.dayName}>{day.day}</Text>
                  <View style={styles.dayWeather}>
                    <MaterialIcons name={day.icon} size={28} color={day.color} />
                    <Text style={[styles.dayRain, day.rainColor && { color: day.rainColor, fontWeight: "800" }]}>{day.rain}</Text>
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
                <MaterialIcons name="agriculture" size={34} color={colors.onPrimary} />
              </View>
              <Text style={styles.adviceTitle}>Conseil d'irrigation</Text>
              <Text style={styles.adviceText}>Prévoyez d'augmenter l'irrigation samedi en raison des pics de température (35°C).</Text>
              <Pressable onPress={() => navigation.navigate("Program")} style={styles.programButton}>
                <Text style={styles.programText}>Programmer l'arrosage</Text>
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
    minHeight: 220,
    borderRadius: 30,
    backgroundColor: colors.primary,
    overflow: "hidden",
    padding: 22,
    marginBottom: 22,
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
    gap: 12,
    marginTop: 12,
  },
  sunTextWrap: { flex: 1, minWidth: 0 },
  temp: {
    fontSize: 56,
    lineHeight: 62,
    fontWeight: "900",
    fontFamily: fonts.heading,
    color: colors.onPrimary,
  },
  sun: {
    fontSize: 22,
    lineHeight: 29,
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
    flexWrap: "wrap",
    gap: 10,
    marginTop: 42,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.24)",
    paddingHorizontal: 12,
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
    minHeight: 188,
    borderRadius: radius.xl,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
    marginBottom: 30,
  },
  detailCard: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 136,
    minHeight: 136,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
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
    fontWeight: "600",
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
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 4,
  },
  updated: {
    ...type.labelSm,
    fontWeight: "500",
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
    textAlign: "left",
    flexShrink: 1,
  },
  weekList: {
    gap: 10,
  },
  dayRow: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    ...shadow.card,
  },
  dayName: {
    ...type.body,
    fontWeight: "700",
    fontFamily: fonts.body,
    color: colors.onSurface,
    width: 72,
  },
  dayWeather: {
    alignItems: "center",
    width: 58,
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
    gap: 8,
    minWidth: 60,
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
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.primary,
    backgroundColor: "rgba(42, 107, 44, 0.12)",
    alignItems: "center",
    padding: 22,
    marginTop: 28,
    gap: 4,
  },
  adviceIcon: {
    width: 62,
    height: 62,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
    fontSize: 14,
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
