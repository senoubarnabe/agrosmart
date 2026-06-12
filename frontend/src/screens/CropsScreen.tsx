import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Crops">, NativeStackScreenProps<RootStackParamList>>;

export function CropsScreen({ navigation }: Props) {
  const { cultures } = useOnboarding();

  return (
    <Screen>
      <AppHeader />
      <View style={styles.heading}>
        <View>
          <Text style={styles.title}>Mes Cultures</Text>
          <Text style={styles.copy}>Suivi de la santé et croissance</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.iconBtn}><MaterialIcons name="history" size={22} color={colors.primary} /></Pressable>
          <Pressable style={styles.iconBtn}><MaterialIcons name="filter-list" size={22} color={colors.primary} /></Pressable>
        </View>
      </View>

      {cultures.map((culture) => {
        const warning = culture.alert;
        return (
          <Pressable
            key={culture.name}
            onPress={() => navigation.navigate("CultureDetail", { cultureName: culture.name })}
            style={({ pressed }) => [styles.cropCard, pressed && styles.cropCardPressed]}
          >
            <View style={styles.cropTop}>
              <Image source={{ uri: culture.image }} style={styles.cropImage} />
              <View style={{ flex: 1 }}>
                <View style={styles.cropTitleRow}>
                  <Text style={styles.cropName}>{culture.name}</Text>
                  <Text style={[styles.stage, warning && styles.stageMuted]}>{culture.stage}</Text>
                </View>
                <View style={styles.healthRow}>
                  <View style={[styles.dot, { backgroundColor: warning ? colors.secondaryContainer : colors.primary }]} />
                  <Text style={[styles.health, { color: warning ? colors.secondaryContainer : colors.primary }]}>{culture.health}</Text>
                </View>
                <Text style={styles.week}>Croissance : {culture.week}</Text>
                <View style={styles.progressBg}><View style={[styles.progressFill, { width: `${culture.progress}%` }]} /></View>
              </View>
            </View>
            <View style={styles.cropStats}>
              <Info icon="water-drop" label="Prochain arrosage" value={culture.next} alert={warning} />
              <Info icon="grass" label="Humidité sol" value={culture.humidity} />
            </View>
          </Pressable>
        );
      })}

      <AppButton label="Ajouter une parcelle" icon="add-circle" onPress={() => navigation.navigate("CultureRegistration", { mode: "addParcel" })} />
      <View style={styles.summary}>
        <View style={styles.summaryCell}>
          <MaterialIcons name="grass" size={24} color={colors.secondary} />
          <Text style={styles.summaryLabel}>Surface cultivée</Text>
          <Text style={styles.summaryValue}>1.2 ha</Text>
        </View>
        <View style={styles.summaryCell}>
          <MaterialIcons name="monitor" size={24} color={colors.primary} />
          <Text style={styles.summaryLabel}>Efficacité eau</Text>
          <Text style={styles.summaryValue}>94%</Text>
        </View>
      </View>
    </Screen>
  );
}

function Info({ icon, label, value, alert }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; alert?: boolean }) {
  return (
    <View style={styles.info}>
      <MaterialIcons name={icon} size={20} color={alert ? colors.error : colors.primary} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, alert && styles.infoAlert]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.stackMd },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  actions: { flexDirection: "row", gap: 8 },
  iconBtn: { width: 42, height: 42, borderRadius: radius.lg, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center" },
  cropCard: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: `${colors.outlineVariant}50`, ...shadow.card },
  cropCardPressed: { transform: [{ scale: 0.99 }], opacity: 0.94 },
  cropTop: { flexDirection: "row", gap: 14 },
  cropImage: { width: 92, height: 92, borderRadius: radius.lg },
  cropTitleRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  cropName: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, flex: 1 },
  stage: { ...type.labelSm, fontFamily: fonts.body, color: colors.onTertiaryFixed, backgroundColor: colors.tertiaryFixed, borderRadius: radius.md, paddingHorizontal: 8, paddingVertical: 4, overflow: "hidden" },
  stageMuted: { backgroundColor: colors.surfaceContainerHigh, color: colors.onSurfaceVariant },
  healthRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  health: { ...type.labelSm, fontFamily: fonts.body },
  week: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 10 },
  progressBg: { height: 10, borderRadius: 5, backgroundColor: colors.surfaceContainer, overflow: "hidden", marginTop: 5 },
  progressFill: { height: "100%", borderRadius: 5, backgroundColor: colors.primaryFixedDim },
  cropStats: { flexDirection: "row", gap: 10, borderTopWidth: 1, borderTopColor: `${colors.outlineVariant}40`, marginTop: 14, paddingTop: 14 },
  info: { flex: 1, flexDirection: "row", gap: 6, alignItems: "center" },
  infoLabel: { fontSize: 8, lineHeight: 11, fontWeight: "900", fontFamily: fonts.body, color: colors.outline, textTransform: "uppercase" },
  infoValue: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurface, marginTop: 2 },
  infoAlert: { color: colors.error },
  summary: { flexDirection: "row", gap: 12, marginTop: 16 },
  summaryCell: { flex: 1, borderRadius: radius.card, backgroundColor: colors.secondaryFixed, padding: 14, alignItems: "center" },
  summaryLabel: { fontSize: 10, lineHeight: 13, fontWeight: "900", fontFamily: fonts.body, color: colors.onSecondaryFixedVariant, textTransform: "uppercase", marginTop: 6 },
  summaryValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSecondaryFixed, marginTop: 2 },
});
