import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";

export default function CategoriesScreen() {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Categories</Text>
        <CategoryNav />
        <Text className="text-lg mt-6 text-center text-gray-500">
          Select a category to view products
        </Text>
      </ScrollView>
    </View>
  );
}
