import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <Text className="text-6xl font-bold text-gray-300 mb-4">404</Text>
      <Text className="text-2xl font-bold mb-2">Page Not Found</Text>
      <Text className="text-gray-500 text-center mb-8">
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <TouchableOpacity
        className="bg-black py-3 px-6 rounded-full flex-row items-center"
        onPress={() => router.push("/")}
      >
        <ArrowLeft size={20} color="#fff" />
        <Text className="text-white font-bold ml-2">Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
