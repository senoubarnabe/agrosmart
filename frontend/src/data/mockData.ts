import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme";

export type IconName = keyof typeof MaterialIcons.glyphMap;

export const images = {
  splash:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAo3FG9jYll99kOlSQfVNoxdHEfWm-VyhLyMFPvz96DLzJPT1uAZK1NegHq4G51xhfOS6nLclMrE90M2g_FBYXPomJS7cxJ6ibZ3UNzxgsL-Xi03jBPOo2Pce6_kQV2emeqMx8PBo84nGtWtrAlkMJHP-3GrVX7IGQe2ePACVCx-P-l-j6kzLPaFu75jKrqG-39HpdvBGBzJcYb6ObScCZecdvZVvueB5POlq1stk2wjosjux_bOkq4FLNJRVd_O9ko0sxZKZUiimun",
  alertsHero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDw0AWoi8mnVp4a0WgE97Ii_AD0NZqQ0Q1l60JrCjIgQGcYha6Wp8IItHVkaiMiWqm32EDpq3jZJ62UmTQEvUCRM8XREoAIvZzp6iM70ALgJ5ilGG7NR8utUy70FQcoBm57QNCD6Z45TPxwxOw_2rNR1_Yog2U1a1HAtYtfKDglmDaE0wi99WNaZ01OUpSsyH5r1jwlQyRTo9NA3H9usqxCqnbtOOB6H7GR0kzkVovqfR62FZwfuKRWtn-XJo7QYKuyv9bSJsYb1L5e",
  drySoil:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7eJvET3yip3NpcqSJuhb5PLZ7j4SM24kDG00tOdamKvGTnlH6g2_0SS8kEqsEYWnrBp97DZuBcx89mR0sCDBK-mRtDvBUWFEJkxH-E1ZBsU3JW9FmEGwrgAfFHa3HRzCjlQAIH-9-IO-PPM-IHg87aqlEHPF7XhaC4yy0vhd7Q-fWxF5LaNBareyzBQWVNAVOGhLZHM6teit8DV4rY3jBqGMp_eLzWv2cqhHn_dWzH0zsYyRWPO4tGR5NQVskiUspSJvvdRCs7HO8",
  tank:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAAjBJ4NNwRh_9mqrfxXZBdP6lhJ7ppFwZcUvFPHCdm5LrHJrKZ4VMV5IYdEN3UEwayBTHEwndOOzfY5RMdzT-sKIUBVI7k_jdvOH3Nbx75OMbeqKN07hnf2ev4A9pgw3uo-BDbN5-fv6lysgOUoBOrwf8Lw6Z2xWtZ7j0A80o__SZ4Iom_ynm1iI6vl9FzfRROHJU8VZv85eOTIZ9Tdj0OOV3ELInEg6V5XKthKB6JX-5KbJ24r4heWhacuN4rExlKkEH8O_3tNy_U",
  leak:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBWcdG-jVVe3KkURshHpHMMIwE3-g1Ez46MnVYHIxMYLYK5fpSpcxsO0unS7gQks-NBYFEqp-VYn5TiUkJ5mueuHv9e6epR_Y7NMUTxTCnqVgxsmUC_8J_r7lCFGej1P49FGGwimYf0_VIH5EIicxnpX0r96FdM5S5g5O8x_-6i6b8UdP3MFBNjAbx9dNam7kJcqif9svSBxzfqn-Tucu6w-SEVxKLBsmdY3D2kVv1Qh0Ih7CF50lGLjRb-fc4j6MGKdi7RdjofiaSV",
  farmer:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAViGVMTQXE56MpfzdK2Q-0GvTEXrxYSMYTBF60NsVSEIJ3zgXTk5KYboxUiA9fD1q11xTwsv3f3TX3YrnE9AyJBBudFE1QTz6vdwPaGs1Ro0EZZ5ZASlrhdZPXviXsGjyhVoMFTrl6-a9neZ23_feRw9gs5JVtLF3hom42GKfeuKgPM0Ly_59CbxASdBQZ5VkmrTNQS4KUplINOi_QWdPWqGNv4Uc9BBbpwAQHlod2EYOI_pqPBCJ46B1DOFU11ZG3buu-doksnT2O",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDKRvE7Z04sCApzs9OD8jyZhz71YLmgnwkpXZteFL6VZwgj9nxlmXFkUqHjB97CpwSWL_08BTcwZctdCXKTkd4V4FGZZi4ucHCTY30p2viXAxpPuRK1k0x-g-7xBcH74oBHxudXMK_hrzgHIv-6dz8TQzveu6maKfzJaiCdsbpjghjK197aJGn_Pw6jgb80fkFjyzD8hwD-hklbDf3iCSKwMj9e9wyL8bDbzLAJDKB1at3deU_yhKd1EEXxxQDNpdnHnjrs7RFKKtMC",
  tomatoes:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAQs8Dpnpw1E2piScktdMilnKr0PY_BtqKnVZovi1-aGrdqFVWW-AfoMUMDBTPwoKssL3w9cYZzVB3xoHvgl_gLELvKSO7iQJFwSVxtR20eEhBiFfhtTnKvZnbqzMFjt3YX0BeUKRcJZj2uIKsj5U_Ui6z_GB7d_uygvtE4vPVuwRW51KLRZD_OcMQ2nmX54DOTpzXL5mxtFuYPU7ajBRQJq4dS42Ai7Ga-el-osj62-oMoWYIte7SM-GEtgxfuCamFOFQ-bwHbChU-",
  corn:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAET15650riLOexnxBxnYnKqVsBXPmrhNjNwy5Dc2eJ9nUJ3LGinBs7wy1EpHv1QaLPYmuOZCkvI3BzPEio6ZEQtRUeH6YIuWaGutgzNEBOrz1aOj-SufmOCVhzADakmyS-9u_C-IrmzZxwW8ik2DhreLRIFK88YPK-3AAR9PASieycbMVt0NTxVuL-MkyRWAuLmiE855BADekJSu-J3scP3uIffPf-GHalSVK7poVMqX1pgA9hpv1S-SyHQ-pjC42SI2UDQKnq7AUE",
};

