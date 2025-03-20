import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import ProductCard from "./ProductCard";

interface FeaturedProductsProps {
  title?: string;
  viewAllText?: string;
  onViewAllPress?: () => void;
  bannerImage?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    isFavorite: boolean;
  }>;
}

const FeaturedProducts = ({
  title = "Featured Products",
  viewAllText = "View All",
  onViewAllPress = () => {},
  bannerImage = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
  bannerTitle = "Summer Sale",
  bannerSubtitle = "Up to 50% off",
  products = [
    {
      id: "1",
      name: "Wireless Noise Cancelling Headphones",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Smart Watch Series 7",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Premium Bluetooth Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "4",
      name: "Smartphone Gimbal Stabilizer",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "5",
      name: "Portable Power Bank 20000mAh",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "6",
      name: "Wireless Charging Pad",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "7",
      name: "Smart Home Hub",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "8",
      name: "Wireless Earbuds",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80",
      isFavorite: true,
    },
    {
      id: "9",
      name: "4K Action Camera",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
      isFavorite: false,
    },
    {
      id: "10",
      name: "Mechanical Keyboard",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80",
      isFavorite: true,
    },
  ],
}: FeaturedProductsProps) => {
  const router = useRouter();

  return (
    <View className="bg-gray-50 py-4">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-lg font-bold">{title}</Text>
        <Pressable onPress={onViewAllPress} className="flex-row items-center">
          <Text
            className="text-blue-600 mr-1"
            onPress={() => router.push("/all-products")}
          >
            {viewAllText}
          </Text>
          <ChevronRight size={16} color="#2563eb" />
        </Pressable>
      </View>

      {/* Promotional Banner Slideshow */}
      <BannerSlideshow />

      {/* Products Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
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
            onFavoritePress={() =>
              console.log(`Favorite ${product.id} toggled`)
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Banner Slideshow Component
const BannerSlideshow = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners = [
    {
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
      title: "New Arrivals",
      subtitle: "Check out our latest products",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
      title: "Tech Deals",
      subtitle: "Save big on electronics",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&q=80",
      title: "Free Shipping",
      subtitle: "On orders over $50",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mx-4 mb-4 rounded-lg overflow-hidden h-[100px]">
      <Image
        source={{ uri: banners[currentBannerIndex].image }}
        className="absolute w-full h-full"
        contentFit="cover"
        transition={1000}
      />
      <View className="absolute inset-0 bg-black/30" />
      <View className="p-4 justify-center h-full">
        <Text className="text-white font-bold text-xl">
          {banners[currentBannerIndex].title}
        </Text>
        <Text className="text-white text-sm">
          {banners[currentBannerIndex].subtitle}
        </Text>
      </View>

      {/* Dots indicator */}
      <View className="absolute bottom-2 w-full flex-row justify-center">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${index === currentBannerIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </View>
    </View>
  );
};

export default FeaturedProducts;
