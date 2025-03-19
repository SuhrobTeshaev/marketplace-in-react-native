import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  Home,
  Package,
  User,
  Settings,
  HelpCircle,
} from "lucide-react-native";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onSearch?: (text: string) => void;
  favoritesCount?: number;
}

const Header = ({
  onSearch = (text) => console.log("Searching for:", text),
  favoritesCount = 0,
}: HeaderProps) => {
  const router = useRouter();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [searchText, setSearchText] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (route:any) => {
    setMenuVisible(false);
    router.push(route);
  };

  const menuItems = [
    { icon: <Home size={20} color="#000" />, label: "Home", route: "/" as const },
    {
      icon: <Package size={20} color="#000" />,
      label: "Categories",
      route: "/categories" as const,
    },
    {
      icon: <Heart size={20} color="#000" />,
      label: "Favorites",
      route: "/favorites" as const,
    },
    {
      icon: <ShoppingCart size={20} color="#000" />,
      label: "Cart",
      route: "/cart" as const,
    },
    {
      icon: <User size={20} color="#000" />,
      label: "Profile",
      route: "/profile" as const,
    },
    {
      icon: <Settings size={20} color="#000" />,
      label: "Settings",
      route: "/settings" as const,
    },
    {
      icon: <HelpCircle size={20} color="#000" />,
      label: "Help",
      route: "/help" as const,
    },
  ];

  return (
    <View className="bg-white w-full px-4 pt-12 pb-2 border-b border-gray-200 shadow-sm">
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <View className="flex-1 bg-black/50">
          <View className="bg-white h-full w-3/4 shadow-lg">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-xl font-bold">Menu</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView className="flex-1">
              {menuItems.map((item, index) => (
                <Pressable
                  key={index}
                  className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-100"
                  onPress={() => navigateTo(item.route)}
                >
                  <View className="mr-3">{item.icon}</View>
                  <Text className="text-base">{item.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <Pressable
            className="absolute top-0 right-0 bottom-0 left-0 z-[-1]"
            onPress={toggleMenu}
          />
        </View>
      </Modal>

      <View className="flex-row items-center justify-between mb-2">
        <TouchableOpacity onPress={toggleMenu}>
          <Menu size={24} color="#000" />
        </TouchableOpacity>

        <Text className="text-xl font-bold">ShopApp</Text>

        <View className="flex-row">
          <TouchableOpacity
            className="mr-4 relative"
            onPress={() => router.push("/favorites")}
          >
            <Heart size={24} color="#000" />
            {favoritesCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {favoritesCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="relative"
            onPress={() => router.push("/cart")}
          >
            <ShoppingCart size={24} color="#000" />
            {cartItemCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2">
        <Search size={20} color="#6b7280" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

export default Header;
