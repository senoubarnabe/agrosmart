import { createContext, ReactNode, useContext, useState } from "react";
import { images } from "./mockData";

export type OnboardingCrop = {
  name: string;
  emoji: string;
  image: string;
  stage: string;
  durationWeeks: number;
};

type OnboardingState = {
  firstName: string;
  city: string;
  language: string;
  crop: OnboardingCrop;
  sowingDate: string;
  surface: string;
  surfaceUnit: "m²" | "ha";
  setFirstName: (value: string) => void;
  setCity: (value: string) => void;
  setLanguage: (value: string) => void;
  setCrop: (value: OnboardingCrop) => void;
  setSowingDate: (value: string) => void;
  setSurface: (value: string) => void;
  setSurfaceUnit: (value: "m²" | "ha") => void;
};

const defaultCrop: OnboardingCrop = {
  name: "Tomate",
  emoji: "🍅",
  image: images.tomatoes,
  stage: "Germination",
  durationWeeks: 14,
};

const OnboardingContext = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [firstName, setFirstName] = useState("Koffi");
  const [city, setCity] = useState("Cotonou");
  const [language, setLanguage] = useState("Français");
  const [crop, setCrop] = useState(defaultCrop);
  const [sowingDate, setSowingDate] = useState("02/06/2026");
  const [surface, setSurface] = useState("1,18");
  const [surfaceUnit, setSurfaceUnit] = useState<"m²" | "ha">("ha");

  return (
    <OnboardingContext.Provider
      value={{
        firstName,
        city,
        language,
        crop,
        sowingDate,
        surface,
        surfaceUnit,
        setFirstName,
        setCity,
        setLanguage,
        setCrop,
        setSowingDate,
        setSurface,
        setSurfaceUnit,
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
