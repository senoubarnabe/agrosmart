import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import type { IconName } from "../data/mockData";
import { colors, fonts, radius, shadow, type } from "../theme";

type Props = { title: string; text: string; image?: string; icon: IconName; glass?: boolean };

export function AlertCard({ title, text, image, icon, glass }: Props) {
  return (
    <View style={[styles.card, glass && styles.glass]}>
      <View style={styles.icon}>
        <MaterialIcons name={icon} size={24} color={colors.secondary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}55`,
    ...shadow.card,
  },
  glass: { backgroundColor: "rgba(255,255,255,0.88)" },
  icon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: `${colors.secondaryContainer}24`, marginBottom: 10 },
  title: { ...type.h2, fontFamily: fonts.heading, color: colors.primary, marginBottom: 4 },
  text: { ...type.body, fontFamily: fonts.body, color: colors.onSurfaceVariant },
  image: { height: 96, borderRadius: radius.lg, marginTop: 12, width: "100%" },
});