export const cropChoices = [
  { name: "Tomate", emoji: "🍅", selected: true },
  { name: "Piment", emoji: "🌶️" },
  { name: "Oignon", emoji: "🧅" },
  { name: "Laitue", emoji: "🥬" },
  { name: "Maïs", emoji: "🌽" },
  { name: "Carotte", emoji: "🥕" },
];

export const sensors = [
  { label: "HUMIDITÉ", value: "Connecté", icon: "water-drop" as IconName, ok: true },
  { label: "TEMP", value: "Connecté", icon: "device-thermostat" as IconName, ok: true },
  { label: "SOLEIL", value: "Recherche", icon: "wb-sunny" as IconName, ok: false },
  { label: "VENT", value: "Connecté", icon: "air" as IconName, ok: true },
  { label: "DÉBIT", value: "Recherche", icon: "waves" as IconName, ok: false },
  { label: "RÉSERVOIR", value: "Connecté", icon: "opacity" as IconName, ok: true },
];

export const dashboardMetrics = [
  { label: "Humidité Sol", value: "68%", icon: "water-drop" as IconName, tone: colors.water },
  { label: "Soleil", value: "Fort", icon: "wb-sunny" as IconName, tone: colors.secondaryContainer },
  { label: "Température", value: "34°C", icon: "device-thermostat" as IconName, tone: colors.tertiaryContainer },
  { label: "Vent", value: "18 km/h", icon: "air" as IconName, tone: colors.primaryContainer },
];

