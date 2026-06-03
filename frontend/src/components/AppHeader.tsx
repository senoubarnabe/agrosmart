import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useOnboarding } from "../data/onboardingState";
import { colors, fonts, radius, type } from "../theme";

type Props = {
  title?: string;
  back?: boolean;
  onBack?: () => void;
};

export function AppHeader({ title = "AgroSmart", back, onBack }: Props) {
  const { profileImage } = useOnboarding();

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Pressable onPress={onBack} style={styles.iconBtn}>
          <MaterialIcons name={back ? "arrow-back" : "menu"} size={28} color={colors.primary} />
        </Pressable>
        <Text style={styles.brand}>{title}</Text>
      </View>
      <Image source={{ uri: profileImage }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: radius.full },
  brand: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: colors.primaryFixed },
});
