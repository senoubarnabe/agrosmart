import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { schedule } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Program">;

export function ProgramScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader back onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Programme Intelligent ⚡</Text>
      <Text style={styles.badge}>Recalculé suite à la pluie</Text>
      <View style={styles.days}>{["Lun", "Mar", "Mer", "Jeu", "Ven"].map((day, i) => <Text key={day} style={i === 2 ? styles.dayActive : styles.day}>{day}</Text>)}</View>
      <View style={styles.next}>
        <Text style={styles.nextLabel}>PROCHAIN ARROSAGE</Text>
        <Text style={styles.count}>Dans 2h 15min</Text>
        <Text style={styles.nextText}>Parcelle Tomates • 450 litres</Text>
      </View>
      {schedule.map((item) => (
        <View key={item.time} style={styles.item}>
          <View style={styles.time}><Text style={styles.timeText}>{item.time}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.volume}>{item.volume}</Text>
            <Text style={styles.reason}>{item.reason}</Text>
          </View>
          <Text style={item.status === "Fait" ? styles.done : styles.pending}>{item.status}</Text>
        </View>
      ))}
      <AppButton label="Programmer manuellement" icon="add" onPress={() => navigation.navigate("ManualProgramming")} style={{ marginTop: spacing.stackMd }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  badge: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSecondaryContainer, alignSelf: "flex-start", backgroundColor: colors.secondaryFixedDim, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6, overflow: "hidden", marginVertical: 12 },
  days: { flexDirection: "row", gap: 8, marginBottom: 16 },
  day: { flex: 1, textAlign: "center", ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainerHigh, borderRadius: radius.full, paddingVertical: 10, overflow: "hidden" },
  dayActive: { flex: 1, textAlign: "center", ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimary, backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 10, overflow: "hidden" },
  next: { backgroundColor: colors.primary, borderRadius: radius.card, padding: 22, marginBottom: 16, ...shadow.lift },
  nextLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  count: { ...type.h1, fontFamily: fonts.heading, color: colors.onPrimary, marginTop: 8 },
  nextText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer, marginTop: 6 },
  item: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 14, marginBottom: 12, ...shadow.card },
  time: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center" },
  timeText: { ...type.label, fontFamily: fonts.body, color: colors.primary },
  volume: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  reason: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  done: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary },
  pending: { ...type.labelSm, fontFamily: fonts.body, color: colors.secondary },
});
