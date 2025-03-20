import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import { ArrowRight } from "lucide-react-native";
import ProductCard from "./components/ProductCard";
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

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // All products data with categories (same as in index.tsx)
  const allProducts = [
    {
      id: "1",
      name: "Wireless Noise Cancelling Headphones",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      isFavorite: true,
      category: "5", // Audio
      discount: 15,
      discountEnds: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    },
    {
      id: "2",
      name: "Smart Watch Series 7",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
      isFavorite: false,
      category: "3", // Watches
    },
    {
      id: "3",
      name: "Premium Bluetooth Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
      isFavorite: false,
      category: "5", // Audio
      discount: 20,
      discountEnds: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      name: "Smartphone Gimbal Stabilizer",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80",
      isFavorite: true,
      category: "4", // Electronics
    },
    {
      id: "5",
      name: "Portable Power Bank 20000mAh",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80",
      isFavorite: false,
      category: "4", // Electronics
    },
    {
      id: "6",
      name: "Wireless Charging Pad",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?w=300&q=80",
      isFavorite: true,
      category: "4", // Electronics
    },
    {
      id: "7",
      name: "Smart Home Hub",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=300&q=80",
      isFavorite: false,
      category: "7", // Home
    },
    {
      id: "8",
      name: "Wireless Earbuds",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80",
      isFavorite: true,
      category: "5", // Audio
      discount: 25,
    },
    {
      id: "9",
      name: "4K Action Camera",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
      isFavorite: false,
      category: "10", // Cameras
    },
    {
      id: "10",
      name: "Mechanical Keyboard",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80",
      isFavorite: true,
      category: "4", // Electronics
    },
    {
      id: "11",
      name: "Minimalist Desk Lamp",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
      isFavorite: true,
      category: "7", // Home
    },
    {
      id: "12",
      name: "Ergonomic Office Chair",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80",
      isFavorite: false,
      category: "7", // Home
    },
    {
      id: "13",
      name: 'Ultrawide Monitor 34"',
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80",
      isFavorite: true,
      category: "9", // Laptops
    },
    {
      id: "14",
      name: "Laptop Stand",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1611174797136-5e1a1e0e3e04?w=300&q=80",
      isFavorite: false,
      category: "9", // Laptops
    },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (categoryId === "1") {
        setCategoryProducts(allProducts);
      } else {
        const filtered = allProducts.filter(
          (product) => product.category === categoryId,
        );
        setCategoryProducts(filtered);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // Load all products initially
    setCategoryProducts(allProducts);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <View className="flex-1">
        <ScrollView className="p-4">
          <Text className="text-2xl font-bold mb-4">Categories</Text>
          <CategoryNav onSelectCategory={handleCategorySelect} />

          {/* Category Cards - Ozon Style */}
          <View className="flex-row flex-wrap mt-4">
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-1/3 p-2"
                onPress={() => handleCategorySelect(item.id)}
              >
                <View className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-24"
                    contentFit="cover"
                  />
                  <View className="p-2 items-center">
                    <Text className="font-medium text-center text-sm">
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Products for selected category */}
          {selectedCategory !== "1" && (
            <View className="mt-6">
              <Text className="text-xl font-bold mb-4">
                {categories.find((c) => c.id === selectedCategory)?.name ||
                  "All"}{" "}
                Products
              </Text>

              {loading ? (
                <View className="py-10 items-center">
                  <ActivityIndicator size="large" color="#3b82f6" />
                  <Text className="mt-2 text-gray-500">
                    Loading products...
                  </Text>
                </View>
              ) : categoryProducts.length > 0 ? (
                <View className="flex-row flex-wrap">
                  {categoryProducts.map((product) => (
                    <View key={product.id} className="w-1/2 p-2">
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        isFavorite={product.isFavorite}
                        discount={product.discount}
                        discountEnds={product.discountEnds}
                        onPress={() => router.push(`/product/${product.id}`)}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View className="py-10 items-center">
                  <Text className="text-gray-500">
                    No products found in this category
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
