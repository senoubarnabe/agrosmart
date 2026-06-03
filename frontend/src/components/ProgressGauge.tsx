import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, radius, type } from "../theme";

type Props = { value: number; label?: string; size?: number; tone?: string };

export function ProgressGauge({ value, label, size = 132, tone = colors.water }: Props) {
  return (
    <View style={[styles.outer, { width: size, height: size, borderRadius: size / 2, borderColor: `${tone}33` }]}>
      <View style={[styles.inner, { borderRadius: size / 2 - 12, borderColor: tone }]}>
        <Text style={styles.value}>{value}%</Text>
        {label ? <Text style={styles.label}>{label}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { borderWidth: 10, alignItems: "center", justifyContent: "center" },
  inner: {
    flex: 1,
    alignSelf: "stretch",
    margin: 6,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLowest,
  },
  value: { ...type.h1Mobile, fontFamily: fonts.heading, color: colors.primary },
  label: { ...type.labelSm, fontFamily: fonts.body, color: colors.onSurfaceVariant, textTransform: "uppercase" },
});
