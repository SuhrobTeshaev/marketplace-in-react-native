import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Header from "./components/Header";
import { User, Package, CreditCard, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const menuItems = [
    {
      icon: <User size={20} color="#000" />,
      label: "Personal Information",
      route: "/profile/info",
    },
    {
      icon: <Package size={20} color="#000" />,
      label: "My Orders",
      route: "/profile/orders",
    },
    {
      icon: <CreditCard size={20} color="#000" />,
      label: "Payment Methods",
      route: "/profile/payment",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Your Profile</Text>

        <View className="items-center justify-center py-6 bg-gray-50 rounded-xl mb-6">
          <View className="w-20 h-20 rounded-full bg-gray-300 mb-3 items-center justify-center">
            <User size={40} color="#666" />
          </View>
          <Text className="text-xl font-bold">Guest User</Text>
          <Text className="text-gray-500">guest@example.com</Text>
        </View>

        <View className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-100"
            >
              <View className="mr-3">{item.icon}</View>
              <Text className="text-base flex-1">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="mt-6 flex-row items-center justify-center p-4 border border-gray-200 rounded-xl">
          <LogOut size={20} color="#f00" className="mr-2" />
          <Text className="text-red-500 font-medium">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
