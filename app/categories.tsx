import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import { ArrowRight } from "lucide-react-native";
import { Image } from "expo-image";

export default function CategoriesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("1");

  const categories = [
    {
      id: "2",
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&q=80",
    },
    {
      id: "3",
      name: "Watches",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    },
    {
      id: "4",
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80",
    },
    {
      id: "5",
      name: "Audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      id: "6",
      name: "Gifts",
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80",
    },
    {
      id: "7",
      name: "Home",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80",
    },
    {
      id: "8",
      name: "Deals",
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=300&q=80",
    },
    {
      id: "9",
      name: "Laptops",
      image:
        "https://images.unsplash.com/photo-1611174797136-5e1a1e0e3e04?w=300&q=80",
    },
    {
      id: "10",
      name: "Cameras",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
    },
    {
      id: "11",
      name: "TVs",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80",
    },
    {
      id: "12",
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80",
    },
    {
      id: "13",
      name: "Kitchen",
      image:
        "https://images.unsplash.com/photo-1570486829859-a7b3a2f2beb7?w=300&q=80",
    },
    {
      id: "14",
      name: "Gaming",
      image:
        "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=300&q=80",
    },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    router.push(`/all-products?categoryId=${categoryId}`);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Categories</Text>
        <CategoryNav onSelectCategory={handleCategorySelect} />

        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-1/2 p-2"
              onPress={() => router.push(`/all-products?categoryId=${item.id}`)}
            >
              <View className="border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-32"
                  contentFit="cover"
                />
                <View className="p-3 flex-row justify-between items-center">
                  <Text className="font-medium">{item.name}</Text>
                  <ArrowRight size={16} color="#3b82f6" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
