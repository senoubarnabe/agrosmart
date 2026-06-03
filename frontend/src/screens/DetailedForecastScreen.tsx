import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { forecastDays } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "DetailedForecast">;

export function DetailedForecastScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Prévisions" back onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Prévisions Détaillées</Text>
      <View style={styles.hero}>
        <View>
          <Text style={styles.place}>Aujourd'hui, Parakou</Text>
          <Text style={styles.temp}>32°</Text>
          <Text style={styles.sun}>Ensoleillé • Ressenti 35°</Text>
        </View>
        <MaterialIcons name="wb-sunny" size={72} color={colors.secondaryContainer} />
      </View>
      <View style={styles.grid}>
        <Mini icon="water-drop" label="Humidité" value="64%" />
        <Mini icon="speed" label="Pression" value="1012 hPa" />
        <Mini icon="wb-twilight" label="Lever" value="06:35" />
        <Mini icon="nights-stay" label="Coucher" value="18:58" />
      </View>
      <View style={styles.days}>
        {forecastDays.map((day) => (
          <View key={day.day} style={styles.day}>
            <Text style={styles.dayName}>{day.day}</Text>
            <MaterialIcons name={day.rain > 30 ? "thunderstorm" : "wb-sunny"} size={24} color={day.rain > 30 ? colors.water : colors.secondaryContainer} />
            <Text style={styles.dayTemp}>{day.temp}°</Text>
            <Text style={styles.rain}>{day.rain}%</Text>
          </View>
        ))}
      </View>
      <View style={styles.advice}>
        <Text style={styles.adviceTitle}>Conseil irrigation</Text>
        <Text style={styles.adviceText}>Arroser après 18h pour limiter l'évaporation et protéger les tomates pendant le pic de chaleur.</Text>
      </View>
    </Screen>
  );
}

function Mini({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return <View style={styles.mini}><MaterialIcons name={icon} size={24} color={colors.primary} /><Text style={styles.miniLabel}>{label}</Text><Text style={styles.miniValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface, marginBottom: spacing.stackMd },
  hero: { borderRadius: radius.card, padding: 20, backgroundColor: colors.primary, flexDirection: "row", justifyContent: "space-between", alignItems: "center", ...shadow.lift },
  place: { ...type.label, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  temp: { fontSize: 76, lineHeight: 84, fontWeight: "700", fontFamily: fonts.heading, color: colors.onPrimary },
  sun: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 },
  mini: { width: "48%", backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, ...shadow.card },
  miniLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 8 },
  miniValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, marginTop: 2 },
  days: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 12, marginTop: 16, ...shadow.card },
  day: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: `${colors.outlineVariant}44` },
  dayName: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, width: 42 },
  dayTemp: { ...type.label, fontFamily: fonts.body, color: colors.onSurface },
  rain: { ...type.labelSm, fontFamily: fonts.body, color: colors.water, width: 34, textAlign: "right" },
  advice: { backgroundColor: colors.secondaryFixed, borderRadius: radius.card, padding: 18, marginTop: 16 },
  adviceTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSecondaryFixed },
  adviceText: { ...type.body, fontFamily: fonts.body, color: colors.onSecondaryFixedVariant, marginTop: 6 },
});
