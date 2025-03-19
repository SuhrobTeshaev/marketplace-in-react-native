import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "./components/Header";
import {
  User,
  Package,
  CreditCard,
  LogOut,
  Settings,
  Heart,
  ShoppingBag,
} from "lucide-react-native";
import { Image } from "expo-image";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const handleSignOut = () => {
    Alert.alert(t("confirmSignOut"), "", [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("signOut"),
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/");
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: <User size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("personalInfo"),
      route: "/profile/info",
      onPress: () => Alert.alert(t("comingSoon"), t("featureNotImplemented")),
    },
    {
      icon: <Package size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("myOrders"),
      route: "/profile/orders",
      onPress: () => Alert.alert(t("comingSoon"), t("featureNotImplemented")),
    },
    {
      icon: <CreditCard size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("paymentMethods"),
      route: "/profile/payment",
      onPress: () => Alert.alert(t("comingSoon"), t("featureNotImplemented")),
    },
    {
      icon: <Heart size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("myFavorites"),
      route: "/favorites",
      onPress: () => router.push("/favorites"),
    },
    {
      icon: <ShoppingBag size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("shoppingCart"),
      route: "/cart",
      onPress: () => router.push("/cart"),
    },
    {
      icon: <Settings size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("settings"),
      route: "/settings",
      onPress: () => router.push("/settings"),
    },
  ];

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text
          className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {t("yourProfile")}
        </Text>

        <View
          className={`items-center justify-center py-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-xl mb-6`}
        >
          <View className="w-20 h-20 rounded-full bg-gray-200 mb-3 items-center justify-center overflow-hidden">
            <Image
              source={{
                uri:
                  isAuthenticated && user?.avatar
                    ? user.avatar
                    : "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
              }}
              className="w-full h-full"
            />
          </View>
          <Text
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {isAuthenticated && user ? user.name : "Guest User"}
          </Text>
          <Text className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            {isAuthenticated && user ? user.email : "guest@example.com"}
          </Text>
          {!isAuthenticated && (
            <TouchableOpacity
              className="mt-3 bg-blue-600 px-4 py-2 rounded-full"
              onPress={() => router.push("/login")}
            >
              <Text className="text-white">{t("signIn")}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          className={`rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-800 bg-gray-800" : "border-gray-200 bg-white"}`}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-4 border-b ${isDarkMode ? "border-gray-700 active:bg-gray-700" : "border-gray-100 active:bg-gray-100"}`}
              onPress={item.onPress}
            >
              <View className="mr-3">{item.icon}</View>
              <Text
                className={`text-base flex-1 ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isAuthenticated && (
          <TouchableOpacity
            className={`mt-6 flex-row items-center justify-center p-4 border rounded-xl ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            onPress={handleSignOut}
          >
            <LogOut size={20} color="#f00" className="mr-2" />
            <Text className="text-red-500 font-medium">{t("signOut")}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
