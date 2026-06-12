import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "IrrigationStarted">;

export function IrrigationStartedScreen({ navigation }: Props) {
  const { profileImage } = useOnboarding();
  const [progress, setProgress] = useState(4);
  const [secondsLeft, setSecondsLeft] = useState(1725);
  const pulse = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => Math.min(100, value + 0.08));
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ])
    );
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 950, useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 950, useNativeDriver: true }),
      ])
    );
    pulseLoop.start();
    bobLoop.start();
    return () => {
      pulseLoop.stop();
      bobLoop.stop();
    };
  }, [bob, pulse]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
          </Pressable>
          <MaterialIcons name="agriculture" size={26} color={colors.primary} />
          <Text style={styles.brandTitle}>AgroSmart</Text>
        </View>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </View>

      <View style={styles.successSection}>
        <Animated.View
          style={[
            styles.rippleOuter,
            {
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1] }),
              transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.04] }) }],
            },
          ]}
        >
          <View style={styles.rippleMiddle}>
            <Animated.View
              style={[
                styles.successCircle,
                { transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] },
              ]}
            >
              <MaterialIcons name="water-drop" size={56} color={colors.onPrimaryContainer} />
              <View style={styles.checkBadge}>
                <MaterialIcons name="check" size={24} color={colors.primary} />
              </View>
            </Animated.View>
          </View>
        </Animated.View>
        <Text style={styles.successTitle}>Arrosage lancé !</Text>
        <Text style={styles.successCopy}>La pompe est active et distribue l'eau selon vos paramètres.</Text>
      </View>

      <View style={styles.settingsCard}>
        <View style={styles.cardHeading}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={styles.cardTitle}>Paramètres appliqués</Text>
        </View>
        <View style={styles.settingGrid}>
          <SettingCell icon="location-on" label="Parcelle" value="Parcelle Nord" />
          <SettingCell icon="timer" label="Durée" value="30 minutes" />
          <SettingCell icon="opacity" label="Volume" value="500 Litres" />
        </View>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.pumpState}>
            <View style={styles.liveDot} />
            <Text style={styles.pumpText}>PUMP ACTIVE</Text>
          </View>
          <Text style={styles.timeRemaining} numberOfLines={1}>
            TEMPS RESTANT: {displayTime}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
          <View style={styles.flowTexture} />
        </View>
        <Text style={styles.progressNote}>"L'eau est dirigée vers les capteurs d'humidité de la zone A1"</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => navigation.navigate("MainTabs", { screen: "Dashboard" })} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
          <MaterialIcons name="dashboard" size={22} color={colors.onPrimary} />
          <Text style={styles.primaryButtonText}>Retour au tableau de bord</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("MainTabs", { screen: "Dashboard" })} style={({ pressed }) => [styles.stopButton, pressed && styles.buttonPressed]}>
          <MaterialIcons name="stop-circle" size={22} color={colors.error} />
          <Text style={styles.stopButtonText}>Arrêter l'arrosage</Text>
        </Pressable>
      </View>

      <View style={styles.footerAccent} />
    </Screen>
  );
}

function SettingCell({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.settingCell}>
      <MaterialIcons name={icon} size={24} color={colors.primary} />
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0 },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.mobile,
    backgroundColor: colors.surface,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1, minWidth: 0 },
  backButton: { width: 40, height: 40, borderRadius: radius.full, alignItems: "center", justifyContent: "center", marginLeft: -8 },
  brandTitle: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary, flexShrink: 1 },
  avatar: { width: 40, height: 40, borderRadius: radius.full, borderWidth: 2, borderColor: `${colors.primary}20` },
  successSection: { alignItems: "center", paddingHorizontal: spacing.mobile, paddingTop: spacing.stackMd, paddingBottom: spacing.stackLg },
  rippleOuter: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: `${colors.primary}12`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackSm,
  },
  rippleMiddle: {
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  successCircle: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...shadow.lift,
  },
  checkBadge: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  successTitle: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  successCopy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: spacing.base, maxWidth: 320 },
  settingsCard: {
    marginHorizontal: spacing.mobile,
    borderRadius: radius.xl,
    backgroundColor: "rgba(255,255,255,0.86)",
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}80`,
    padding: spacing.stackMd,
    ...shadow.card,
  },
  cardHeading: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.stackSm },
  cardTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  settingGrid: { gap: spacing.base },
  settingCell: {
    minHeight: 82,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.base,
  },
  settingLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 3 },
  settingValue: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, marginTop: 2 },
  progressCard: {
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.stackMd,
    ...shadow.card,
  },
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: spacing.base },
  pumpState: { flexDirection: "row", alignItems: "center", gap: 8, flexShrink: 0 },
  liveDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  pumpText: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, letterSpacing: 0.5 },
  timeRemaining: { flex: 1, textAlign: "right", ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  progressTrack: { height: 16, borderRadius: radius.full, backgroundColor: colors.surfaceContainer, overflow: "hidden", position: "relative" },
  progressFill: { height: "100%", borderRadius: radius.full, backgroundColor: colors.primaryContainer },
  flowTexture: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,255,255,0.13)" },
  progressNote: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", fontStyle: "italic", marginTop: spacing.stackSm },
  actions: { gap: spacing.gutter, marginHorizontal: spacing.mobile, marginTop: spacing.stackLg },
  primaryButton: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
    ...shadow.lift,
  },
  primaryButtonText: { ...type.label, fontSize: 16, fontFamily: fonts.heading, color: colors.onPrimary, textAlign: "center", flexShrink: 1 },
  stopButton: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
  },
  stopButtonText: { ...type.label, fontSize: 16, fontFamily: fonts.heading, color: colors.error, textAlign: "center", flexShrink: 1 },
  buttonPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  footerAccent: { height: 8, marginTop: spacing.stackLg, backgroundColor: colors.primaryFixedDim, opacity: 0.45 },
});
