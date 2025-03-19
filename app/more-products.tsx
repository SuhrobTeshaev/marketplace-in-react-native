import React from "react";
import { View, Text, FlatList, Pressable, SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import ProductCard from "./components/ProductCard";

// Additional products data
const additionalProducts = [
  {
    id: "29",
    name: "Smart Fitness Tracker",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=300&q=80",
    isFavorite: false,
    category: "3", // Watches
    discount: 10,
  },
  {
    id: "30",
    name: "Wireless Charging Stand",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300&q=80",
    isFavorite: true,
    category: "4", // Electronics
  },
  {
    id: "31",
    name: "Smart Light Bulbs (4-Pack)",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1558599249-30ea84937a63?w=300&q=80",
    isFavorite: false,
    category: "7", // Home
    discount: 15,
    discountEnds: new Date(new Date().getTime() + 36 * 60 * 60 * 1000),
  },
  {
    id: "32",
    name: "Portable Bluetooth Printer",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&q=80",
    isFavorite: true,
    category: "4", // Electronics
  },
  {
    id: "33",
    name: "Ergonomic Vertical Mouse",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80",
    isFavorite: false,
    category: "4", // Electronics
  },
  {
    id: "34",
    name: "Leather Laptop Sleeve",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1603346449810-23213b4e95e9?w=300&q=80",
    isFavorite: true,
    category: "9", // Laptops
  },
  {
    id: "35",
    name: "Smart Plant Monitor",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1600411833114-5c4739b80b6a?w=300&q=80",
    isFavorite: false,
    category: "7", // Home
    discount: 20,
  },
  {
    id: "36",
    name: "Adjustable Laptop Stand",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1619506147448-b56ba8ee11ec?w=300&q=80",
    isFavorite: true,
    category: "9", // Laptops
  },
  {
    id: "37",
    name: "Wireless Keyboard and Mouse Combo",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80",
    isFavorite: false,
    category: "4", // Electronics
    discount: 25,
    discountEnds: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  },
  {
    id: "38",
    name: "Smart Coffee Maker",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1520970519539-8c9eaad9e8fa?w=300&q=80",
    isFavorite: true,
    category: "13", // Kitchen
  },
  {
    id: "39",
    name: "Wireless Gaming Headset",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&q=80",
    isFavorite: false,
    category: "14", // Gaming
    discount: 15,
  },
  {
    id: "40",
    name: "Smart Indoor Security Camera",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=300&q=80",
    isFavorite: true,
    category: "7", // Home
  },
];

export default function MoreProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleProductPress = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleFavoritePress = (productId) => {
    console.log("Favorite toggled for product:", productId);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Custom Header */}
      <View className="flex-row items-center px-4 py-2 border-b border-gray-200">
        <Pressable
          onPress={() => router.back()}
          className="p-2 rounded-full mr-4"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text className="text-xl font-bold flex-1 text-center pr-10">
          More Products
        </Text>
      </View>

      <FlatList
        data={additionalProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <View className="w-1/2 p-2">
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              isFavorite={item.isFavorite}
              discount={item.discount}
              discountEnds={item.discountEnds}
              onPress={() => handleProductPress(item.id)}
              onFavoritePress={() => handleFavoritePress(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
