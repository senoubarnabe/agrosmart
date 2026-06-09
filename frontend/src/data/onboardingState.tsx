import { createContext, ReactNode, useContext, useState } from "react";
import { images } from "./mockData";

export type OnboardingCrop = {
  name: string;
  emoji: string;
  image: string;
  stage: string;
  durationWeeks: number;
};

export type ManagedCulture = {
  id: string;
  name: string;
  stage: string;
  health: string;
  progress: number;
  week: string;
  next: string;
  humidity: string;
  image: string;
  alert: boolean;
};

type SurfaceUnit = "m²" | "ha";

type OnboardingState = {
  firstName: string;
  city: string;
  language: string;
  profileImage: string;
  crop: OnboardingCrop;
  sowingDate: string;
  surface: string;
  surfaceUnit: SurfaceUnit;
  cultures: ManagedCulture[];
  setFirstName: (value: string) => void;
  setCity: (value: string) => void;
  setLanguage: (value: string) => void;
  setProfileImage: (value: string) => void;
  setCrop: (value: OnboardingCrop) => void;
  setSowingDate: (value: string) => void;
  setSurface: (value: string) => void;
  setSurfaceUnit: (value: SurfaceUnit) => void;
  addCurrentCropAsCulture: () => void;
};

const defaultCrop: OnboardingCrop = {
  name: "Tomate",
  emoji: "🍅",
  image: images.tomatoes,
  stage: "Germination",
  durationWeeks: 14,
};

const initialCultures: ManagedCulture[] = [
  {
    id: "tomatoes-default",
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
    id: "corn-default",
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

const OnboardingContext = createContext<OnboardingState | null>(null);

function pluralizeCropName(name: string) {
  return name.endsWith("s") ? name : `${name}s`;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("Français");
  const [profileImage, setProfileImage] = useState(images.farmer);
  const [crop, setCrop] = useState(defaultCrop);
  const [sowingDate, setSowingDate] = useState("02/06/2026");
  const [surface, setSurface] = useState("1,18");
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>("ha");
  const [cultures, setCultures] = useState(initialCultures);

  const addCurrentCropAsCulture = () => {
    const now = Date.now();
    setCultures((items) => [
      ...items,
      {
        id: `${crop.name}-${now}`,
        name: `${crop.emoji} ${pluralizeCropName(crop.name)}`,
        stage: crop.stage,
        health: "Programme généré",
        progress: 8,
        week: "Semaine 1",
        next: "17h30",
        humidity: "65% (Optimal)",
        image: crop.image,
        alert: false,
      },
    ]);
  };

  return (
    <OnboardingContext.Provider
      value={{
        firstName,
        city,
        language,
        profileImage,
        crop,
        sowingDate,
        surface,
        surfaceUnit,
        cultures,
        setFirstName,
        setCity,
        setLanguage,
        setProfileImage,
        setCrop,
        setSowingDate,
        setSurface,
        setSurfaceUnit,
        addCurrentCropAsCulture,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const value = useContext(OnboardingContext);
  if (!value) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return value;
}
