import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabs } from "../components/BottomTabs";
import { AlertsScreen } from "../screens/AlertsScreen";
import { CropsScreen } from "../screens/CropsScreen";
import { CultureRegistrationScreen } from "../screens/CultureRegistrationScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { DetailedForecastScreen } from "../screens/DetailedForecastScreen";
import { ManualProgrammingScreen } from "../screens/ManualProgrammingScreen";
import { NotificationsIntroScreen } from "../screens/NotificationsIntroScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProgramScreen } from "../screens/ProgramScreen";
import { SensorConnectionScreen } from "../screens/SensorConnectionScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { WeatherScreen } from "../screens/WeatherScreen";
import { WelcomeSuccessScreen } from "../screens/WelcomeSuccessScreen";

export type RootStackParamList = {
  Splash: undefined;
  Profile: undefined;
  NotificationsIntro: undefined;
  CultureRegistration: { mode?: "onboarding" | "addParcel" } | undefined;
  SensorConnection: { mode?: "onboarding" | "addParcel" } | undefined;
  WelcomeSuccess: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Program: undefined;
  ManualProgramming: undefined;
  DetailedForecast: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Crops: undefined;
  Weather: undefined;
  Alerts: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: "Accueil" }} />
      <Tab.Screen name="Crops" component={CropsScreen} options={{ tabBarLabel: "Cultures" }} />
      <Tab.Screen name="Weather" component={WeatherScreen} options={{ tabBarLabel: "Météo" }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ tabBarLabel: "Alertes" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: "Paramètres" }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NotificationsIntro" component={NotificationsIntroScreen} />
      <Stack.Screen name="CultureRegistration" component={CultureRegistrationScreen} />
      <Stack.Screen name="SensorConnection" component={SensorConnectionScreen} />
      <Stack.Screen name="WelcomeSuccess" component={WelcomeSuccessScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Program" component={ProgramScreen} />
      <Stack.Screen name="ManualProgramming" component={ManualProgrammingScreen} />
      <Stack.Screen name="DetailedForecast" component={DetailedForecastScreen} />
    </Stack.Navigator>
  );
}
