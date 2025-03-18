import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Heart } from "lucide-react-native";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Modern Desk Lamp",
  price = 49.99,
  image = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
  isFavorite = false,
  onPress = () => {},
  onFavoritePress = () => {},
}: ProductCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-lg overflow-hidden shadow-sm w-[180px] h-[280px] m-2"
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full h-[150px]"
          contentFit="cover"
        />
        <Pressable
          onPress={onFavoritePress}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80"
        >
          <Heart
            size={20}
            color={isFavorite ? "#f43f5e" : "#64748b"}
            fill={isFavorite ? "#f43f5e" : "none"}
          />
        </Pressable>
      </View>

      <View className="p-3">
        <Text className="text-sm text-gray-500 mb-1">{id}</Text>
        <Text className="font-medium text-base mb-1" numberOfLines={2}>
          {name}
        </Text>
        <Text className="font-bold text-base text-blue-600">
          ${price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
