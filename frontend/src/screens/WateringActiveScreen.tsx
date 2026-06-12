import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "WateringActive">;

export function WateringActiveScreen({ navigation, route }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(522);
  const [volume, setVolume] = useState(124.5);
  const pulse = useRef(new Animated.Value(0)).current;
  const fall = useRef(new Animated.Value(0)).current;
  const cultureName = route.params?.cultureName ?? "Tomates";

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
      setVolume((value) => value + 0.25);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    );
    const fallLoop = Animated.loop(Animated.timing(fall, { toValue: 1, duration: 1550, useNativeDriver: true }));
    pulseLoop.start();
    fallLoop.start();
    return () => {
      pulseLoop.stop();
      fallLoop.stop();
    };
  }, [fall, pulse]);

  const displayTime = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [secondsLeft]);

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={26} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Arrosage en cours
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        <View style={styles.mainCard}>
          <View style={styles.waveWrap}>
            <Svg width="100%" height="96" viewBox="0 0 240 56" preserveAspectRatio="none">
              <Path
                d="M0 0c3 0 6 1 8 2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2s6-1 8-2a18 18 0 0 1 16 0c2 1 5 2 8 2v56H0V0z"
                fill={colors.primary}
                opacity={0.08}
              />
            </Svg>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.statusBadge}>
              <Animated.View style={[styles.statusDot, { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }) }]} />
              <Text style={styles.statusText} numberOfLines={1}>
                Vanne active - Secteur 04
              </Text>
            </View>

            <Animated.View
              style={[
                styles.dropHalo,
                { transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1.04] }) }] },
              ]}
            >
              <MaterialIcons name="water-drop" size={70} color={colors.primary} />
              <Animated.View
                style={[
                  styles.dropSmallRight,
                  {
                    opacity: fall.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, 0.8, 0] }),
                    transform: [{ translateY: fall.interpolate({ inputRange: [0, 1], outputRange: [-16, 34] }) }],
                  },
                ]}
              >
                <MaterialIcons name="water-drop" size={22} color={`${colors.primary}80`} />
              </Animated.View>
              <Animated.View
                style={[
                  styles.dropSmallLeft,
                  {
                    opacity: fall.interpolate({ inputRange: [0, 0.55, 1], outputRange: [0.4, 0.8, 0] }),
                    transform: [{ translateY: fall.interpolate({ inputRange: [0, 1], outputRange: [-8, 28] }) }],
                  },
                ]}
              >
                <MaterialIcons name="water-drop" size={20} color={`${colors.primary}60`} />
              </Animated.View>
            </Animated.View>

            <View style={styles.timerBlock}>
              <Text style={styles.timerLabel}>Temps Restant</Text>
              <Text style={styles.timerValue}>{displayTime}</Text>
            </View>

            <View style={styles.metricGrid}>
              <MetricBox icon="opacity" label="Volume livré" value={`${Math.floor(volume)} L`} />
              <MetricBox icon="speed" label="Débit actuel" value="15 L/min" />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="info" size={24} color={colors.secondary} />
          </View>
          <View style={styles.infoCopy}>
            <Text style={styles.infoTitle} numberOfLines={1}>
              Culture : {cultureName} (Nord)
            </Text>
            <Text style={styles.infoText}>
              Le cycle s'arrêtera automatiquement une fois l'objectif de 250L atteint pour maintenir une humidité de sol optimale.
            </Text>
          </View>
        </View>

        <View style={styles.stopWrap}>
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.stopButton, pressed && styles.stopButtonPressed]}>
            <MaterialIcons name="stop-circle" size={24} color={colors.onError} />
            <Text style={styles.stopText}>Arrêter l'arrosage</Text>
          </Pressable>
          <Text style={styles.stopHint}>L'arrêt d'urgence fermera immédiatement toutes les vannes.</Text>
        </View>
      </View>
    </Screen>
  );
}

function MetricBox({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.metricBox}>
      <MaterialIcons name={icon} size={24} color={colors.primary} />
      <Text style={styles.metricLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.metricValue} numberOfLines={1}>
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
    paddingHorizontal: spacing.mobile,
    backgroundColor: colors.surface,
  },
  headerButton: { width: 48, height: 48, borderRadius: radius.full, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  headerSpacer: { width: 48, height: 48 },
  body: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.stackMd,
    paddingHorizontal: spacing.mobile,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackLg,
  },
  mainCard: {
    minHeight: 440,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: "hidden",
    position: "relative",
    ...shadow.lift,
  },
  waveWrap: { position: "absolute", left: 0, right: 0, bottom: 0, height: 150, justifyContent: "flex-end" },
  cardContent: { padding: spacing.mobile, alignItems: "center" },
  statusBadge: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: spacing.stackMd,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.secondary },
  statusText: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, textTransform: "uppercase", letterSpacing: 0.6, flexShrink: 1 },
  dropHalo: {
    width: 132,
    height: 132,
    borderRadius: radius.full,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: spacing.stackMd,
  },
  dropSmallRight: { position: "absolute", top: 12, right: 18 },
  dropSmallLeft: { position: "absolute", top: 42, left: 12 },
  timerBlock: { alignItems: "center", marginBottom: spacing.stackMd },
  timerLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.9 },
  timerValue: { fontSize: 56, lineHeight: 64, fontWeight: "800", fontFamily: fonts.heading, color: colors.onSurface },
  metricGrid: { width: "100%", flexDirection: "row", gap: 12 },
  metricBox: {
    flex: 1,
    minWidth: 0,
    minHeight: 116,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 12,
  },
  metricLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 8, textAlign: "center" },
  metricValue: { ...type.h2, fontFamily: fonts.heading, color: colors.primary, marginTop: 4, textAlign: "center" },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
    ...shadow.card,
  },
  infoIcon: { width: 48, height: 48, borderRadius: radius.full, backgroundColor: colors.secondaryFixed, alignItems: "center", justifyContent: "center" },
  infoCopy: { flex: 1, minWidth: 0 },
  infoTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  infoText: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  stopWrap: { paddingTop: spacing.stackSm },
  stopButton: {
    minHeight: 58,
    borderRadius: radius.full,
    backgroundColor: colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...shadow.lift,
  },
  stopButtonPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  stopText: { ...type.bodyLg, fontFamily: fonts.heading, color: colors.onError },
  stopHint: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 12 },
});
