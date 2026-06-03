import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radius, shadow } from "../theme";

const icons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Dashboard: "home",
  Crops: "eco",
  Weather: "wb-sunny",
  Alerts: "notifications",
  Settings: "settings",
};

export function BottomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrap}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;
        const label = options.tabBarLabel?.toString() ?? options.title ?? route.name;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.item, focused && styles.active]}
          >
            <MaterialIcons name={icons[route.name]} size={22} color={focused ? colors.onSecondaryContainer : colors.onSurfaceVariant} />
            <Text style={[styles.label, focused && styles.activeLabel]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    height: 76,
    borderRadius: 28,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    ...shadow.lift,
  },
  item: { minWidth: 58, minHeight: 54, alignItems: "center", justifyContent: "center", borderRadius: radius.full, paddingHorizontal: 8 },
  active: { backgroundColor: colors.secondaryContainer, paddingHorizontal: 14 },
  label: { fontSize: 10, lineHeight: 14, fontWeight: "700", fontFamily: fonts.body, color: colors.onSurfaceVariant, marginTop: 2 },
  activeLabel: { color: colors.onSecondaryContainer },
});
