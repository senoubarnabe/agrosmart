import { MaterialIcons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { MainTabParamList, RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, "Alerts">, NativeStackScreenProps<RootStackParamList>>;

const adviceImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5BRKpbA-VIeMUATtTJf11n7i73LBI2e1llfLFkaSg8OyBeQHnCRzGhLb0N5Q1DZbVTSKcvPTuxMvfQwcXAddf200vO8woDjXfgepEUMbw_ElhPI8v2OKESmgkntEuLsvr2dQrl7MPXZ8oxKZPnvVyignUokt_A0Dorff1dE_w93H3Wib4xQSRhmvxLHq46i6WT7mgcb3Xb9asH-G3MCyijAPQU9DRGDVnWW1I71j9sBW1PXMXUbZBVazd8uiOrwSdVbxZlodu7dDm";

export function AlertsScreen({ navigation }: Props) {
  const [showReservoir, setShowReservoir] = useState(true);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Screen>
      <AppHeader />
      <View style={styles.heading}>
        <Text style={styles.title}>Alertes 🔔</Text>
        <Text style={styles.copy}>Surveillez l'état de vos parcelles en temps réel.</Text>
      </View>

      <View style={[styles.alertCard, styles.dangerCard]}>
        <View style={styles.alertHeader}>
          <View style={styles.alertTitleGroup}>
            <Animated.View
              style={[
                styles.iconCircle,
                styles.dangerIcon,
                {
                  transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }],
                  opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }),
                },
              ]}
            >
              <MaterialIcons name="water-drop" size={26} color={colors.error} />
            </Animated.View>
            <View style={styles.alertTitleText}>
              <Text style={[styles.alertTitle, { color: colors.error }]}>Sol trop sec</Text>
              <Text style={styles.meta}>Parcelle Nord • Il y a 5 min</Text>
            </View>
          </View>
          <View style={styles.urgentPill}>
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        </View>
        <Text style={styles.message}>
          L'humidité du sol est tombée à 12%, ce qui est inférieur au seuil critique pour votre culture de maïs.
        </Text>
        <Pressable onPress={() => navigation.navigate("WateringActive", { cultureName: "Maïs doux" })} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}>
          <MaterialIcons name="bolt" size={20} color={colors.onPrimary} />
          <Text style={styles.primaryActionText}>Arroser maintenant</Text>
        </Pressable>
      </View>

      {showReservoir ? (
        <View style={[styles.alertCard, styles.warningCard]}>
          <View style={styles.alertHeader}>
            <View style={styles.alertTitleGroup}>
              <View style={[styles.iconCircle, styles.warningIcon]}>
                <MaterialIcons name="propane-tank" size={26} color={colors.secondary} />
              </View>
              <View style={styles.alertTitleText}>
                <Text style={[styles.alertTitle, { color: colors.secondary }]}>Réservoir à 20%</Text>
                <Text style={styles.meta}>Source A • Il y a 2 heures</Text>
              </View>
            </View>
          </View>
          <Text style={styles.message}>
            Le niveau d'eau dans votre réservoir principal est bas. Prévoyez un remplissage pour maintenir les cycles d'irrigation.
          </Text>
          <Pressable onPress={() => setShowReservoir(false)} style={({ pressed }) => [styles.outlineAction, pressed && styles.pressed]}>
            <Text style={styles.outlineActionText}>J'ai compris</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={[styles.alertCard, styles.successCard]}>
        <View style={styles.alertHeader}>
          <View style={styles.alertTitleGroup}>
            <View style={[styles.iconCircle, styles.successIcon]}>
              <MaterialIcons name="check-circle" size={27} color={colors.primary} />
            </View>
            <View style={styles.alertTitleText}>
              <Text style={[styles.alertTitle, { color: colors.primary }]}>Arrosage automatique effectué</Text>
              <Text style={styles.meta}>Parcelle Est • Ce matin, 06:15</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsBox}>
          <View style={[styles.statCell, styles.statDivider]}>
            <Text style={styles.statLabel}>Durée</Text>
            <Text style={styles.statValue}>45 min</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>1200L</Text>
          </View>
        </View>
      </View>

      <ImageBackground source={{ uri: adviceImage }} style={styles.adviceCard} imageStyle={styles.adviceImage}>
        <View style={styles.adviceShade} />
        <View style={styles.adviceCopy}>
          <Text style={styles.adviceLabel}>Conseil Expert</Text>
          <Text style={styles.adviceText}>L'arrosage matinal réduit l'évaporation de 30%.</Text>
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { marginBottom: spacing.stackMd },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  alertCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    borderLeftWidth: 8,
    padding: spacing.stackMd,
    marginBottom: spacing.gutter,
    overflow: "hidden",
    ...shadow.card,
  },
  dangerCard: { borderLeftColor: colors.error, shadowColor: colors.error },
  warningCard: { borderLeftColor: colors.secondary, shadowColor: colors.secondary },
  successCard: { borderLeftColor: colors.onPrimaryFixedVariant },
  alertHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  alertTitleGroup: { flex: 1, minWidth: 0, flexDirection: "row", gap: spacing.stackSm, alignItems: "flex-start" },
  iconCircle: { width: 50, height: 50, borderRadius: radius.full, alignItems: "center", justifyContent: "center" },
  dangerIcon: { backgroundColor: colors.errorContainer },
  warningIcon: { backgroundColor: colors.secondaryFixed },
  successIcon: { backgroundColor: colors.primaryFixed },
  alertTitleText: { flex: 1, minWidth: 0 },
  alertTitle: { ...type.h2, fontFamily: fonts.heading },
  meta: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline, marginTop: 2 },
  urgentPill: { borderRadius: radius.full, backgroundColor: colors.error, paddingHorizontal: 10, paddingVertical: 5 },
  urgentText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onError },
  message: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: spacing.gutter },
  primaryAction: {
    minHeight: 56,
    marginTop: spacing.stackSm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: spacing.stackMd,
    ...shadow.card,
  },
  primaryActionText: { ...type.label, fontFamily: fonts.body, color: colors.onPrimary },
  outlineAction: {
    minHeight: 56,
    alignSelf: "flex-start",
    marginTop: spacing.stackSm,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingHorizontal: spacing.stackLg,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineActionText: { ...type.label, fontFamily: fonts.body, color: colors.secondary },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  statsBox: { flexDirection: "row", alignItems: "center", borderRadius: radius.md, backgroundColor: colors.surfaceContainer, padding: spacing.base, marginTop: spacing.stackSm },
  statCell: { flex: 1, alignItems: "center", paddingVertical: 8 },
  statDivider: { borderRightWidth: 1, borderRightColor: colors.outlineVariant },
  statLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline, textTransform: "uppercase", letterSpacing: 0.6 },
  statValue: { ...type.h2, fontFamily: fonts.heading, color: colors.primary, marginTop: 3 },
  adviceCard: { height: 192, borderRadius: radius.card, overflow: "hidden", justifyContent: "flex-end", marginTop: spacing.stackMd },
  adviceImage: { borderRadius: radius.card },
  adviceShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.46)" },
  adviceCopy: { padding: spacing.stackMd },
  adviceLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.secondaryFixed, textTransform: "uppercase", letterSpacing: 0.8 },
  adviceText: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimary, marginTop: 4 },
});
