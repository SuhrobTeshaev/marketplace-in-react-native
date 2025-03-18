import React from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Header from "./components/Header";
import { Bell, Moon, Globe, Shield, HelpCircle } from "lucide-react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Settings</Text>

        <View className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Bell size={20} color="#000" />
              <Text className="text-base ml-3">Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#d1d5db", true: "#4f46e5" }}
            />
          </View>

          <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Moon size={20} color="#000" />
              <Text className="text-base ml-3">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#d1d5db", true: "#4f46e5" }}
            />
          </View>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Globe size={20} color="#000" />
              <Text className="text-base ml-3">Language</Text>
            </View>
            <Text className="text-gray-500">English</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Shield size={20} color="#000" />
              <Text className="text-base ml-3">Privacy</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-row items-center p-4 border border-gray-200 rounded-xl mb-3">
          <HelpCircle size={20} color="#000" className="mr-3" />
          <Text className="text-base">Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 border border-gray-200 rounded-xl">
          <Text className="text-base">About App</Text>
        </TouchableOpacity>

        <View className="items-center mt-6">
          <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
