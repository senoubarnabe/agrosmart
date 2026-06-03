import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { images } from "../data/mockData";
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
  const { firstName, city, crop, sowingDate, surface, surfaceUnit } = useOnboarding();
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
      <Animated.View style={[styles.photoMotion, { transform: [{ translateY: avatarTranslateY }, { scale: avatarScale }] }]}>
        <Animated.View style={[styles.halo, { opacity: haloOpacity, transform: [{ scale: haloScale }] }]} />
        <View style={styles.photoWrap}>
          <Image source={{ uri: images.farmer }} style={styles.photo} />
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
        <Row icon="grass" label="Culture" value={`${crop.emoji} ${pluralCrop}`} />
        <View style={styles.two}>
          <Small label="Ville" value={city} icon="place" />
          <Small label="Semis" value={sowingDate || "Non défini"} icon="event" />
        </View>
        <View style={styles.two}>
          <Small label="Stade" value={crop.stage} icon="eco" />
          <Small label="Surface" value={`${surface || "0"} ${surfaceUnit}`} icon="crop-square" />
        </View>
        <View style={styles.cycle}>
          <MaterialIcons name="calendar-today" size={20} color={colors.onPrimaryContainer} />
          <Text style={styles.cycleText}>Durée du cycle</Text>
          <Text style={styles.cycleTextBold}>{crop.durationWeeks} semaines</Text>
        </View>
      </View>

      <AppButton label="Accéder à mon tableau de bord" icon="arrow-forward" onPress={() => navigation.replace("MainTabs")} />
      <Text style={styles.note}>🔔 Vous recevrez une alerte 10 minutes avant chaque cycle.</Text>
    </Screen>
  );
}

function Row({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <MaterialIcons name={icon} size={24} color={colors.tertiary} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function Small({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.small}>
      <Text style={styles.smallLabel}>{label}</Text>
      <View style={styles.smallRow}>
        <MaterialIcons name={icon} size={19} color={colors.primary} />
        <Text numberOfLines={1} style={styles.smallValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: "center", minHeight: "100%", paddingTop: 40 },
  photoMotion: { alignSelf: "center", width: 232, height: 232, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  halo: { position: "absolute", width: 202, height: 202, borderRadius: 101, backgroundColor: colors.primary, top: 15, left: 15 },
  particle: { position: "absolute" },
  photoWrap: { width: 192, height: 192, borderRadius: 96, borderWidth: 8, borderColor: colors.surfaceContainerHighest, backgroundColor: colors.surface, ...shadow.lift },
  photo: { width: "100%", height: "100%", borderRadius: 88 },
  check: { position: "absolute", right: -10, bottom: -8, width: 62, height: 62, borderRadius: 31, backgroundColor: colors.secondaryContainer, borderWidth: 4, borderColor: colors.surface, alignItems: "center", justifyContent: "center" },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  copy: { ...type.bodyLg, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 8, marginBottom: spacing.stackMd },
  summary: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 16, borderWidth: 1, borderColor: `${colors.outlineVariant}66`, marginBottom: spacing.stackMd, ...shadow.card },
  row: { minHeight: 56, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer, flexDirection: "row", alignItems: "center", padding: 12, gap: 10, marginBottom: 12 },
  rowLabel: { ...type.label, fontFamily: fonts.body, flex: 1, color: colors.onSurface },
  rowValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  two: { flexDirection: "row", gap: 12, marginBottom: 12 },
  small: { flex: 1, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer, padding: 12 },
  smallLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: 6 },
  smallRow: { flexDirection: "row", gap: 6, alignItems: "center" },
  smallValue: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, flex: 1 },
  cycle: { backgroundColor: colors.primaryContainer, borderRadius: radius.lg, padding: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  cycleText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer, flex: 1 },
  cycleTextBold: { ...type.label, fontFamily: fonts.body, color: colors.onPrimaryContainer },
  note: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 16 },
});
