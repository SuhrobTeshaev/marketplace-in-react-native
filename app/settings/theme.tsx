import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Sun, Moon, Smartphone } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ThemeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, setTheme, isDarkMode } = useTheme();
  const { t } = useLanguage();

  const themes = [
    {
      id: "light",
      name: t("light"),
      icon: <Sun size={20} color={isDarkMode ? "#fff" : "#000"} />,
    },
    {
      id: "dark",
      name: t("dark"),
      icon: <Moon size={20} color={isDarkMode ? "#fff" : "#000"} />,
    },
    {
      id: "system",
      name: t("systemDefault"),
      icon: <Smartphone size={20} color={isDarkMode ? "#fff" : "#000"} />,
    },
  ];

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId as "light" | "dark" | "system");
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      style={{ paddingTop: insets.top }}
    >
      <View
        className={`flex-row items-center p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {t("theme")}
        </Text>
      </View>

      <View className="p-4">
        <Text
          className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
        >
          {t("chooseTheme")}
        </Text>

        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.id}
            className={`flex-row items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleThemeSelect(themeOption.id)}
          >
            <View className="flex-row items-center">
              <View className="mr-3">{themeOption.icon}</View>
              <Text
                className={`text-base font-medium ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {themeOption.name}
              </Text>
            </View>
            {theme === themeOption.id && <Check size={20} color="#3B82F6" />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
