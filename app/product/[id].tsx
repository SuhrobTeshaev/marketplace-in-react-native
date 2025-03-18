import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, ShoppingCart, Check } from "lucide-react-native";
import { useCart } from "../context/CartContext";

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
      "High-quality ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Designed for comfort during long work hours.",
    sizes: [],
    colors: ["Black", "Gray"],
    inStock: true,
    rating: 4.8,
    reviews: 256,
  },
  "13": {
    id: "13",
    name: 'Ultrawide Monitor 34"',
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    isFavorite: true,
    description:
      "34-inch ultrawide curved monitor with 3440x1440 resolution, 144Hz refresh rate, and HDR support. Immersive viewing experience for work and gaming.",
    sizes: [],
    colors: ["Black"],
    inStock: true,
    rating: 4.9,
    reviews: 178,
  },
  "14": {
    id: "14",
    name: "Laptop Stand",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1611174797136-5e1a1e0e3e04?w=800&q=80",
    isFavorite: false,
    description:
      "Adjustable aluminum laptop stand that elevates your screen to eye level. Improves posture and keeps your laptop cool with better airflow.",
    sizes: [],
    colors: ["Silver", "Black", "Space Gray"],
    inStock: true,
    rating: 4.6,
    reviews: 203,
  },
  "15": {
    id: "15",
    name: "Wireless Mouse",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    isFavorite: true,
    description:
      "Ergonomic wireless mouse with precision tracking, programmable buttons, and long battery life. Comfortable design for all-day use.",
    sizes: [],
    colors: ["Black", "Gray", "Blue"],
    inStock: true,
    rating: 4.7,
    reviews: 189,
  },
  "16": {
    id: "16",
    name: "External SSD 1TB",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800&q=80",
    isFavorite: false,
    description:
      "Ultra-fast 1TB external SSD with USB-C connectivity. Compact, durable design with transfer speeds up to 1050MB/s for quick file access.",
    sizes: ["500GB", "1TB", "2TB"],
    colors: ["Black", "Silver"],
    inStock: true,
    rating: 4.8,
    reviews: 234,
  },
  "17": {
    id: "17",
    name: "Noise Cancelling Microphone",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
    isFavorite: true,
    description:
      "Professional USB microphone with noise cancellation technology. Perfect for podcasting, streaming, and video conferencing with crystal clear audio.",
    sizes: [],
    colors: ["Black", "Silver"],
    inStock: true,
    rating: 4.6,
    reviews: 167,
  },
  "18": {
    id: "18",
    name: "Webcam HD 1080p",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1596566267081-7e152bb76942?w=800&q=80",
    isFavorite: false,
    description:
      "Full HD 1080p webcam with auto light correction and built-in microphone. Ideal for video calls, streaming, and content creation.",
    sizes: [],
    colors: ["Black"],
    inStock: true,
    rating: 4.5,
    reviews: 156,
  },
  "19": {
    id: "19",
    name: "USB-C Hub",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&q=80",
    isFavorite: true,
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Expand your laptop's connectivity with this compact adapter.",
    sizes: [],
    colors: ["Silver", "Space Gray"],
    inStock: true,
    rating: 4.4,
    reviews: 189,
  },
  "20": {
    id: "20",
    name: "Desk Organizer",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    isFavorite: false,
    description:
      "Multifunctional desk organizer with compartments for stationery, devices, and accessories. Keep your workspace tidy and efficient.",
    sizes: [],
    colors: ["Black", "White", "Walnut"],
    inStock: true,
    rating: 4.3,
    reviews: 145,
  },
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, isInCart: checkIsInCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [isInCart, setIsInCart] = React.useState(false);
  const [addedToCartAnimation, setAddedToCartAnimation] = React.useState(false);

  // Get product data based on ID
  const product = productData[id as string] || {
    id: "unknown",
    name: "Product Not Found",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80",
    isFavorite: false,
    description: "This product could not be found.",
    sizes: [],
    colors: [],
    inStock: false,
    rating: 0,
    reviews: 0,
  };

  const handleAddToCart = () => {
    // Add the product to the cart context
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      color: selectedColor,
      size: selectedSize,
    });

    // Show animation
    setAddedToCartAnimation(true);
    setTimeout(() => {
      setAddedToCartAnimation(false);
    }, 2000);

    // Update cart status
    setIsInCart(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 flex-row justify-between items-center">
        <Pressable onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text className="text-lg font-bold">Product Details</Text>
        <Pressable onPress={toggleFavorite} className="p-2">
          <Heart
            size={24}
            color={isFavorite ? "#f43f5e" : "#000"}
            fill={isFavorite ? "#f43f5e" : "none"}
          />
        </Pressable>
      </View>

      <ScrollView className="flex-1">
        {/* Product Image */}
        <View className="w-full h-[300px] bg-gray-100">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-sm text-gray-500 mb-1">ID: {product.id}</Text>
          <Text className="text-2xl font-bold mb-1">{product.name}</Text>
          <View className="flex-row items-center mb-4">
            <Text className="text-xl font-bold text-blue-600 mr-2">
              ${product.price.toFixed(2)}
            </Text>
            {product.inStock ? (
              <Text className="text-green-600 text-sm">In Stock</Text>
            ) : (
              <Text className="text-red-600 text-sm">Out of Stock</Text>
            )}
          </View>

          {/* Rating */}
          {product.rating > 0 && (
            <View className="flex-row items-center mb-4">
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} className="text-yellow-500 text-lg mr-1">
                    {star <= Math.floor(product.rating) ? "★" : "☆"}
                  </Text>
                ))}
              </View>
              <Text className="text-gray-600 ml-2">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </Text>
            </View>
          )}

          {/* Description */}
          <Text className="text-base text-gray-700 mb-6">
            {product.description}
          </Text>

          {/* Sizes if applicable */}
          {product.sizes && product.sizes.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold mb-2">Size</Text>
              <View className="flex-row flex-wrap">
                {product.sizes.map((size) => (
                  <Pressable
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`mr-3 mb-2 px-4 py-2 rounded-full border ${selectedSize === size ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                  >
                    <Text
                      className={`font-medium ${selectedSize === size ? "text-white" : "text-gray-700"}`}
                    >
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Colors if applicable */}
          {product.colors && product.colors.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold mb-2">Color</Text>
              <View className="flex-row flex-wrap">
                {product.colors.map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className={`mr-3 mb-2 px-4 py-2 rounded-full border ${selectedColor === color ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                  >
                    <Text
                      className={`font-medium ${selectedColor === color ? "text-white" : "text-gray-700"}`}
                    >
                      {color}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View className="p-4 border-t border-gray-200">
        <Pressable
          onPress={handleAddToCart}
          className={`py-3 rounded-lg flex-row justify-center items-center ${addedToCartAnimation ? "bg-green-600" : isInCart ? "bg-blue-800" : "bg-blue-600"}`}
        >
          {addedToCartAnimation ? (
            <>
              <Check size={20} color="#fff" />
              <Text className="text-white font-bold ml-2">Added to Cart</Text>
            </>
          ) : isInCart ? (
            <>
              <ShoppingCart size={20} color="#fff" />
              <Text className="text-white font-bold ml-2">Already in Cart</Text>
            </>
          ) : (
            <>
              <ShoppingCart size={20} color="#fff" />
              <Text className="text-white font-bold ml-2">Add to Cart</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}
