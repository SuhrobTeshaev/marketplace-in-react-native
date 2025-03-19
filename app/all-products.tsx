import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import ProductCard from "./components/ProductCard";
import { useCart } from "./context/CartContext";

// Define product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite: boolean;
  category: string;
};

export default function AllProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { title = "All Products" } = useLocalSearchParams();
  const { getCartItemCount } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PRODUCTS_PER_PAGE = 20; // 2 columns x 10 rows

  // All products data with categories (same as in index.tsx)
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Noise Cancelling Headphones",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      isFavorite: true,
      category: "5", // Audio
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
    {
      id: "15",
      name: "Wireless Mouse",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80",
      isFavorite: true,
      category: "4", // Electronics
    },
    {
      id: "16",
      name: "External SSD 1TB",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=300&q=80",
      isFavorite: false,
      category: "4", // Electronics
    },
    {
      id: "17",
      name: "Noise Cancelling Microphone",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&q=80",
      isFavorite: true,
      category: "5", // Audio
    },
    {
      id: "18",
      name: "Webcam HD 1080p",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1596566267081-7e152bb76942?w=300&q=80",
      isFavorite: false,
      category: "10", // Cameras
    },
    {
      id: "19",
      name: "USB-C Hub",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300&q=80",
      isFavorite: true,
      category: "4", // Electronics
    },
    {
      id: "20",
      name: "Desk Organizer",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80",
      isFavorite: false,
      category: "7", // Home
    },
    // Fashion items
    {
      id: "21",
      name: "Denim Jacket",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&q=80",
      isFavorite: true,
      category: "2", // Fashion
    },
    {
      id: "22",
      name: "Leather Boots",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80",
      isFavorite: false,
      category: "2", // Fashion
    },
    // Gifts
    {
      id: "23",
      name: "Gift Box Set",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80",
      isFavorite: true,
      category: "6", // Gifts
    },
    // Deals
    {
      id: "24",
      name: "Smart Doorbell",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?w=300&q=80",
      isFavorite: false,
      category: "8", // Deals
    },
    // TVs
    {
      id: "25",
      name: '4K Smart TV 55"',
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80",
      isFavorite: true,
      category: "11", // TVs
    },
    // Books
    {
      id: "26",
      name: "Programming Guide",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80",
      isFavorite: false,
      category: "12", // Books
    },
    // Kitchen
    {
      id: "27",
      name: "Coffee Maker",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1570486829859-a7b3a2f2beb7?w=300&q=80",
      isFavorite: true,
      category: "13", // Kitchen
    },
    // Gaming
    {
      id: "28",
      name: "Gaming Controller",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=300&q=80",
      isFavorite: false,
      category: "14", // Gaming
    },
  ];

  useEffect(() => {
    // Get products from params or use all products
    const { categoryId } = useLocalSearchParams();
    const filteredProducts =
      categoryId && categoryId !== "1"
        ? allProducts.filter((product) => product.category === categoryId)
        : allProducts;

    setProducts(filteredProducts);
    loadMoreProducts(1, filteredProducts);
    setLoading(false);
  }, []);

  const loadMoreProducts = (
    pageNum: number,
    productsList: Product[] = products
  ) => {
    const start = (pageNum - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;

    if (start >= productsList.length) {
      setHasMore(false);
      return;
    }

    const newItems = productsList.slice(start, end);

    if (pageNum === 1) {
      setDisplayedProducts(newItems);
    } else {
      setDisplayedProducts((prev) => [...prev, ...newItems]);
    }

    setPage(pageNum);
    setHasMore(end < productsList.length);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMoreProducts(page + 1);
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleFavoritePress = (productId: string) => {
    // Toggle favorite status
    console.log("Favorite toggled for product:", productId);
  };

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View className="py-4 items-center justify-center">
        <ActivityIndicator size="small" color="#2563eb" />
        <Text className="text-sm text-gray-500 mt-2">
          Loading more products...
        </Text>
      </View>
    );
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
          {title}
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-2 text-gray-500">Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={displayedProducts}
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
                onPress={() => handleProductPress(item.id)}
                onFavoritePress={() => handleFavoritePress(item.id)}
              />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-lg text-gray-500">No products found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
