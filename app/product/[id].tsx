import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, ShoppingCart, Check } from "lucide-react-native";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

// Sample product data - in a real app, this would come from an API
const productData = {
  "1": {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    isFavorite: true,
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals.",
    sizes: [],
    colors: ["Black", "Silver", "Blue"],
    inStock: true,
    rating: 4.7,
    reviews: 312,
  },
  "2": {
    id: "2",
    name: "Smart Watch Series 7",
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    isFavorite: false,
    description:
      "Advanced smartwatch with health monitoring, GPS, water resistance, and a beautiful retina display. Track your fitness goals and stay connected on the go.",
    sizes: ["40mm", "44mm"],
    colors: ["Black", "Silver", "Gold"],
    inStock: true,
    rating: 4.9,
    reviews: 427,
  },
  "3": {
    id: "3",
    name: "Premium Bluetooth Speaker",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    isFavorite: false,
    description:
      "Powerful Bluetooth speaker with 360° sound, waterproof design, and 20-hour battery life. Perfect for parties, outdoor activities, or just enjoying music at home.",
    sizes: [],
    colors: ["Black", "Blue", "Red"],
    inStock: true,
    rating: 4.5,
    reviews: 189,
  },
  "4": {
    id: "4",
    name: "Smartphone Gimbal Stabilizer",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    isFavorite: true,
    description:
      "Professional 3-axis gimbal stabilizer for smartphones. Create smooth, cinematic videos with intelligent tracking and various shooting modes.",
    sizes: [],
    colors: ["Black", "White"],
    inStock: true,
    rating: 4.6,
    reviews: 156,
  },
  "5": {
    id: "5",
    name: "Portable Power Bank 20000mAh",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    isFavorite: false,
    description:
      "High-capacity 20000mAh power bank with fast charging technology. Charge multiple devices simultaneously with USB-C and USB-A ports.",
    sizes: [],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    rating: 4.4,
    reviews: 203,
  },
  "6": {
    id: "6",
    name: "Wireless Charging Pad",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?w=800&q=80",
    isFavorite: true,
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek, minimalist design with LED indicator and anti-slip surface.",
    sizes: [],
    colors: ["Black", "White"],
    inStock: true,
    rating: 4.3,
    reviews: 178,
  },
  "7": {
    id: "7",
    name: "Smart Home Hub",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=800&q=80",
    isFavorite: false,
    description:
      "Central smart home hub that connects and controls all your smart devices. Compatible with voice assistants and features an intuitive mobile app.",
    sizes: [],
    colors: ["White", "Black"],
    inStock: true,
    rating: 4.7,
    reviews: 245,
  },
  "8": {
    id: "8",
    name: "Wireless Earbuds",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    isFavorite: true,
    description:
      "True wireless earbuds with premium sound quality, touch controls, and 24-hour battery life with the charging case. Water-resistant for workouts.",
    sizes: [],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    rating: 4.5,
    reviews: 312,
  },
  "9": {
    id: "9",
    name: "4K Action Camera",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    isFavorite: false,
    description:
      "Waterproof 4K action camera with image stabilization, slow-motion recording, and Wi-Fi connectivity. Perfect for capturing adventures and sports activities.",
    sizes: [],
    colors: ["Black", "Silver"],
    inStock: true,
    rating: 4.6,
    reviews: 187,
  },
  "10": {
    id: "10",
    name: "Mechanical Keyboard",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
    isFavorite: true,
    description:
      "Premium mechanical keyboard with RGB backlighting, programmable keys, and durable construction. Choose between different switch types for your perfect typing experience.",
    sizes: [],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    rating: 4.8,
    reviews: 256,
  },
  "11": {
    id: "11",
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    isFavorite: true,
    description:
      "A sleek, modern desk lamp with adjustable brightness and color temperature. Perfect for your home office or study area.",
    sizes: [],
    colors: ["Black", "White", "Silver"],
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  "12": {
    id: "12",
    name: "Ergonomic Office Chair",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
    isFavorite: false,
    description:
      "High-quality ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Designed for comfort during long work sessions.",
    sizes: [],
    colors: ["Black", "Gray", "Blue"],
    inStock: true,
    rating: 4.6,
    reviews: 215,
  },
};

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const product = productData[id as string];
  const [isFavoriteState, setIsFavoriteState] = useState(
    product?.isFavorite || false,
  );

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-medium">Product not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-full bg-blue-500 px-6 py-2"
        >
          <Text className="text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = () => {
    const newState = !isFavoriteState;
    setIsFavoriteState(newState);

    if (newState) {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    } else {
      removeFromFavorites(product.id);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="h-96 w-full"
          contentFit="cover"
        />
        <View className="absolute left-4 top-12 rounded-full bg-white/80 p-2">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
        </View>
        <Pressable
          onPress={handleToggleFavorite}
          className="absolute right-4 top-12 rounded-full bg-white/80 p-2"
        >
          <Heart
            size={24}
            color={isFavoriteState ? "#f43f5e" : "#000"}
            fill={isFavoriteState ? "#f43f5e" : "transparent"}
          />
        </Pressable>
      </View>

      {/* Product Info */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800">{product.name}</Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </Text>
          <View className="flex-row items-center">
            <Text className="mr-1 text-sm text-gray-600">
              {product.rating} ★
            </Text>
            <Text className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800">
            Description
          </Text>
          <Text className="mt-1 text-gray-600">{product.description}</Text>
        </View>

        {/* Colors */}
        {product.colors.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">Colors</Text>
            <View className="mt-2 flex-row">
              {product.colors.map((color) => (
                <View
                  key={color}
                  className="mr-2 rounded-md border border-gray-300 px-3 py-1"
                >
                  <Text>{color}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800">Sizes</Text>
            <View className="mt-2 flex-row">
              {product.sizes.map((size) => (
                <View
                  key={size}
                  className="mr-2 rounded-md border border-gray-300 px-3 py-1"
                >
                  <Text>{size}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Add to Cart Button */}
        <Pressable
          onPress={handleAddToCart}
          className={`mt-6 flex-row items-center justify-center rounded-full p-3 ${isInCart(product.id) ? "bg-green-500" : "bg-blue-600"}`}
        >
          {isInCart(product.id) ? (
            <>
              <Check size={20} color="#fff" />
              <Text className="ml-2 text-lg font-semibold text-white">
                Added to Cart
              </Text>
            </>
          ) : (
            <>
              <ShoppingCart size={20} color="#fff" />
              <Text className="ml-2 text-lg font-semibold text-white">
                Add to Cart
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
