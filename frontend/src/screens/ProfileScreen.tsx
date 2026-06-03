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

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const cities = ["Cotonou", "Porto-Novo", "Parakou", "Djougou", "Abomey-Calavi", "Bohicon", "Natitingou", "Ouidah"];

export function ProfileScreen({ navigation }: Props) {
  const { firstName, setFirstName, city, setCity, language, setLanguage, profileImage } = useOnboarding();
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <ImageBackground source={{ uri: images.splash }} style={styles.bg} blurRadius={8}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
            <View style={styles.panel}>
              {cityOpen ? <Pressable style={styles.dismissLayer} onPress={() => setCityOpen(false)} /> : null}

              <View style={styles.topBar}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                  <MaterialIcons name="arrow-back" size={28} color={colors.primary} />
                </Pressable>
                <View style={styles.progressPill} />
                <View style={styles.topSpacer} />
              </View>

              <View style={styles.avatarWrap}>
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                <View style={styles.editBadge}>
                  <MaterialIcons name="edit" size={24} color={colors.onSecondary} />
                </View>
              </View>

              <Text style={styles.title}>Faisons connaissance 👋</Text>
              <Text style={styles.copy}>Personnalisez votre expérience d'arrosage.</Text>

              <View style={styles.inputField}>
                <MaterialIcons name="person" size={22} color={colors.primary} />
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Votre prénom"
                  placeholderTextColor={colors.outline}
                  autoCapitalize="words"
                  returnKeyType="done"
                  style={[styles.input, styles.webInputReset]}
                />
              </View>

              <View style={styles.cityBlock}>
                {cityOpen ? (
                  <View style={styles.cityList}>
                    <Text style={styles.cityTitle}>Choisir une ville</Text>
                    {cities.map((item) => (
                      <Pressable
                        key={item}
                        onPress={() => {
                          setCity(item);
                          setCityOpen(false);
                        }}
                        style={[styles.cityOption, item === city && styles.cityOptionActive]}
                      >
                        <Text style={[styles.cityText, item === city && styles.cityTextActive]}>{item}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}

                <Pressable style={styles.citySelect} onPress={() => setCityOpen((value) => !value)}>
                  <MaterialIcons name="place" size={28} color={colors.outline} />
                  <Text style={styles.cityValue}>{city}</Text>
                  <MaterialIcons name={cityOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={28} color={colors.onSurfaceVariant} />
                </Pressable>
              </View>

              <Text style={styles.label}>Langue préférée</Text>
              <View style={styles.segments}>
                {["Français", "Fon", "Yoruba"].map((item) => (
                  <Pressable key={item} onPress={() => setLanguage(item)} style={[styles.segment, language === item && styles.segmentActive]}>
                    <Text style={[styles.segmentText, language === item && styles.segmentTextActive]}>{item}</Text>
                  </Pressable>
                ))}
              </View>

              <AppButton label="Continuer" icon="arrow-forward" onPress={() => navigation.navigate("CultureRegistration")} style={{ marginTop: 18 }} />
              <Text style={styles.step}>Étape 2 sur 5</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,69,13,0.28)" },
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "flex-end", alignItems: "center", paddingTop: 14 },
  panel: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: spacing.mobile,
    paddingBottom: 36,
    position: "relative",
    ...shadow.lift,
  },
  dismissLayer: { ...StyleSheet.absoluteFillObject, zIndex: 1, backgroundColor: "transparent" },
  topBar: { height: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  backButton: { width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: radius.full },
  progressPill: { width: 30, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  topSpacer: { width: 48 },
  avatarWrap: { alignSelf: "center", width: 116, height: 116, marginBottom: 18 },
  avatarImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: colors.surfaceContainerLowest,
    backgroundColor: colors.surfaceContainerHigh,
    ...shadow.card,
  },
  editBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.secondaryContainer,
    borderWidth: 3,
    borderColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface, textAlign: "center" },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginBottom: 18 },
  inputField: {
    minHeight: 58,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  label: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  input: { ...type.bodyLg, fontFamily: fonts.body, color: colors.onSurface, padding: 0, flex: 1 },
  webInputReset: { outlineStyle: "none", outlineWidth: 0, boxShadow: "none", borderWidth: 0, backgroundColor: "transparent" } as never,
  cityBlock: { marginBottom: 18, zIndex: 2 },
  cityList: { borderWidth: 1, borderColor: colors.outline, backgroundColor: colors.surfaceContainerLowest, overflow: "hidden" },
  cityTitle: { ...type.bodyLg, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", paddingTop: 6, paddingBottom: 2 },
  cityOption: { minHeight: 36, justifyContent: "center", paddingHorizontal: 60 },
  cityOptionActive: { backgroundColor: "#888888" },
  cityText: { fontSize: 20, lineHeight: 28, fontFamily: fonts.body, color: "#000000" },
  cityTextActive: { color: colors.onPrimary, fontWeight: "700" },
  citySelect: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 22,
    paddingHorizontal: 18,
    backgroundColor: colors.surfaceContainerLowest,
    marginTop: 4,
    ...shadow.card,
  },
  cityValue: { ...type.bodyLg, fontFamily: fonts.body, color: colors.onSurface, flex: 1 },
  segments: { flexDirection: "row", padding: 4, backgroundColor: colors.surfaceContainerHigh, borderRadius: radius.full, marginTop: 8 },
  segment: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 10, borderRadius: radius.full },
  segmentActive: { backgroundColor: colors.secondaryContainer },
  segmentText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  segmentTextActive: { color: colors.onSecondaryContainer },
  step: { ...type.labelSm, fontFamily: fonts.body, textAlign: "center", color: colors.onSurfaceVariant, marginTop: 16 },
});
