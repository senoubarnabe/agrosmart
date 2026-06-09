import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { images } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "NotificationsIntro">;
type IconName = keyof typeof MaterialIcons.glyphMap;

const alertExamples = [
  {
    title: "Sol trop sec",
    text: "Arrosez au bon moment pour éviter le flétrissement.",
    image: images.drySoil,
    icon: "water-drop" as IconName,
    iconColor: colors.secondaryContainer,
    iconBg: "#fff1db",
  },
  {
    title: "Réservoir vide",
    text: "Évitez les pannes sèches avant vos cycles d'irrigation.",
    image: images.tank,
    icon: "layers" as IconName,
    iconColor: colors.error,
    iconBg: "#fde7e7",
  },
];

export function NotificationsIntroScreen({ navigation }: Props) {
  const bellMotion = useRef(new Animated.Value(0)).current;
  const ringPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bellLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bellMotion, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(bellMotion, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    );
    const ringLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ringPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(ringPulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );

    bellLoop.start();
    ringLoop.start();

    return () => {
      bellLoop.stop();
      ringLoop.stop();
    };
  }, [bellMotion, ringPulse]);

  const bellTranslateY = bellMotion.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });
  const bellRotate = bellMotion.interpolate({ inputRange: [0, 0.5, 1], outputRange: ["-5deg", "6deg", "-5deg"] });
  const pulseScale = ringPulse.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1.34] });
  const pulseOpacity = ringPulse.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0] });

  return (
    <ImageBackground source={{ uri: images.splash }} style={styles.bg} resizeMode="cover" blurRadius={12}>
      <View style={styles.overlay} />
      <View style={styles.bottomShade} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color={colors.onPrimary} />
          </Pressable>
          <View style={styles.progressPill} />
          <View style={styles.topSpacer} />
        </View>

        <View style={styles.bellArea}>
          <Animated.View style={[styles.bellPulse, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]} />
          <Animated.View style={[styles.bell, { transform: [{ translateY: bellTranslateY }, { rotate: bellRotate }] }]}>
            <MaterialIcons name="notifications-none" size={46} color={colors.onPrimary} />
          </Animated.View>
        </View>

        <Text style={styles.title}>Ne manquez aucune alerte importante</Text>
        <Text style={styles.copy}>Restez connecté à vos cultures et optimisez votre consommation d'eau en temps réel.</Text>

        <View style={styles.cards}>
          {alertExamples.map((item) => (
            <AnimatedAlertCard key={item.title} {...item} />
          ))}
        </View>

        <HoverButton label="Activer les notifications" onPress={() => navigation.navigate("WelcomeSuccess")} />

        <Pressable onPress={() => navigation.navigate("WelcomeSuccess")} style={styles.laterButton}>
          <Text style={styles.laterText}>Plus tard</Text>
        </Pressable>

        <View style={styles.dots}>
          {[0, 1, 2, 3].map((item) => <View key={item} style={styles.dot} />)}
          <View style={styles.dotActive} />
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

function AnimatedAlertCard({
  title,
  text,
  image,
  icon,
  iconColor,
  iconBg,
}: {
  title: string;
  text: string;
  image: string;
  icon: IconName;
  iconColor: string;
  iconBg: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const setHover = (hovered: boolean) => {
    Animated.spring(scale, {
      toValue: hovered ? 1.045 : 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 7,
    }).start();
  };

  return (
    <Pressable onHoverIn={() => setHover(true)} onHoverOut={() => setHover(false)}>
      <Animated.View style={[styles.alertCard, { transform: [{ scale }] }]}>
        <View style={styles.alertHeader}>
          <View style={[styles.alertIcon, { backgroundColor: iconBg }]}>
            <MaterialIcons name={icon} size={25} color={iconColor} />
          </View>
          <View style={styles.alertTextWrap}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertCopy}>{text}</Text>
          </View>
        </View>
        <Image source={{ uri: image }} style={styles.alertImage} />
      </Animated.View>
    </Pressable>
  );
}

function HoverButton({ label, onPress }: { label: string; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const setHover = (hovered: boolean) => {
    Animated.spring(scale, {
      toValue: hovered ? 1.04 : 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onHoverIn={() => setHover(true)} onHoverOut={() => setHover(false)}>
      <Animated.View style={[styles.cta, { transform: [{ scale }] }]}>
        <Text style={styles.ctaText}>{label}</Text>
        <MaterialIcons name="arrow-forward" size={25} color={colors.primary} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.surface },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(96,56,12,0.78)" },
  bottomShade: { position: "absolute", left: 0, right: 0, bottom: 0, height: "48%", backgroundColor: "rgba(105,30,0,0.72)" },
  scroll: { flexGrow: 1, alignItems: "center" },
  content: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: spacing.mobile + 2,
    paddingTop: 24,
    paddingBottom: 34,
  },
  topBar: { height: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  backButton: { width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: radius.full },
  progressPill: { width: 30, height: 8, borderRadius: 4, backgroundColor: colors.onPrimary },
  topSpacer: { width: 48 },
  bellArea: { alignSelf: "center", width: 106, height: 106, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  bellPulse: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.28)" },
  bell: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.20)",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { ...type.h1Mobile, fontSize: 30, lineHeight: 38, fontFamily: fonts.heading, color: colors.onPrimary, textAlign: "center" },
  copy: { ...type.body, fontFamily: fonts.body, color: "rgba(255,255,255,0.93)", textAlign: "center", marginTop: 14, marginBottom: 30, paddingHorizontal: 12 },
  cards: { gap: 20, marginBottom: 28 },
  alertCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 20,
    padding: 16,
    ...shadow.lift,
  },
  alertHeader: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  alertIcon: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  alertTextWrap: { flex: 1 },
  alertTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  alertCopy: { ...type.body, fontSize: 14, lineHeight: 20, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  alertImage: { width: "100%", height: 80, borderRadius: 12 },
  cta: {
    width: "82%",
    minHeight: 70,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    ...shadow.lift,
  },
  ctaText: { ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  laterButton: { alignSelf: "center", paddingVertical: 18, paddingHorizontal: 22 },
  laterText: { ...type.body, fontFamily: fonts.body, color: colors.onPrimary, textDecorationLine: "underline" },
  dots: { flexDirection: "row", gap: 9, justifyContent: "center", alignItems: "center", marginTop: 4 },
  dot: { width: 13, height: 13, borderRadius: 7, backgroundColor: "rgba(255,255,255,0.32)" },
  dotActive: { width: 40, height: 13, borderRadius: 7, backgroundColor: colors.secondaryContainer },
});
