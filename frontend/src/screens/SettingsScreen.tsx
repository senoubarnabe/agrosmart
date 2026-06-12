import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";

type IconName = keyof typeof MaterialIcons.glyphMap;

const accountRows = [
  { icon: "badge" as IconName, title: "Informations personnelles" },
  { icon: "security" as IconName, title: "Sécurité" },
  { icon: "language" as IconName, title: "Langue", detail: "Français, Fon, Yoruba" },
];

const supportRows = [
  { icon: "help" as IconName, title: "Aide & Support" },
  { icon: "info" as IconName, title: "À propos d'AgroSmart" },
];

export function SettingsScreen() {
  const { firstName, city, profileImage } = useOnboarding();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(false);

  const displayName = firstName || "Koffi";

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.headerBand}>
        <AppHeader title="Paramètres" back />
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profilePhotoWrap}>
            <Image source={{ uri: profileImage }} style={styles.profilePhoto} />
            <Pressable style={styles.editButton}>
              <MaterialIcons name="edit" size={20} color={colors.onPrimary} />
            </Pressable>
          </View>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.82} style={styles.phone}>
            +229 90 00 00 00{city ? ` · ${city}` : ""}
          </Text>
          <Pressable style={styles.profileButton}>
            <MaterialIcons name="person" size={20} color={colors.onPrimary} />
            <Text style={styles.profileButtonText}>Modifier le profil</Text>
          </Pressable>
        </View>

        <SettingsSection title="Compte">
          {accountRows.map((row) => (
            <SettingsRow key={row.title} icon={row.icon} title={row.title} detail={row.detail} tone="primary" />
          ))}
        </SettingsSection>

        <SettingsSection title="Préférences App">
          <ToggleRow
            icon="notifications-active"
            title="Notifications push"
            enabled={pushEnabled}
            onPress={() => setPushEnabled((value) => !value)}
          />
          <ToggleRow
            icon="psychology"
            title="Mode automatique (IA)"
            detail="Optimisation intelligente"
            enabled={aiEnabled}
            onPress={() => setAiEnabled((value) => !value)}
          />
          <SettingsRow icon="straighten" title="Unités" detail="m² / hectares (ha)" tone="secondary" trailing="expand-more" />
        </SettingsSection>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Équipement & IoT</Text>
          <View style={styles.iotGrid}>
            <View style={styles.iotCard}>
              <View style={styles.iotIcon}>
                <MaterialIcons name="sensors" size={28} color={colors.primary} />
              </View>
              <Text style={styles.iotTitle}>Gérer mes capteurs</Text>
              <Text style={styles.iotDetail}>3 capteurs actifs</Text>
            </View>
            <View style={styles.iotCard}>
              <View style={styles.iotIcon}>
                <MaterialIcons name="water" size={28} color={colors.primary} />
              </View>
              <Text style={styles.iotTitle}>État de la pompe</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Fonctionnement optimal</Text>
              </View>
            </View>
            <View style={styles.networkCard}>
              <View style={styles.networkLeft}>
                <View style={styles.smallCircle}>
                  <MaterialIcons name="router" size={22} color={colors.primary} />
                </View>
                <Text style={styles.networkTitle}>Configuration réseau</Text>
              </View>
              <Text style={styles.networkChip}>4G Connecté</Text>
            </View>
          </View>
        </View>

        <SettingsSection title="Assistance">
          {supportRows.map((row) => (
            <SettingsRow key={row.title} icon={row.icon} title={row.title} tone="muted" />
          ))}
          <Pressable style={[styles.row, styles.logoutRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.rowIcon, styles.logoutIcon]}>
                <MaterialIcons name="logout" size={22} color={colors.error} />
              </View>
              <Text style={styles.logoutText}>Déconnexion</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={22} color="rgba(186,26,26,0.55)" />
          </Pressable>
        </SettingsSection>

        <Text style={styles.version}>Version 2.4.0 (Build 892)</Text>
      </View>
    </Screen>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.list}>{children}</View>
    </View>
  );
}

function SettingsRow({
  icon,
  title,
  detail,
  tone,
  trailing = "chevron-right",
}: {
  icon: IconName;
  title: string;
  detail?: string;
  tone: "primary" | "secondary" | "muted";
  trailing?: IconName;
}) {
  const isSecondary = tone === "secondary";
  const isMuted = tone === "muted";
  return (
    <Pressable style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={[styles.rowIcon, isSecondary && styles.secondaryIcon, isMuted && styles.mutedIcon]}>
          <MaterialIcons name={icon} size={22} color={isSecondary ? colors.secondary : isMuted ? colors.onSurfaceVariant : colors.primary} />
        </View>
        <View style={styles.rowTextWrap}>
          <Text numberOfLines={2} style={styles.rowTitle}>{title}</Text>
          {detail ? <Text numberOfLines={1} style={[styles.rowDetail, isSecondary && styles.secondaryDetail]}>{detail}</Text> : null}
        </View>
      </View>
      <MaterialIcons name={trailing} size={24} color={colors.outline} />
    </Pressable>
  );
}

