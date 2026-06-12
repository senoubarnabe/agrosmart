import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { schedule } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Program">;

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export function ProgramScreen({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState("Mer");
  const [selectedTime, setSelectedTime] = useState(schedule[0]?.time ?? "");

  return (
    <Screen>
      <AppHeader back onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Programme Intelligent ⚡</Text>
      <Text style={styles.badge}>Recalculé suite à la pluie</Text>

      <View style={styles.days}>
        {days.map((day) => (
          <Pressable key={day} onPress={() => setSelectedDay(day)} style={({ pressed }) => [styles.day, selectedDay === day && styles.dayActive, pressed && styles.pressed]}>
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.next}>
        <Text style={styles.nextLabel}>PROCHAIN ARROSAGE</Text>
        <Text style={styles.count}>Dans 2h 15min</Text>
        <Text style={styles.nextText}>Parcelle Tomates • 450 litres</Text>
      </View>

      {schedule.map((item) => {
        const selected = selectedTime === item.time;
        return (
          <Pressable key={item.time} onPress={() => setSelectedTime(item.time)} style={({ pressed }) => [styles.item, selected && styles.itemActive, pressed && styles.pressed]}>
            <View style={[styles.time, selected && styles.timeActive]}>
              <Text style={[styles.timeText, selected && styles.timeTextActive]}>{item.time}</Text>
            </View>
            <View style={styles.itemCopy}>
              <Text style={styles.volume}>{item.volume}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
            </View>
            <View style={styles.statusBox}>
              {selected ? <MaterialIcons name="check-circle" size={18} color={colors.primary} /> : null}
              <Text style={item.status === "Fait" ? styles.done : styles.pending}>{item.status}</Text>
            </View>
          </Pressable>
        );
      })}

      <AppButton label="Programmer manuellement" icon="add" onPress={() => navigation.navigate("ManualProgramming")} style={{ marginTop: spacing.stackMd }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  badge: {
    ...type.labelSm,
    fontFamily: fonts.body,
    color: colors.onSecondaryContainer,
    alignSelf: "flex-start",
    backgroundColor: colors.secondaryFixedDim,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
    marginVertical: 12,
  },
  days: { flexDirection: "row", gap: 8, marginBottom: 16 },
  day: { flex: 1, alignItems: "center", backgroundColor: colors.surfaceContainerHigh, borderRadius: radius.full, paddingVertical: 10, overflow: "hidden" },
  dayActive: { backgroundColor: colors.primary },
  dayText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  dayTextActive: { color: colors.onPrimary },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  next: { backgroundColor: colors.primary, borderRadius: radius.card, padding: 22, marginBottom: 16, ...shadow.lift },
  nextLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  count: { ...type.h1, fontFamily: fonts.heading, color: colors.onPrimary, marginTop: 8 },
  nextText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer, marginTop: 6 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 14,
    marginBottom: 12,
    ...shadow.card,
  },
  itemActive: { borderColor: colors.primaryFixedDim, backgroundColor: colors.surfaceContainerLow },
  time: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center" },
  timeActive: { backgroundColor: colors.primary },
  timeText: { ...type.label, fontFamily: fonts.body, color: colors.primary },
  timeTextActive: { color: colors.onPrimary },
  itemCopy: { flex: 1, minWidth: 0 },
  volume: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  reason: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  statusBox: { alignItems: "center", gap: 4 },
  done: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary },
  pending: { ...type.labelSm, fontFamily: fonts.body, color: colors.secondary },
});