export const cultures = [
  {
    name: "🍅 Tomates",
    stage: "Fructification",
    health: "Excellente santé",
    progress: 64,
    week: "Semaine 9/14",
    next: "Aujourd'hui, 18:00",
    humidity: "42% (Optimal)",
    image: images.tomatoes,
    alert: false,
  },
  {
    name: "🌽 Maïs Doux",
    stage: "Croissance",
    health: "Besoin d'eau",
    progress: 33,
    week: "Semaine 4/12",
    next: "Immédiat",
    humidity: "18% (Bas)",
    image: images.corn,
    alert: true,
  },
];

export const alerts = [
  { title: "Sol trop sec", text: "Arrosez au bon moment pour éviter le flétrissement.", image: images.drySoil, icon: "warning" as IconName },
  { title: "Réservoir vide", text: "Évitez les pannes sèches avant vos cycles d'irrigation.", image: images.tank, icon: "battery-alert" as IconName },
  { title: "Fuite d'eau", text: "Économisez chaque goutte en détectant les anomalies.", image: images.leak, icon: "water-damage" as IconName },
];

export const schedule = [
  { time: "18:30", volume: "450 Litres", reason: "Chaleur prévue", status: "À venir" },
  { time: "06:00", volume: "300 Litres", reason: "Cycle terminé", status: "Fait" },
  { time: "22:00", volume: "150 Litres", reason: "Maintien humidité", status: "Planifié" },
];

export const forecastDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => ({
  day,
  temp: [32, 35, 38, 34, 31, 30, 33][index],
  rain: [10, 5, 0, 25, 60, 40, 15][index],
}));

export const pairingSensors = [
  { id: "humidity", label: "Humidité", icon: "water-drop" as IconName, paired: false, tone: colors.primary },
  { id: "temp", label: "Temp.", icon: "device-thermostat" as IconName, paired: true, tone: colors.secondary },
  { id: "sun", label: "Soleil", icon: "wb-sunny" as IconName, paired: false, tone: colors.secondaryContainer },
  { id: "wind", label: "Vent", icon: "air" as IconName, paired: true, tone: colors.tertiary },
  { id: "flow", label: "Débit", icon: "waves" as IconName, paired: false, tone: colors.water },
  { id: "tank", label: "Réservoir", icon: "opacity" as IconName, paired: true, tone: colors.water },
];

export const wateringHistory = [
  { time: "Aujourd'hui, 06:00", volume: "300 L", duration: "25 min", crop: "Tomates", type: "Auto", reason: "Arrosage matinal standard" },
  { time: "Hier, 18:30", volume: "450 L", duration: "40 min", crop: "Tomates", type: "Manuel", reason: "Compensation coup de chaleur" },
  { time: "29 Mai, 22:00", volume: "150 L", duration: "15 min", crop: "Maïs Doux", type: "Préventif", reason: "Optimisation sols drainants" },
];

export const systemAlerts = [
  {
    type: "danger",
    title: "Sol trop sec",
    message: "L'humidité du sol est tombée à 12%, sous le seuil critique pour la parcelle de maïs.",
    location: "Parcelle Nord",
    timeAgo: "Il y a 5 min",
    actionRequired: true,
  },
  {
    type: "warning",
    title: "Réservoir à 20%",
    message: "Le niveau d'eau est bas. Prévoir un remplissage pour maintenir les cycles.",
    location: "Source A",
    timeAgo: "Il y a 2 heures",
    actionRequired: false,
  },
  {
    type: "success",
    title: "Arrosage automatique effectué",
    message: "L'irrigation intelligente a arrosé avec succès.",
    location: "Parcelle Est",
    timeAgo: "Ce matin, 06:15",
    actionRequired: false,
  },
];

export const forecast48h = [
  { label: "Maintenant", temp: "32°", icon: "wb-sunny" as IconName },
  { label: "12h", temp: "36°", icon: "wb-sunny" as IconName },
  { label: "18h", temp: "31°", icon: "wb-sunny" as IconName },
  { label: "Nuit", temp: "25°", icon: "nights-stay" as IconName },
  { label: "Demain", temp: "30°", icon: "thunderstorm" as IconName },
];
