import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import Header from "./components/Header";

export default function FavoritesScreen() {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header favoritesCount={0} />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Your Favorites</Text>
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-gray-500 text-center">
            You haven't added any favorites yet.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
