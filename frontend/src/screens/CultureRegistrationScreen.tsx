import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { images } from "../data/mockData";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CultureRegistration">;

const cropTemplates = [
  { name: "Tomate", emoji: "🍅", image: images.tomatoes, stage: "Germination", durationWeeks: 14 },
  { name: "Piment", emoji: "🌶️", image: images.drySoil, stage: "Croissance", durationWeeks: 12 },
  { name: "Oignon", emoji: "🧅", image: images.splash, stage: "Bulbaison", durationWeeks: 16 },
  { name: "Laitue", emoji: "🥬", image: images.leak, stage: "Pré-récolte", durationWeeks: 8 },
  { name: "Maïs", emoji: "🌽", image: images.corn, stage: "Croissance active", durationWeeks: 18 },
  { name: "Carotte", emoji: "🥕", image: images.alertsHero, stage: "Développement racinaire", durationWeeks: 11 },
];

export function CultureRegistrationScreen({ navigation }: Props) {
  const { crop, setCrop, sowingDate, setSowingDate, surface, setSurface, surfaceUnit, setSurfaceUnit } = useOnboarding();
  const [selectedIndex, setSelectedIndex] = useState(() => Math.max(0, cropTemplates.findIndex((item) => item.name === crop.name)));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  return (
    <ImageBackground source={{ uri: images.splash }} style={styles.bg} blurRadius={12}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
            <View style={styles.card}>
              <View style={styles.topBar}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                  <MaterialIcons name="arrow-back" size={28} color={colors.primary} />
                </Pressable>
                <View style={styles.progress}>
                  {[0, 1, 2, 3].map((item) => <View key={item} style={[styles.progressDot, item === 1 && styles.progressActive]} />)}
                </View>
                <View style={styles.topSpacer} />
              </View>

              <Text style={styles.title}>Quelle culture avez-vous plantée ? 🌱</Text>
              <Text style={styles.copy}>Le système va créer un programme d'arrosage fait pour vous</Text>

              <View style={styles.cropGrid}>
                {cropTemplates.map((item, index) => {
                  const selected = selectedIndex === index;
                  return (
                    <Pressable
                      key={item.name}
                      onPress={() => {
                        setSelectedIndex(index);
                        setCrop(item);
                      }}
                      style={[styles.cropCard, selected && styles.cropCardSelected]}
                    >
                      <View style={styles.cropImageWrap}>
                        <Image source={{ uri: item.image }} style={styles.cropImage} />
                      </View>
                      {selected ? (
                        <View style={styles.check}>
                          <MaterialIcons name="check" size={24} color={colors.primary} />
                        </View>
                      ) : null}
                      <Text numberOfLines={1} style={[styles.cropName, selected && styles.cropNameSelected]}>{item.name}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date de semis</Text>
                <View style={styles.inputBox}>
                  <Pressable onPress={() => setCalendarOpen((value) => !value)} style={styles.iconTap}>
                    <MaterialIcons name="calendar-today" size={20} color={colors.onSurface} />
                  </Pressable>
                  <TextInput value={sowingDate} onChangeText={setSowingDate} placeholder="JJ/MM/AAAA" style={[styles.input, styles.webInputReset]} keyboardType="numbers-and-punctuation" />
                </View>
                {calendarOpen ? (
                  <View style={styles.calendar}>
                    <View style={styles.calendarHeader}>
                      <Text style={styles.calendarMonth}>juin 2026</Text>
                      <View style={styles.calendarArrows}>
                        <MaterialIcons name="arrow-upward" size={28} color={colors.onSurface} />
                        <MaterialIcons name="arrow-downward" size={28} color={colors.onSurface} />
                      </View>
                    </View>
                    <View style={styles.weekRow}>
                      {["lu", "ma", "me", "je", "ve", "sa", "di"].map((day) => <Text key={day} style={styles.weekDay}>{day}</Text>)}
                    </View>
                    <View style={styles.dayGrid}>
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((day, index) => {
                        const active = sowingDate.startsWith(day.padStart(2, "0")) && index < 30;
                        const muted = index > 29;
                        return (
                          <Pressable
                            key={`${day}-${index}`}
                            onPress={() => {
                              if (!muted) {
                                setSowingDate(`${day.padStart(2, "0")}/06/2026`);
                                setCalendarOpen(false);
                              }
                            }}
                            style={[styles.dayCell, active && styles.dayActive]}
                          >
                            <Text style={[styles.dayText, muted && styles.dayMuted, active && styles.dayTextActive]}>{day}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                    <View style={styles.calendarFooter}>
                      <Pressable onPress={() => setSowingDate("")}><Text style={styles.calendarAction}>Effacer</Text></Pressable>
                      <Pressable onPress={() => { setSowingDate("02/06/2026"); setCalendarOpen(false); }}><Text style={styles.calendarAction}>Aujourd'hui</Text></Pressable>
                    </View>
                  </View>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Superficie</Text>
                <View style={styles.surfaceRow}>
                  <View style={[styles.inputBox, styles.surfaceInput]}>
                    <TextInput value={surface} onChangeText={setSurface} keyboardType="decimal-pad" placeholder="0.00" style={[styles.input, styles.surfaceTextInput, styles.webInputReset]} />
                  </View>
                  <View style={styles.unitWrap}>
                    <Pressable style={styles.unitSelect} onPress={() => setUnitOpen((value) => !value)}>
                      <Text style={styles.unitText}>{surfaceUnit === "ha" ? "hectares" : "m²"}</Text>
                      <MaterialIcons name="expand-more" size={18} color={colors.onSurface} />
                    </Pressable>
                    {unitOpen ? (
                      <View style={styles.unitMenu}>
                        {(["m²", "ha"] as const).map((item) => (
                          <Pressable
                            key={item}
                            onPress={() => {
                              setSurfaceUnit(item);
                              setUnitOpen(false);
                            }}
                            style={[styles.unitOption, surfaceUnit === item && styles.unitOptionActive]}
                          >
                            <Text style={[styles.unitOptionText, surfaceUnit === item && styles.unitOptionTextActive]}>{item === "ha" ? "hectares" : "m²"}</Text>
                          </Pressable>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>

              <AppButton label="Générer mon programme" icon="arrow-forward" onPress={() => navigation.navigate("SensorConnection")} style={styles.cta} />
            </View>

            <Text style={styles.step}>Étape 3 sur 5</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(247,251,241,0.88)" },
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", paddingHorizontal: spacing.mobile, paddingTop: 20, paddingBottom: 28 },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 32,
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}44`,
    ...shadow.lift,
  },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  backButton: { width: 42, height: 42, borderRadius: radius.full, alignItems: "center", justifyContent: "center" },
  progress: { flex: 1, flexDirection: "row", gap: 6, justifyContent: "center", paddingHorizontal: 14 },
  progressDot: { width: 24, height: 7, borderRadius: 4, backgroundColor: "transparent" },
  progressActive: { backgroundColor: colors.primary },
  topSpacer: { width: 42 },
  title: { fontSize: 26, lineHeight: 33, fontWeight: "800", fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  copy: { fontSize: 15, lineHeight: 22, fontWeight: "500", fontFamily: fonts.body, color: "#000000", textAlign: "center", marginTop: 12, marginBottom: 26, paddingHorizontal: 6 },
  cropGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: 12, rowGap: 12, marginBottom: 24 },
  cropCard: { width: "30.9%", minHeight: 110, borderRadius: radius.lg, borderWidth: 2, borderColor: "#e3e7df", backgroundColor: colors.surfaceContainerLowest, alignItems: "center", justifyContent: "flex-start", paddingTop: 12, paddingHorizontal: 8, paddingBottom: 10, position: "relative" },
  cropCardSelected: { borderColor: colors.primary, backgroundColor: "#f4fbf1" },
  check: { position: "absolute", right: 6, top: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.surfaceContainerLowest, alignItems: "center", justifyContent: "center", zIndex: 2 },
  cropImageWrap: { width: 62, height: 62, borderRadius: 31, overflow: "hidden", backgroundColor: colors.surfaceContainer, marginBottom: 8, borderWidth: 1, borderColor: "#111111" },
  cropImage: { width: "100%", height: "100%" },
  cropName: { fontSize: 14, lineHeight: 18, fontWeight: "800", fontFamily: fonts.body, color: "#000000", maxWidth: "100%" },
  cropNameSelected: { color: colors.primary },
  inputGroup: { marginBottom: 20, position: "relative", zIndex: 4 },
  label: { fontSize: 15, lineHeight: 20, fontWeight: "900", fontFamily: fonts.body, color: "#000000", textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 },
  inputBox: { minHeight: 60, borderRadius: 18, borderWidth: 1, borderColor: "#bfc9b8", backgroundColor: "#f7fbf1", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 20 },
  iconTap: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 18 },
  input: { fontSize: 22, lineHeight: 28, fontWeight: "700", fontFamily: fonts.body, color: "#000000", flex: 1, padding: 0 },
  webInputReset: { outlineStyle: "none", outlineWidth: 0, boxShadow: "none", borderWidth: 0, backgroundColor: "transparent" } as never,
  calendar: { width: "100%", backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: "#d8d8d8", paddingHorizontal: 18, paddingTop: 18, paddingBottom: 14, marginTop: 8, zIndex: 20, ...shadow.card },
  calendarHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  calendarMonth: { fontSize: 16, lineHeight: 20, fontWeight: "800", fontFamily: fonts.body, color: "#000000" },
  calendarArrows: { flexDirection: "row", gap: 20 },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  weekDay: { width: 32, textAlign: "center", fontSize: 15, lineHeight: 20, fontFamily: fonts.body, color: "#000000" },
  dayGrid: { flexDirection: "row", flexWrap: "wrap", rowGap: 4 },
  dayCell: { width: `${100 / 7}%`, height: 32, alignItems: "center", justifyContent: "center" },
  dayActive: { backgroundColor: "#777777" },
  dayText: { fontSize: 16, lineHeight: 22, fontFamily: fonts.body, color: "#000000" },
  dayTextActive: { color: colors.onPrimary, fontWeight: "800" },
  dayMuted: { color: "#777777" },
  calendarFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 14, paddingHorizontal: 6 },
  calendarAction: { fontSize: 15, lineHeight: 20, fontFamily: fonts.body, color: "#006bd6" },
  surfaceRow: { flexDirection: "row", gap: 12 },
  surfaceInput: { flex: 1, paddingHorizontal: 22, overflow: "hidden" },
  surfaceTextInput: { minWidth: 0, width: "100%" } as never,
  unitWrap: { width: 110, position: "relative", zIndex: 30 },
  unitSelect: { width: 110, minHeight: 60, borderRadius: 18, backgroundColor: "#f7fbf1", borderWidth: 1, borderColor: "#bfc9b8", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 8 },
  unitText: { fontSize: 16, lineHeight: 20, fontWeight: "800", fontFamily: fonts.body, color: "#000000" },
  unitMenu: { position: "absolute", top: 64, left: 0, right: 0, borderWidth: 1, borderColor: "#777777", backgroundColor: colors.surfaceContainerLowest, zIndex: 40, elevation: 14 },
  unitOption: { minHeight: 36, alignItems: "center", justifyContent: "center" },
  unitOptionActive: { backgroundColor: "#777777" },
  unitOptionText: { fontSize: 16, lineHeight: 20, fontFamily: fonts.body, color: "#000000" },
  unitOptionTextActive: { color: colors.onPrimary, fontWeight: "800" },
  cta: { marginTop: 0, minHeight: 70, borderRadius: 35 },
  step: { ...type.labelSm, fontFamily: fonts.body, textAlign: "center", color: colors.outline, marginTop: 14, textTransform: "uppercase" },
});
