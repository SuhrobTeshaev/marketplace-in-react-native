import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Minus, Plus, ArrowLeft, Trash2 } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "./context/CartContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row p-4 border-b border-gray-200">
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-md" />
      <View className="flex-1 ml-4 justify-between">
        <View>
          <Text className="text-base font-medium">{item.name}</Text>
          <Text className="text-gray-600">${item.price.toFixed(2)}</Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
          >
            <Minus size={16} color="#000" />
          </TouchableOpacity>

          <Text className="mx-3 text-base">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
          >
            <Plus size={16} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            className="ml-auto"
          >
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Shopping Cart</Text>
        <Text className="ml-auto text-sm text-gray-500">
          {cartItems.length} items
        </Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            className="flex-1"
          />

          <View className="p-4 border-t border-gray-200">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="font-medium">${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="font-medium">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </Text>
            </View>

            {shipping > 0 && (
              <Text className="text-sm text-gray-500 mb-2">
                Add ${(50 - subtotal).toFixed(2)} more to get free shipping
              </Text>
            )}

            <View className="flex-row justify-between mb-4 pt-2 border-t border-gray-200">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold">${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              className="bg-black py-4 rounded-full items-center"
              onPress={() => console.log("Proceed to checkout")}
            >
              <Text className="text-white font-bold text-base">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-xl font-medium mb-2">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mb-6">
            Looks like you haven't added any products to your cart yet.
          </Text>
          <TouchableOpacity
            className="bg-black py-3 px-6 rounded-full"
            onPress={() => router.push("/")}
          >
            <Text className="text-white font-bold">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
