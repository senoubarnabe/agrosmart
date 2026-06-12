import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ManualProgramming">;

const parcels = ["Parcelle Nord", "Parcelle Est"];
const durations = ["15", "30", "45", "1 HEURE"];
const startModes = ["Maintenant", "Plus tard"];

export function ManualProgrammingScreen({ navigation }: Props) {
  const [parcel, setParcel] = useState("Parcelle Nord");
  const [duration, setDuration] = useState("30");
  const [startMode, setStartMode] = useState("Maintenant");
  const [volumePercent, setVolumePercent] = useState(0.68);
  const [sliderWidth, setSliderWidth] = useState(1);

  const volumeLitres = useMemo(() => Math.round(180 + volumePercent * 620), [volumePercent]);

  const updateVolume = (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX;
    setVolumePercent(Math.max(0, Math.min(1, x / sliderWidth)));
  };

  return (
    <Screen>
      <AppHeader title="Programmer" back onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Programmer l'arrosage</Text>

      <Text style={styles.section}>Choisir la parcelle</Text>
      <View style={styles.parcels}>
        {parcels.map((item) => (
          <ChoicePill key={item} label={item} active={parcel === item} onPress={() => setParcel(item)} />
        ))}
      </View>

      <Text style={styles.section}>Durée</Text>
      <View style={styles.grid}>
        {durations.map((item) => (
          <Pressable key={item} onPress={() => setDuration(item)} style={({ pressed }) => [styles.duration, duration === item && styles.durationActive, pressed && styles.pressed]}>
            <Text style={[styles.durationText, duration === item && styles.durationTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.volumeCard}>
        <View style={styles.volumeRow}>
          <MaterialIcons name="water-drop" size={34} color={colors.water} />
          <View style={{ flex: 1 }}>
            <Text style={styles.volumeLabel}>Volume estimé</Text>
            <Text style={styles.volume}>{volumeLitres} Litres</Text>
          </View>
        </View>
        <Pressable
          onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
          onPress={updateVolume}
          onPressIn={updateVolume}
          style={styles.slider}
        >
          <View style={[styles.sliderFill, { width: `${volumePercent * 100}%` }]} />
          <View style={[styles.knob, { left: `${Math.max(3, Math.min(94, volumePercent * 100))}%` }]} />
        </Pressable>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>180 L</Text>
          <Text style={styles.sliderLabel}>800 L</Text>
        </View>
      </View>

      <Text style={styles.section}>Démarrage</Text>
      <View style={styles.parcels}>
        {startModes.map((item) => (
          <ChoicePill key={item} label={item} active={startMode === item} onPress={() => setStartMode(item)} />
        ))}
      </View>

      <AppButton label="Démarrer l'arrosage" icon="play-arrow" onPress={() => navigation.navigate("IrrigationStarted")} style={{ marginTop: spacing.stackLg }} />
    </Screen>
  );
}

function ChoicePill({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.choice, active && styles.choiceActive, pressed && styles.pressed]}>
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface, marginBottom: spacing.stackMd },
  section: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: 10, marginTop: 8 },
  parcels: { flexDirection: "row", gap: 10, marginBottom: 18 },
  choice: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.full,
    paddingHorizontal: 10,
  },
  choiceActive: { backgroundColor: colors.primary },
  choiceText: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center" },
  choiceTextActive: { color: colors.onPrimary },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  duration: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    paddingVertical: 24,
    overflow: "hidden",
    ...shadow.card,
  },
  durationActive: { backgroundColor: colors.secondaryContainer },
  durationText: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, textAlign: "center" },
  durationTextActive: { color: colors.onSecondaryContainer },
  volumeCard: { borderRadius: radius.card, backgroundColor: colors.surfaceContainerLowest, padding: 18, marginVertical: 18, ...shadow.card },
  volumeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  volumeLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  volume: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  slider: { height: 32, borderRadius: 16, backgroundColor: colors.surfaceContainerHigh, position: "relative", justifyContent: "center", overflow: "visible" },
  sliderFill: { height: 10, borderRadius: 5, backgroundColor: colors.water },
  knob: { position: "absolute", top: 4, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.water, borderWidth: 4, borderColor: colors.surfaceContainerLowest },
  sliderLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  sliderLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
});
