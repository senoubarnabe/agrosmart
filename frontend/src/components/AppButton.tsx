import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, fonts, radius, shadow, type } from "../theme";
import type { IconName } from "../data/mockData";

type Props = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  variant?: "primary" | "light" | "amber" | "ghost";
  style?: ViewStyle;
};

export function AppButton({ label, onPress, icon, variant = "primary", style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}>
      <Text style={[styles.text, variant === "light" && styles.lightText, variant === "ghost" && styles.ghostText]}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={22} color={variant === "light" ? colors.primary : colors.onPrimary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 22,
    ...shadow.card,
  },
  primary: { backgroundColor: colors.primary },
  amber: { backgroundColor: colors.secondaryContainer },
  light: { backgroundColor: colors.surfaceContainerLowest },
  ghost: { backgroundColor: "transparent", shadowOpacity: 0, elevation: 0 },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  text: { ...type.label, fontFamily: fonts.body, color: colors.onPrimary },
  lightText: { color: colors.primary },
  ghostText: { color: colors.onPrimary, textDecorationLine: "underline" },
});
