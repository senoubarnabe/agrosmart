import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "HarvestForecast">;

const maturityImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD13rgSAnTtO2XA8OJOUxbbN6zf_iMxlQXideJPDV4Ed7wvzL-L3MYaFSAYP_oqJSiHLh-B3vIVQRMzQiK36CiukTKs-Bx2ddon5Pn7rKe_fI8hIy7ADUogGmWl_ZDdaUfT2oxlZwhDEIdJK20WrI9fM3WA31ZbGhb2sIXzhdSAAiTOi-HScPEr5tsSeks1jJNxKJXkz2lY1bQArQDPRwDCB0q3Meeh1JvpKrCtDz2_NMJ63JIwQp0Z62NNQfVm6EA5pNKN3oPF7hW-";

export function HarvestForecastScreen({ navigation }: Props) {
  const { profileImage } = useOnboarding();

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={10}>
          <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Prévisions de Récolte
        </Text>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Temps Restant Estimé</Text>
        <View style={styles.daysRow}>
          <Text style={styles.daysNumber}>14</Text>
          <Text style={styles.daysText}>Jours</Text>
        </View>
        <View style={styles.heroProgressTrack}>
          <View style={styles.heroProgressFill} />
        </View>
        <Text style={styles.heroCopy}>
          Prévu pour le <Text style={styles.heroDate}>12 Octobre 2023</Text>
        </Text>
      </View>

      <View style={styles.yieldCard}>
        <View style={styles.cardTitleRow}>
          <View style={styles.smallIconWarm}>
            <MaterialIcons name="analytics" size={22} color={colors.secondary} />
          </View>
          <Text style={styles.cardLabel}>Rendement Estimé</Text>
        </View>
        <View style={styles.gaugeWrap}>
          <Svg width={184} height={184} viewBox="0 0 184 184">
            <Circle cx="92" cy="92" r="80" stroke={colors.surfaceContainerHighest} strokeWidth="12" fill="transparent" />
            <Circle
              cx="92"
              cy="92"
              r="80"
              stroke={colors.secondaryContainer}
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * 0.2}`}
              rotation="-90"
              origin="92, 92"
            />
          </Svg>
          <View style={styles.gaugeCenter}>
            <Text style={styles.yieldValue}>4.2</Text>
            <Text style={styles.yieldUnit}>Tonnes / Hectare</Text>
          </View>
        </View>
        <View style={styles.yieldFooter}>
          <View style={styles.yieldCell}>
            <Text style={styles.mutedLabel}>Minimum</Text>
            <Text style={styles.yieldSmall}>3.8 t</Text>
          </View>
          <View style={[styles.yieldCell, styles.yieldCellRight]}>
            <Text style={styles.mutedLabel}>Optimiste</Text>
            <Text style={styles.yieldSmallGreen}>4.5 t</Text>
          </View>
        </View>
      </View>

      <View style={styles.factorStack}>
        <FactorCard icon="thermostat" label="Température" value="Stable (28°C)" tone={colors.tertiary} bg={colors.tertiaryFixed} />
        <FactorCard icon="water-drop" label="Humidité Sol" value="Basse (12%)" tone={colors.error} bg={colors.errorContainer} alert />
        <FactorCard icon="light-mode" label="Ensoleillement" value="Optimal" tone={colors.primary} bg={colors.primaryFixed} />
      </View>

      <View style={styles.sectionTitleRow}>
        <MaterialIcons name="psychology" size={24} color={colors.primary} />
        <Text style={styles.sectionTitle}>Conseils Phase Finale</Text>
      </View>
      <TipCard icon="watch-off" title="Réduction de l'irrigation" text="Réduisez l'apport d'eau de 30% dès demain pour favoriser la concentration des nutriments et le séchage naturel." />
      <TipCard icon="precision-manufacturing" title="Inspection du matériel" text="Préparez vos outils de récolte. Un nettoyage préventif évite les contaminations fongiques tardives." warm />
      <TipCard icon="shopping-basket" title="Planification Logistique" text="Contactez vos transporteurs pour la semaine du 12 Octobre. Les prix sont stables actuellement." terracotta />

      <ImageBackground source={{ uri: maturityImage }} style={styles.visualCard} imageStyle={styles.visualImage}>
        <View style={styles.visualShade} />
        <View style={styles.visualCopy}>
          <Text style={styles.visualLabel}>Observation Terrain</Text>
          <Text style={styles.visualTitle}>Visualiser la maturité actuelle</Text>
        </View>
      </ImageBackground>

      <Text style={styles.updateText}>Mise à jour il y a 12 minutes • ID Capteur #AS-9823</Text>
    </Screen>
  );
}

function FactorCard({ icon, label, value, tone, bg, alert }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; tone: string; bg: string; alert?: boolean }) {
  return (
    <View style={[styles.factorCard, alert && styles.factorAlert]}>
      <View style={[styles.factorIcon, { backgroundColor: bg }]}>
        <MaterialIcons name={icon} size={24} color={tone} />
      </View>
      <View style={styles.factorText}>
        <Text style={[styles.factorLabel, alert && { color: colors.error }]}>{label}</Text>
        <Text style={styles.factorValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function TipCard({ icon, title, text, warm, terracotta }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; text: string; warm?: boolean; terracotta?: boolean }) {
  const bg = warm ? colors.secondaryFixed : terracotta ? colors.tertiaryFixed : colors.primaryFixed;
  const tone = warm ? colors.onSecondaryFixed : terracotta ? colors.onTertiaryFixed : colors.onPrimaryFixed;
  return (
    <View style={styles.tipCard}>
      <View style={[styles.tipIcon, { backgroundColor: bg }]}>
        <MaterialIcons name={icon} size={21} color={tone} />
      </View>
      <View style={styles.tipText}>
        <Text style={styles.tipTitle}>{title}</Text>
        <Text style={styles.tipBody}>{text}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0 },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: spacing.mobile,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}60`,
  },
  backButton: { width: 34, height: 34, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  avatar: { width: 40, height: 40, borderRadius: radius.full, borderWidth: 2, borderColor: colors.primaryFixed },
  heroCard: {
    margin: spacing.mobile,
    marginBottom: 0,
    borderRadius: radius.card,
    backgroundColor: colors.primaryContainer,
    padding: spacing.stackMd,
    alignItems: "center",
    overflow: "hidden",
    ...shadow.lift,
  },
  heroLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryContainer, textTransform: "uppercase", letterSpacing: 0.8 },
  daysRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginVertical: 10 },
  daysNumber: { fontSize: 54, lineHeight: 62, fontWeight: "800", fontFamily: fonts.heading, color: colors.onPrimary },
  daysText: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimaryContainer },
  heroProgressTrack: { width: "100%", height: 12, borderRadius: radius.full, backgroundColor: "rgba(0,0,0,0.22)", overflow: "hidden", marginBottom: 12 },
  heroProgressFill: { width: "85%", height: "100%", borderRadius: radius.full, backgroundColor: colors.primaryFixed },
  heroCopy: { ...type.body, fontFamily: fonts.body, color: colors.onPrimaryContainer, textAlign: "center" },
  heroDate: { fontWeight: "800", color: colors.onPrimary },
  yieldCard: {
    marginHorizontal: spacing.mobile,
    marginTop: spacing.stackMd,
    borderRadius: radius.card,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}80`,
    padding: spacing.stackMd,
    alignItems: "center",
    ...shadow.card,
  },
  cardTitleRow: { alignSelf: "stretch", flexDirection: "row", alignItems: "center", gap: 10 },
  smallIconWarm: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.secondaryFixed, alignItems: "center", justifyContent: "center" },
  cardLabel: { ...type.label, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
  gaugeWrap: { width: 184, height: 184, marginVertical: 16, alignItems: "center", justifyContent: "center" },
  gaugeCenter: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
  yieldValue: { fontSize: 48, lineHeight: 54, fontWeight: "800", fontFamily: fonts.heading, color: colors.primary },
  yieldUnit: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textAlign: "center" },
  yieldFooter: { alignSelf: "stretch", flexDirection: "row", borderTopWidth: 1, borderTopColor: colors.outlineVariant, paddingTop: 14 },
  yieldCell: { flex: 1, alignItems: "center" },
  yieldCellRight: { borderLeftWidth: 1, borderLeftColor: colors.outlineVariant },
  mutedLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
  yieldSmall: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  yieldSmallGreen: { ...type.h2, fontFamily: fonts.heading, color: colors.primary },
  factorStack: { gap: 12, marginHorizontal: spacing.mobile, marginTop: spacing.stackMd },
  factorCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: radius.card,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}80`,
    padding: 14,
    ...shadow.card,
  },
  factorAlert: { borderLeftWidth: 4, borderLeftColor: colors.error },
  factorIcon: { width: 50, height: 50, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  factorText: { flex: 1, minWidth: 0 },
  factorLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  factorValue: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: spacing.mobile, marginTop: spacing.stackMd, marginBottom: spacing.stackSm },
  sectionTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  tipCard: {
    marginHorizontal: spacing.mobile,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 14,
    ...shadow.card,
  },
  tipIcon: { width: 40, height: 40, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  tipText: { flex: 1, minWidth: 0 },
  tipTitle: { ...type.label, fontFamily: fonts.heading, color: colors.onSurface },
  tipBody: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  visualCard: { height: 192, marginHorizontal: spacing.mobile, marginTop: spacing.stackMd, borderRadius: radius.card, overflow: "hidden", justifyContent: "flex-end" },
  visualImage: { borderRadius: radius.card },
  visualShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,69,13,0.5)" },
  visualCopy: { padding: 18 },
  visualLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.primaryFixed, textTransform: "uppercase", letterSpacing: 0.6 },
  visualTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimary, marginTop: 4 },
  updateText: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline, textAlign: "center", marginTop: spacing.stackMd, marginHorizontal: spacing.mobile },
});
