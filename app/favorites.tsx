import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { Heart } from "lucide-react-native";
import { useFavorites } from "./context/FavoritesContext";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemoveFavorite = (productId: string | number) => {
    removeFromFavorites(productId.toString());
  };

  const handleProductPress = (productId: string | number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header favoritesCount={favorites.length} />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Your Favorites</Text>

        {favorites.length > 0 ? (
          <View className="flex-row flex-wrap">
            {favorites.map((item) => (
              <View key={item.id} className="w-1/2 p-2">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  isFavorite={true}
                  discount={item.discount}
                  discountEnds={item.discountEnds}
                  onPress={() => handleProductPress(item.id)}
                  onFavoritePress={() => handleRemoveFavorite(item.id)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Heart size={48} color="#d1d5db" />
            <Text className="text-gray-500 text-center mt-4 text-lg">
              You haven't added any favorites yet.
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-6 py-3 rounded-full"
              onPress={() => router.push("/")}
            >
              <Text className="text-white font-medium">Browse Products</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
