import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  ShoppingBag,
  Shirt,
  Watch,
  Smartphone,
  Headphones,
  Gift,
  Home,
  Zap,
  Laptop,
  Camera,
  Tv,
  BookOpen,
  Coffee,
  Gamepad2,
} from "lucide-react-native";

interface CategoryProps {
  categories?: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
  onSelectCategory?: (categoryId: string) => void;
}

const CategoryNav = ({
  categories = [
    { id: "1", name: "All", icon: <ShoppingBag size={24} color="#4B5563" /> },
    { id: "2", name: "Fashion", icon: <Shirt size={24} color="#4B5563" /> },
    { id: "3", name: "Watches", icon: <Watch size={24} color="#4B5563" /> },
    {
      id: "4",
      name: "Electronics",
      icon: <Smartphone size={24} color="#4B5563" />,
    },
    { id: "5", name: "Audio", icon: <Headphones size={24} color="#4B5563" /> },
    { id: "6", name: "Gifts", icon: <Gift size={24} color="#4B5563" /> },
    { id: "7", name: "Home", icon: <Home size={24} color="#4B5563" /> },
    { id: "8", name: "Deals", icon: <Zap size={24} color="#4B5563" /> },
    { id: "9", name: "Laptops", icon: <Laptop size={24} color="#4B5563" /> },
    { id: "10", name: "Cameras", icon: <Camera size={24} color="#4B5563" /> },
    { id: "11", name: "TVs", icon: <Tv size={24} color="#4B5563" /> },
    { id: "12", name: "Books", icon: <BookOpen size={24} color="#4B5563" /> },
    { id: "13", name: "Kitchen", icon: <Coffee size={24} color="#4B5563" /> },
    { id: "14", name: "Gaming", icon: <Gamepad2 size={24} color="#4B5563" /> },
  ],
  onSelectCategory = (categoryId) =>
    console.log(`Category selected: ${categoryId}`),
}: CategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default to "All"

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <View className="bg-white w-full h-20 border-b border-gray-200">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="py-2"
      >
        {categories.map((category) => {
          const isSelected = category.id === selectedCategory;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              className="items-center justify-center mx-3 w-14"
              activeOpacity={0.7}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mb-1 ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}
              >
                {React.cloneElement(category.icon as React.ReactElement, {
                  color: isSelected ? "#3B82F6" : "#4B5563",
                })}
              </View>
              <Text
                className={`text-xs text-center ${isSelected ? "text-blue-600 font-bold" : "text-gray-700"}`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryNav;
