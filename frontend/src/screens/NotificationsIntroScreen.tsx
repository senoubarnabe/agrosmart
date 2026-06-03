import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "../components/AppButton";
import { AlertCard } from "../components/AlertCard";
import { alerts, images } from "../data/mockData";
import { colors, fonts, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "NotificationsIntro">;

export function NotificationsIntroScreen({ navigation }: Props) {
  return (
    <ImageBackground source={{ uri: images.alertsHero }} style={styles.bg}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.bell}><MaterialIcons name="notifications" size={48} color={colors.onPrimary} /></View>
        <Text style={styles.title}>Ne manquez aucune alerte importante</Text>
        <Text style={styles.copy}>Recevez les alertes critiques dès que votre champ a besoin de vous.</Text>
        <View style={styles.cards}>
          {alerts.map((alert) => <AlertCard key={alert.title} {...alert} glass />)}
        </View>
        <AppButton label="Activer les notifications" icon="chevron-right" onPress={() => navigation.navigate("CultureRegistration")} />
        <AppButton label="Plus tard" variant="ghost" onPress={() => navigation.navigate("CultureRegistration")} />
        <View style={styles.dots}>{[0, 1, 2, 3, 4].map((item) => <View key={item} style={item === 4 ? styles.dotActive : styles.dot} />)}</View>
      </View>
      <Image source={{ uri: images.alertsHero }} style={styles.hiddenPreload} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(114,25,0,0.62)" },
  content: { flex: 1, width: "100%", maxWidth: 430, alignSelf: "center", padding: spacing.mobile, paddingTop: 56, paddingBottom: 30 },
  bell: { alignSelf: "center", width: 96, height: 96, borderRadius: 48, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onPrimary, textAlign: "center" },
  copy: { ...type.body, fontFamily: fonts.body, color: "rgba(255,255,255,0.9)", textAlign: "center", marginTop: 8, marginBottom: 20 },
  cards: { gap: 14, flex: 1, justifyContent: "center" },
  dots: { flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.35)" },
  dotActive: { width: 24, height: 8, borderRadius: 4, backgroundColor: colors.secondaryContainer },
  hiddenPreload: { width: 0, height: 0 },
});
