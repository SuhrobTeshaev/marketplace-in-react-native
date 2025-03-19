import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode } = useTheme();

  const languages = [
    { code: "en", name: "English", localName: "English" },
    { code: "ru", name: "Russian", localName: "Русский" },
    { code: "es", name: "Spanish", localName: "Español" },
    { code: "fr", name: "French", localName: "Français" },
    { code: "de", name: "German", localName: "Deutsch" },
    { code: "it", name: "Italian", localName: "Italiano" },
    { code: "zh", name: "Chinese", localName: "中文" },
    { code: "ja", name: "Japanese", localName: "日本語" },
    { code: "ko", name: "Korean", localName: "한국어" },
    { code: "ar", name: "Arabic", localName: "العربية" },
  ];

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
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
          {t("language")}
        </Text>
      </View>

      <View className="p-4">
        <Text
          className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
        >
          {t("chooseLanguage")}
        </Text>

        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            className={`flex-row items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-100"}`}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <View>
              <Text
                className={`text-base font-medium ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {lang.name}
              </Text>
              <Text className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                {lang.localName}
              </Text>
            </View>
            {language === lang.code && <Check size={20} color="#3B82F6" />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
