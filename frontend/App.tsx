import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { colors } from "./src/theme";
import { OnboardingProvider } from "./src/data/onboardingState";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={colors.surface} />
        <OnboardingProvider>
          <RootNavigator />
        </OnboardingProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
