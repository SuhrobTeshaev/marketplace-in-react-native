import React from "react";
import { View, Text, ScrollView, StatusBar, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import FeaturedProducts from "./components/FeaturedProducts";
import PopularProducts from "./components/PopularProducts";
import { useCart } from "./context/CartContext";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [favoritesCount, setFavoritesCount] = React.useState(3);

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const [selectedCategory, setSelectedCategory] = React.useState("1");

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId);
  };

  const handleViewAllFeatured = () => {
    console.log("View all featured products");
    // Navigate to featured products screen
  };

  const handleViewAllPopular = () => {
    router.push("/all-products");
  };

  const handleProductPress = (productId: string) => {
    console.log("Product pressed:", productId);
    // Navigate to product detail screen
  };

  const handleFavoritePress = (productId: string) => {
    console.log("Favorite toggled for product:", productId);
    // Toggle favorite status for product
  };

  // All products data with categories
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
      discount: 30,
      discountEnds: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
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

  // Filter products based on selected category and search query
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    const matchesCategory =
      selectedCategory === "1" || product.category === selectedCategory;

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(product.category)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function getCategoryName(categoryId) {
    const categories = {
      "1": "All",
      "2": "Fashion",
      "3": "Watches",
      "4": "Electronics",
      "5": "Audio",
      "6": "Gifts",
      "7": "Home",
      "8": "Deals",
      "9": "Laptops",
      "10": "Cameras",
      "11": "TVs",
      "12": "Books",
      "13": "Kitchen",
      "14": "Gaming",
    };
    return categories[categoryId] || "";
  }

  // Split filtered products into featured and popular
  const featuredProducts = filteredProducts.slice(
    0,
    Math.min(10, filteredProducts.length),
  );
  const popularProducts = filteredProducts.slice(
    Math.min(10, filteredProducts.length),
  );

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header onSearch={handleSearch} favoritesCount={favoritesCount} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <CategoryNav onSelectCategory={handleCategorySelect} />

        {featuredProducts.length > 0 && (
          <FeaturedProducts
            title={
              selectedCategory === "1"
                ? "Featured Products"
                : "Category Products"
            }
            viewAllText="View All"
            onViewAllPress={handleViewAllFeatured}
            bannerImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
            bannerTitle="Summer Sale"
            bannerSubtitle="Up to 50% off on selected items"
            products={featuredProducts}
          />
        )}

        <View className="py-2 bg-white">
          <Text className="text-center text-sm text-gray-500">
            Free shipping on orders over $50
          </Text>
        </View>

        {popularProducts.length > 0 && (
          <PopularProducts
            title={
              selectedCategory === "1" ? "Popular Right Now" : "More Products"
            }
            viewAllText="See All"
            products={popularProducts}
            onViewAllPress={handleViewAllPopular}
            onProductPress={handleProductPress}
            onFavoritePress={handleFavoritePress}
          />
        )}

        {filteredProducts.length === 0 && (
          <View className="py-10 items-center justify-center">
            <Text className="text-lg text-gray-500">
              No products found in this category
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