function ToggleRow({
  icon,
  title,
  detail,
  enabled,
  onPress,
}: {
  icon: IconName;
  title: string;
  detail?: string;
  enabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.secondaryIcon}>
          <MaterialIcons name={icon} size={22} color={colors.secondary} />
        </View>
        <View style={styles.rowTextWrap}>
          <Text numberOfLines={2} style={styles.rowTitle}>{title}</Text>
          {detail ? <Text numberOfLines={1} style={styles.secondaryDetail}>{detail}</Text> : null}
        </View>
      </View>
      <View style={[styles.switchTrack, enabled && styles.switchTrackOn]}>
        <View style={[styles.switchThumb, enabled && styles.switchThumbOn]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0 },
  headerBand: {
    paddingHorizontal: spacing.mobile,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,69,13,0.08)",
    backgroundColor: colors.surface,
  },
  content: { paddingHorizontal: spacing.mobile, paddingTop: spacing.stackMd, width: "100%" },
  profileCard: {
    alignItems: "center",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(192,201,187,0.45)",
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.stackMd,
    ...shadow.card,
  },
  profilePhotoWrap: { width: 96, height: 96, marginBottom: spacing.stackSm },
  profilePhoto: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: colors.primaryFixed },
  editButton: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  profileName: { ...type.h2, fontFamily: fonts.heading, color: colors.onSurface },
  phone: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 2, marginBottom: spacing.stackMd, maxWidth: "100%" },
  profileButton: {
    minHeight: 52,
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  profileButtonText: { ...type.label, fontFamily: fonts.body, color: colors.onPrimary },
  section: { marginTop: spacing.stackMd },
  sectionTitle: {
    ...type.label,
    fontFamily: fonts.body,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.base,
    paddingHorizontal: 8,
  },
  list: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(192,201,187,0.45)",
    backgroundColor: colors.surfaceContainerLowest,
    overflow: "hidden",
  },
  row: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(192,201,187,0.22)",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, minWidth: 0, paddingRight: 8 },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(27,94,32,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,143,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  mutedIcon: { backgroundColor: colors.surfaceContainer },
  rowTextWrap: { flex: 1, minWidth: 0 },
  rowTitle: { ...type.h2, fontSize: 17, lineHeight: 23, fontFamily: fonts.heading, color: colors.onSurface, flexShrink: 1 },
  rowDetail: { ...type.labelSm, fontFamily: fonts.body, color: colors.primary, marginTop: 2, flexShrink: 1 },
  secondaryDetail: { ...type.labelSm, fontFamily: fonts.body, color: colors.secondary, marginTop: 2, flexShrink: 1 },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHighest,
    padding: 4,
    justifyContent: "center",
  },
  switchTrackOn: { backgroundColor: colors.primary },
  switchThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surfaceContainerLowest },
  switchThumbOn: { transform: [{ translateX: 20 }] },
  iotGrid: { gap: spacing.gutter },
  iotCard: {
    minHeight: 136,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(192,201,187,0.45)",
    backgroundColor: colors.surfaceContainerLowest,
    padding: 14,
    ...shadow.card,
  },
  iotIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(0,69,13,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.base,
  },
  iotTitle: { ...type.h2, fontSize: 18, lineHeight: 24, fontFamily: fonts.heading, color: colors.onSurface },
  iotDetail: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 4 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" },
  statusText: { ...type.labelSm, fontFamily: fonts.body, color: "#16a34a" },
  networkCard: {
    minHeight: 72,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(192,201,187,0.45)",
    backgroundColor: colors.surfaceContainerLowest,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    ...shadow.card,
  },
  networkLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, minWidth: 0 },
  smallCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,69,13,0.08)", alignItems: "center", justifyContent: "center" },
  networkTitle: { ...type.label, fontFamily: fonts.body, color: colors.onSurface, flexShrink: 1, minWidth: 0 },
  networkChip: {
    ...type.labelSm,
    fontFamily: fonts.body,
    color: colors.primary,
    backgroundColor: "rgba(0,69,13,0.06)",
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logoutRow: { borderBottomWidth: 0 },
  logoutIcon: { backgroundColor: "rgba(186,26,26,0.10)" },
  logoutText: { ...type.h2, fontSize: 18, lineHeight: 24, fontFamily: fonts.heading, color: colors.error },
  version: {
    ...type.labelSm,
    fontFamily: fonts.body,
    color: colors.outline,
    textAlign: "center",
    paddingVertical: spacing.stackMd,
  },
});
