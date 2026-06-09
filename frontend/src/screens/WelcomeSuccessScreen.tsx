import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "WelcomeSuccess">;

const successParticles = [
  { left: 32, top: 96, size: 8, color: colors.primary, rotation: "12deg" },
  { left: 58, top: 122, size: 5, color: colors.secondary, rotation: "42deg" },
  { right: 36, top: 84, size: 6, color: colors.primary, rotation: "75deg" },
  { right: 48, top: 128, size: 9, color: colors.tertiary, rotation: "24deg" },
  { left: 22, top: 148, size: 5, color: colors.tertiary, rotation: "66deg" },
  { right: 22, top: 154, size: 5, color: colors.primary, rotation: "104deg" },
];

export function WelcomeSuccessScreen({ navigation }: Props) {
  const { firstName, profileImage, crop } = useOnboarding();
  const displayName = firstName.trim() || "Koffi";
  const pluralCrop = crop.name.endsWith("s") ? crop.name : `${crop.name}s`;
  const avatarFloat = useRef(new Animated.Value(0)).current;
  const haloPulse = useRef(new Animated.Value(0)).current;
  const checkPulse = useRef(new Animated.Value(0)).current;
  const sparkle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(avatarFloat, { toValue: 1, duration: 1450, useNativeDriver: true }),
        Animated.timing(avatarFloat, { toValue: 0, duration: 1450, useNativeDriver: true }),
      ]),
    );
    const haloLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(haloPulse, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(haloPulse, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    );
    const checkLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(checkPulse, { toValue: 1, duration: 520, useNativeDriver: true }),
        Animated.timing(checkPulse, { toValue: 0, duration: 760, useNativeDriver: true }),
      ]),
    );
    const sparkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle, { toValue: 1, duration: 1350, useNativeDriver: true }),
        Animated.timing(sparkle, { toValue: 0, duration: 1350, useNativeDriver: true }),
      ]),
    );

    floatLoop.start();
    haloLoop.start();
    checkLoop.start();
    sparkleLoop.start();

    return () => {
      floatLoop.stop();
      haloLoop.stop();
      checkLoop.stop();
      sparkleLoop.stop();
    };
  }, [avatarFloat, checkPulse, haloPulse, sparkle]);

  const avatarTranslateY = avatarFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });
  const avatarScale = avatarFloat.interpolate({ inputRange: [0, 1], outputRange: [1, 1.018] });
  const haloScale = haloPulse.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.13] });
  const haloOpacity = haloPulse.interpolate({ inputRange: [0, 1], outputRange: [0.26, 0.07] });
  const checkScale = checkPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const particleTranslateY = sparkle.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const particleOpacity = sparkle.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0.22, 1, 0.5] });

  return (
    <Screen contentStyle={styles.wrap}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color={colors.primary} />
        </Pressable>
        <View style={styles.progressPill} />
        <View style={styles.topSpacer} />
      </View>

      <Animated.View style={[styles.photoMotion, { transform: [{ translateY: avatarTranslateY }, { scale: avatarScale }] }]}>
        <Animated.View style={[styles.halo, { opacity: haloOpacity, transform: [{ scale: haloScale }] }]} />
        <View style={styles.photoWrap}>
          <Image source={{ uri: profileImage }} style={styles.photo} />
          <Animated.View style={[styles.check, { transform: [{ scale: checkScale }] }]}>
            <MaterialIcons name="check" size={36} color={colors.onSecondaryContainer} />
          </Animated.View>
        </View>
        {successParticles.map((particle, index) => (
          <Animated.View
            key={`${particle.color}-${index}`}
            style={[
              styles.particle,
              {
                width: particle.size,
                height: particle.size,
                borderRadius: particle.size / 2,
                backgroundColor: particle.color,
                left: particle.left,
                right: particle.right,
                top: particle.top,
                opacity: particleOpacity,
                transform: [{ translateY: particleTranslateY }, { rotate: particle.rotation }],
              },
            ]}
          />
        ))}
      </Animated.View>

      <Text style={styles.title}>Vous êtes prêt, {displayName}! 🎉</Text>
      <Text style={styles.copy}>Votre programme d'arrosage pour vos {pluralCrop} est prêt.</Text>

      <View style={styles.summary}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.rowIconWrap}>
              <MaterialIcons name="local-dining" size={25} color={colors.tertiary} />
            </View>
            <Text style={styles.rowLabel}>Culture</Text>
          </View>
          <Text style={styles.rowValue}>{crop.emoji} {pluralCrop}</Text>
        </View>

        <View style={styles.two}>
          <Small label="Stade" value={crop.stage} icon="eco" tone={colors.primary} />
          <Small label="Prochain arrosage" value="17h30" icon="schedule" tone={colors.secondary} />
        </View>

        <View style={styles.cycle}>
          <View style={styles.cycleLeft}>
            <MaterialIcons name="calendar-today" size={22} color={colors.onPrimaryContainer} />
            <Text style={styles.cycleText}>Durée du cycle</Text>
          </View>
          <Text style={styles.cycleTextBold}>{crop.durationWeeks} semaines</Text>
        </View>
      </View>

      <AppButton label="Accéder à mon tableau de bord" icon="arrow-forward" onPress={() => navigation.replace("MainTabs")} />
      <Text style={styles.note}>Vous recevrez une notification 10 minutes avant chaque cycle.</Text>
    </Screen>
  );
}

function Small({ icon, label, value, tone }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; tone: string }) {
  return (
    <View style={styles.small}>
      <Text style={styles.smallLabel}>{label}</Text>
      <View style={styles.smallRow}>
        <MaterialIcons name={icon} size={21} color={tone} />
        <Text numberOfLines={1} style={styles.smallValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: "center", minHeight: "100%", paddingTop: 22 },
  topBar: { height: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  backButton: { width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: radius.full },
  progressPill: { width: 30, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  topSpacer: { width: 48 },
  photoMotion: { alignSelf: "center", width: 232, height: 232, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  halo: { position: "absolute", width: 202, height: 202, borderRadius: 101, backgroundColor: colors.primary, top: 15, left: 15 },
  particle: { position: "absolute" },
  photoWrap: { width: 192, height: 192, borderRadius: 96, borderWidth: 8, borderColor: colors.surfaceContainerHighest, backgroundColor: colors.surface, ...shadow.lift },
  photo: { width: "100%", height: "100%", borderRadius: 88 },
  check: { position: "absolute", right: -10, bottom: -8, width: 62, height: 62, borderRadius: 31, backgroundColor: colors.secondaryContainer, borderWidth: 4, borderColor: colors.surface, alignItems: "center", justifyContent: "center" },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  copy: { ...type.bodyLg, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 8, marginBottom: spacing.stackMd },
  summary: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, borderWidth: 1, borderColor: `${colors.outlineVariant}66`, marginBottom: spacing.stackMd, ...shadow.card },
  row: { minHeight: 66, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, gap: 12, marginBottom: 14 },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  rowIconWrap: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  rowLabel: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  rowValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface, flexShrink: 0 },
  two: { flexDirection: "row", gap: 14, marginBottom: 14 },
  small: { flex: 1, minHeight: 82, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer, padding: 14, justifyContent: "center" },
  smallLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase", marginBottom: 8 },
  smallRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  smallValue: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, flex: 1 },
  cycle: { backgroundColor: colors.primaryContainer, borderRadius: radius.lg, minHeight: 56, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  cycleLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  cycleText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  cycleTextBold: { ...type.label, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  note: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 16 },
});
