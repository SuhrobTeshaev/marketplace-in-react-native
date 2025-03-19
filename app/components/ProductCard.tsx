import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Image } from "expo-image";
import { Heart } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  isFavorite?: boolean;
  discount?: number;
  discountEnds?: Date;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Modern Desk Lamp",
  price = 49.99,
  image = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
  isFavorite = false,
  discount = 0,
  discountEnds,
  onPress = () => {},
  onFavoritePress,
}: ProductCardProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isItemFavorite, setIsItemFavorite] = useState(isFavorite);
  const { isAuthenticated } = useAuth();
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite: checkIsFavorite,
  } = useFavorites();
  const { isDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!discountEnds) return;

    const calculateTimeLeft = () => {
      const difference =
        new Date(discountEnds).getTime() - new Date().getTime();
      if (difference <= 0) return "";

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, [discountEnds]);

  const handleFavoritePress = () => {
    if (onFavoritePress) {
      onFavoritePress();
      return;
    }

    if (!isAuthenticated) {
      Alert.alert(
        "Sign In Required",
        "Please sign in to add items to your favorites",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Sign In", onPress: () => router.push("/login") },
        ]
      );
      return;
    }

    if (isItemFavorite) {
      removeFromFavorites(id);
      setIsItemFavorite(false);
    } else {
      addToFavorites({
        id,
        name,
        price,
        image,
        discount,
        discountEnds,
      });
      setIsItemFavorite(true);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-lg overflow-hidden shadow-sm w-[160px] mx-2 my-2  ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full h-[150px]"
          contentFit="cover"
        />
        <Pressable
          onPress={handleFavoritePress}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isDarkMode ? "bg-gray-800/80" : "bg-white/80"
          }`}
        >
          <Heart
            size={22}
            color={
              isItemFavorite ? "#f43f5e" : isDarkMode ? "#9ca3af" : "#64748b"
            }
            fill={isItemFavorite ? "#f43f5e" : "none"}
          />
        </Pressable>
      </View>

      <View className="p-3">
        <Text
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } mb-1`}
        >
          {id}
        </Text>
        <Text
          className={`font-medium text-base mb-1 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          numberOfLines={2}
        >
          {name}
        </Text>
        {discount > 0 ? (
          <View>
            <View className="flex-row items-center">
              <Text className="font-bold text-base text-blue-600 mr-2">
                ${(price * (1 - discount / 100)).toFixed(2)}
              </Text>
              <Text
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } line-through`}
              >
                ${price.toFixed(2)}
              </Text>
            </View>
            {timeLeft ? (
              <View className="bg-red-100 rounded-full px-2 py-1 mt-1">
                <Text className="text-xs text-red-600">
                  {discount}% off · {timeLeft} left
                </Text>
              </View>
            ) : (
              <View className="bg-red-100 rounded-full px-2 py-1 mt-1">
                <Text className="text-xs text-red-600">{discount}% off</Text>
              </View>
            )}
          </View>
        ) : (
          <Text className="font-bold text-base text-blue-600">
            ${price.toFixed(2)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default ProductCard;
