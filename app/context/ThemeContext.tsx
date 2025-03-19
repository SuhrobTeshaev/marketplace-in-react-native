import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  isDarkMode: false,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>("system");
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme from storage when component mounts
    const loadTheme = async () => {
      try {
        if (typeof localStorage !== "undefined") {
          const savedTheme = localStorage.getItem("theme");
          if (savedTheme) {
            setTheme(savedTheme as ThemeType);
          }
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    // Save theme to storage whenever it changes
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    } catch (error) {
      console.error("Failed to save theme to storage", error);
    }

    // Update isDarkMode based on theme
    if (theme === "system") {
      setIsDarkMode(systemColorScheme === "dark");
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme, systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
