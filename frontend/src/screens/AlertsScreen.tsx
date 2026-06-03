import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Screen } from "../components/Screen";
import { systemAlerts } from "../data/mockData";
import { colors, fonts, radius, shadow, spacing, type } from "../theme";

export function AlertsScreen() {
  return (
    <Screen>
      <AppHeader />
      <Text style={styles.title}>Alertes 🔔</Text>
      <Text style={styles.copy}>Surveillez l'état de vos parcelles en temps réel.</Text>

      <View style={styles.okBanner}>
        <MaterialIcons name="check-circle" size={34} color={colors.primary} />
        <View>
          <Text style={styles.okTitle}>Système actif</Text>
          <Text style={styles.okText}>Les alertes critiques sont surveillées en continu.</Text>
        </View>
      </View>

      {systemAlerts.map((alert) => {
        const urgent = alert.type === "danger";
        const warning = alert.type === "warning";
        const tone = urgent ? colors.error : warning ? colors.secondaryContainer : colors.primary;
        return (
          <View key={alert.title} style={styles.alertCard}>
            <View style={[styles.alertIcon, { backgroundColor: `${tone}18` }]}>
              <MaterialIcons name={urgent ? "priority-high" : warning ? "warning" : "check-circle"} size={26} color={tone} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.alertTop}>
                <Text style={[styles.alertTitle, { color: tone }]}>{alert.title}</Text>
                <Text style={styles.alertTime}>{alert.timeAgo}</Text>
              </View>
              <Text style={styles.location}>{alert.location}</Text>
              <Text style={styles.message}>{alert.message}</Text>
              {alert.actionRequired ? (
                <View style={styles.actionChip}>
                  <MaterialIcons name="bolt" size={14} color={colors.onSecondaryContainer} />
                  <Text style={styles.actionText}>Action recommandée</Text>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}

      <View style={styles.tip}>
        <Text style={styles.tipLabel}>Conseil expert</Text>
        <Text style={styles.tipText}>Intervenir tôt sur les seuils bas d'humidité évite le stress hydrique et stabilise le rendement.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onSurface },
  copy: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginBottom: spacing.stackMd },
  okBanner: { flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: colors.primaryFixed, borderRadius: radius.card, padding: 16, marginBottom: 16, ...shadow.card },
  okTitle: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimaryFixed },
  okText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onPrimaryFixedVariant, marginTop: 2 },
  alertCard: { flexDirection: "row", gap: 12, backgroundColor: colors.surfaceContainerLowest, borderRadius: radius.card, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: `${colors.outlineVariant}55`, ...shadow.card },
  alertIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  alertTop: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  alertTitle: { ...type.h2, fontFamily: fonts.heading, flex: 1 },
  alertTime: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline },
  location: { ...type.labelSm, fontFamily: fonts.body, color: colors.outline, textTransform: "uppercase", marginTop: 2 },
  message: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 8 },
  actionChip: { alignSelf: "flex-start", flexDirection: "row", gap: 4, alignItems: "center", backgroundColor: colors.secondaryContainer, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 },
  actionText: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSecondaryContainer },
  tip: { borderRadius: radius.card, backgroundColor: colors.primary, padding: 18, marginTop: 8 },
  tipLabel: { ...type.labelSm, fontFamily: fonts.body, color: colors.primaryFixed, textTransform: "uppercase" },
  tipText: { ...type.h2, fontFamily: fonts.heading, color: colors.onPrimary, marginTop: 6 },
});
