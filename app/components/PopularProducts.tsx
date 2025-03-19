import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import ProductCard from "./ProductCard";

interface PopularProductsProps {
  title?: string;
  viewAllText?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    isFavorite: boolean;
  }>;
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
}

const PopularProducts = ({
  title = "Popular Products",
  viewAllText = "View All",
  products = [
    {
      id: "11",
      name: "Minimalist Desk Lamp",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "12",
      name: "Ergonomic Office Chair",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "13",
      name: 'Ultrawide Monitor 34"',
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "14",
      name: "Laptop Stand",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1611174797136-5e1a1e0e3e04?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "15",
      name: "Wireless Mouse",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "16",
      name: "External SSD 1TB",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "17",
      name: "Noise Cancelling Microphone",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "18",
      name: "Webcam HD 1080p",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1596566267081-7e152bb76942?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "19",
      name: "USB-C Hub",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "20",
      name: "Desk Organizer",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80",
      isFavorite: false,
    },
  ],
  onViewAllPress = () => {},
  onProductPress = () => {},
  onFavoritePress = () => {},
}: PopularProductsProps) => {
  const router = useRouter();

  return (
    <View className="bg-gray-50 py-4 px-2 h-[350px]">
      <View className="flex-row justify-between items-center mb-4 px-2">
        <Text className="text-xl font-bold text-gray-800">{title}</Text>
        <Pressable
          onPress={() => router.push("/all-products")}
          className="flex-row items-center"
        >
          <Text className="text-blue-600 mr-1">{viewAllText}</Text>
          <ArrowRight size={16} color="#2563eb" />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            isFavorite={product.isFavorite}
            discount={product.discount}
            discountEnds={product.discountEnds}
            onPress={() => router.push(`/product/${product.id}`)}
            onFavoritePress={() => onFavoritePress(product.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularProducts;
