import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ManualProgramming">;

export function ManualProgrammingScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader title="Programmer" back onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Programmer l'arrosage</Text>
      <Text style={styles.section}>Choisir la parcelle</Text>
      <View style={styles.parcels}>
        <Text style={styles.parcelActive}>Parcelle Nord</Text>
        <Text style={styles.parcel}>Parcelle Est</Text>
      </View>
      <Text style={styles.section}>Durée</Text>
      <View style={styles.grid}>
        {["15", "30", "45", "1 HEURE"].map((item, i) => <Text key={item} style={i === 1 ? styles.durationActive : styles.duration}>{item}</Text>)}
      </View>
      <View style={styles.volumeCard}>
        <View style={styles.volumeRow}>
          <MaterialIcons name="water-drop" size={34} color={colors.water} />
          <View>
            <Text style={styles.volumeLabel}>Volume estimé</Text>
            <Text style={styles.volume}>500 Litres</Text>
          </View>
        </View>
        <View style={styles.slider}><View style={styles.sliderFill} /><View style={styles.knob} /></View>
      </View>
      <Text style={styles.section}>Démarrage</Text>
      <View style={styles.parcels}><Text style={styles.parcelActive}>Maintenant</Text><Text style={styles.parcel}>Plus tard</Text></View>
      <AppButton label="Démarrer l'arrosage" icon="play-arrow" onPress={() => navigation.goBack()} style={{ marginTop: spacing.stackLg }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface, marginBottom: spacing.stackMd },
  section: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: 10, marginTop: 8 },
  parcels: { flexDirection: "row", gap: 10, marginBottom: 18 },
  parcel: { flex: 1, textAlign: "center", ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainerHigh, borderRadius: radius.full, paddingVertical: 14, overflow: "hidden" },
  parcelActive: { flex: 1, textAlign: "center", ...type.label, fontFamily: fonts.body, color: colors.onPrimary, backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 14, overflow: "hidden" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  duration: { width: "48%", textAlign: "center", ...type.label, fontFamily: fonts.body, color: colors.onSurface, backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, paddingVertical: 24, overflow: "hidden", ...shadow.card },
  durationActive: { width: "48%", textAlign: "center", ...type.label, fontFamily: fonts.body, color: colors.onSecondaryContainer, backgroundColor: colors.secondaryContainer, borderRadius: radius.card, paddingVertical: 24, overflow: "hidden", ...shadow.card },
  volumeCard: { borderRadius: radius.card, backgroundColor: colors.surfaceContainerLowest, padding: 18, marginVertical: 18, ...shadow.card },
  volumeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  volumeLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  volume: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  slider: { height: 10, borderRadius: 5, backgroundColor: colors.surfaceContainerHigh, position: "relative" },
  sliderFill: { width: "68%", height: 10, borderRadius: 5, backgroundColor: colors.water },
  knob: { position: "absolute", left: "65%", top: -7, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.water, borderWidth: 4, borderColor: colors.surfaceContainerLowest },
});
