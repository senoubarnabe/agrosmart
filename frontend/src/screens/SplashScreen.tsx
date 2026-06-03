import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { images } from "../data/mockData";
import { colors, fonts, spacing, type } from "../theme";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  return (
    <ImageBackground source={{ uri: images.splash }} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <MaterialIcons name="water-drop" size={64} color={colors.onPrimary} />
          <MaterialIcons name="eco" size={34} color={colors.secondaryContainer} style={styles.leaf} />
        </View>
        <Text style={styles.title}>AgroSmart</Text>
        <Text style={styles.subtitle}>Votre champ, sous contrôle.</Text>
      </View>
      <View style={styles.footer}>
        <AppButton label="Commencer" icon="arrow-forward" variant="light" onPress={() => navigation.navigate("Profile")} />
        <View style={styles.dots}>
          <View style={styles.dotActive} />
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.dot} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "space-between", alignItems: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,69,13,0.52)" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
  logoWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.stackMd,
  },
  leaf: { position: "absolute", right: 8, bottom: 4 },
  title: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.onPrimary, textAlign: "center" },
  subtitle: { ...type.bodyLg, fontFamily: fonts.body, color: "rgba(255,255,255,0.92)", marginTop: 8 },
  footer: { width: "100%", maxWidth: 430, paddingHorizontal: spacing.mobile, paddingBottom: 62, gap: spacing.stackLg },
  dots: { flexDirection: "row", gap: 8, justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.45)" },
  dotActive: { width: 24, height: 8, borderRadius: 4, backgroundColor: colors.onPrimary },
});
