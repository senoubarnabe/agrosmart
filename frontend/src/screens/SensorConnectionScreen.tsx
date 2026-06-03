import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { pairingSensors, images } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SensorConnection">;

export function SensorConnectionScreen({ navigation }: Props) {
  const [pairedIds, setPairedIds] = useState(() => new Set(pairingSensors.filter((sensor) => sensor.paired).map((sensor) => sensor.id)));
  const pulseA = useRef(new Animated.Value(0)).current;
  const pulseB = useRef(new Animated.Value(0)).current;
  const pulseC = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  const connectedCount = pairedIds.size;
  const pairingActive = connectedCount < pairingSensors.length;

  useEffect(() => {
    const pulse = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, { toValue: 1, duration: 1600, useNativeDriver: true }),
          Animated.timing(value, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ).start();

    pulse(pulseA, 0);
    pulse(pulseB, 520);
    pulse(pulseC, 1040);

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    ).start();
  }, [float, pulseA, pulseB, pulseC]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPairedIds((prev) => new Set([...prev, "humidity"])), 1100),
      setTimeout(() => setPairedIds((prev) => new Set([...prev, "sun"])), 2300),
      setTimeout(() => setPairedIds((prev) => new Set([...prev, "flow"])), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const buttonLabel = useMemo(
    () => (pairingActive ? `Recherche en cours... (${connectedCount}/6)` : "Tout est connecté - Continuer"),
    [connectedCount, pairingActive],
  );

  return (
    <ImageBackground source={{ uri: images.splash }} style={styles.bg} blurRadius={12}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <View style={styles.topBar}>
              <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
              </Pressable>
              <View style={styles.progress}>
                {[0, 1, 2, 3].map((item) => (
                  <View key={item} style={[styles.progressDot, item === 2 && styles.progressActive]} />
                ))}
              </View>
              <View style={styles.topSpacer} />
            </View>

            <Text style={styles.title}>Connectons vos capteurs 📡</Text>
            <Text style={styles.copy}>Votre système est prêt à surveiller votre champ en temps réel.</Text>

            <View style={styles.radar}>
              <View style={styles.gridTint} />
              <View style={styles.signalLineLeft} />
              <View style={styles.signalLineRight} />
              <View style={styles.signalLineBottom} />

              <Animated.View style={[styles.pulseRing, pulseStyle(pulseA)]} />
              <Animated.View style={[styles.pulseRing, pulseStyle(pulseB)]} />
              <Animated.View style={[styles.pulseRing, pulseStyle(pulseC)]} />

              <View style={styles.phoneHub}>
                <MaterialIcons name="smartphone" size={42} color={colors.secondaryContainer} />
              </View>

              <Animated.View style={[styles.floatIconOne, floatStyle(float)]}>
                <MaterialIcons name="sensors" size={26} color={colors.primaryContainer} />
              </Animated.View>
              <Animated.View style={[styles.floatIconTwo, floatStyle(float, true)]}>
                <MaterialIcons name="water-drop" size={24} color={colors.primaryContainer} />
              </Animated.View>
              <Animated.View style={[styles.floatIconThree, floatStyle(float)]}>
                <MaterialIcons name="wb-sunny" size={26} color={colors.secondaryContainer} />
              </Animated.View>
            </View>

            <View style={styles.grid}>
              {pairingSensors.map((sensor) => {
                const paired = pairedIds.has(sensor.id);
                return (
                  <View key={sensor.id} style={[styles.sensorCard, !paired && styles.sensorPending]}>
                    <View style={[styles.sensorIcon, { backgroundColor: `${sensor.tone}18` }]}>
                      <MaterialIcons name={sensor.icon} size={24} color={sensor.tone} />
                    </View>
                    <Text style={styles.sensorLabel}>{sensor.label}</Text>
                    <View style={[styles.status, paired ? styles.statusOk : styles.statusSync]}>
                      <MaterialIcons name={paired ? "check-circle" : "sync"} size={11} color={paired ? "#047857" : colors.outline} />
                      <Text style={[styles.statusText, paired && styles.statusTextOk]}>{paired ? "OK" : "Sync"}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <AppButton
              label={buttonLabel}
              icon={pairingActive ? "sync" : "arrow-forward"}
              onPress={() => {
                if (!pairingActive) navigation.navigate("WelcomeSuccess");
              }}
              style={pairingActive ? styles.buttonWaiting : styles.button}
            />
          </View>

          <Text style={styles.step}>Étape 4 sur 5</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

function pulseStyle(value: Animated.Value) {
  return {
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
    transform: [{ scale: value.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1.9] }) }],
  };
}

function floatStyle(value: Animated.Value, reverse = false) {
  return {
    transform: [
      {
        translateY: value.interpolate({ inputRange: [0, 1], outputRange: reverse ? [4, -5] : [-4, 5] }),
      },
    ],
  };
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(247,251,241,0.88)" },
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: spacing.mobile },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}44`,
    ...shadow.lift,
  },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  backButton: { width: 42, height: 42, borderRadius: radius.full, alignItems: "center", justifyContent: "center" },
  progress: { flex: 1, flexDirection: "row", gap: 6, justifyContent: "center", paddingHorizontal: 14 },
  progressDot: { width: 24, height: 7, borderRadius: 4, backgroundColor: `${colors.primaryFixed}66` },
  progressActive: { backgroundColor: colors.primary },
  topSpacer: { width: 42 },
  title: { ...type.h2, fontFamily: fonts.heading, color: colors.primary, textAlign: "center" },
  copy: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center", marginTop: 6, marginBottom: 16 },
  radar: {
    height: 150,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  gridTint: { ...StyleSheet.absoluteFillObject, backgroundColor: `${colors.primaryFixed}1f` },
  signalLineLeft: { position: "absolute", width: 104, height: 2, backgroundColor: colors.primaryFixed, transform: [{ rotate: "-24deg" }], left: 68, top: 58, opacity: 0.75 },
  signalLineRight: { position: "absolute", width: 112, height: 2, backgroundColor: colors.primaryFixed, transform: [{ rotate: "18deg" }], right: 62, top: 68, opacity: 0.75 },
  signalLineBottom: { position: "absolute", width: 78, height: 2, backgroundColor: colors.primaryFixed, transform: [{ rotate: "88deg" }], bottom: 35, opacity: 0.75 },
  pulseRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primaryFixedDim,
    backgroundColor: `${colors.primaryFixed}22`,
  },
  phoneHub: { width: 64, height: 64, borderRadius: 18, backgroundColor: colors.surfaceContainerLowest, alignItems: "center", justifyContent: "center", ...shadow.card },
  floatIconOne: { position: "absolute", left: 86, top: 38 },
  floatIconTwo: { position: "absolute", right: 95, bottom: 38 },
  floatIconThree: { position: "absolute", right: 48, top: 70 },
  grid: { flexDirection: "row", flexWrap: "wrap", columnGap: 10, rowGap: 10, marginBottom: 20 },
  sensorCard: {
    width: "30.9%",
    minHeight: 100,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: `${colors.primary}35`,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    ...shadow.card,
  },
  sensorPending: { opacity: 0.72, transform: [{ scale: 0.96 }] },
  sensorIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  sensorLabel: { fontSize: 10, lineHeight: 14, fontWeight: "900", fontFamily: fonts.body, color: colors.onSurface, textTransform: "uppercase" },
  status: { flexDirection: "row", gap: 4, alignItems: "center", borderRadius: radius.full, paddingHorizontal: 7, paddingVertical: 3, marginTop: 6 },
  statusOk: { backgroundColor: "#d1fae5" },
  statusSync: { backgroundColor: colors.surfaceContainer },
  statusText: { fontSize: 8, lineHeight: 10, fontWeight: "900", fontFamily: fonts.body, color: colors.outline, textTransform: "uppercase" },
  statusTextOk: { color: "#065f46" },
  button: { minHeight: 54 },
  buttonWaiting: { minHeight: 54, backgroundColor: colors.primaryFixedDim },
  step: { ...type.labelSm, fontFamily: fonts.body, textAlign: "center", color: colors.outline, marginTop: 14, textTransform: "uppercase" },
});
