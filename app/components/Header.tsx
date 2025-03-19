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
  LogIn,
} from "lucide-react-native";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

interface HeaderProps {
  onSearch?: (text: string) => void;
}

const Header = ({
  onSearch = (text) => console.log("Searching for:", text),
}: HeaderProps) => {
  const router = useRouter();
  const { getCartItemCount } = useCart();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const { getFavoritesCount } = useFavorites();

  const cartItemCount = getCartItemCount();
  const favoritesCount = getFavoritesCount();
  const [searchText, setSearchText] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleClearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (route: string) => {
    setMenuVisible(false);
    router.push(route);
  };

  const menuItems = [
    {
      icon: <Home size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("home"),
      route: "/",
    },
    {
      icon: <Package size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("categories"),
      route: "/categories",
    },
    {
      icon: <Heart size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("favorites"),
      route: "/favorites",
    },
    {
      icon: <ShoppingCart size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("cart"),
      route: "/cart",
    },
    {
      icon: <User size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("profile"),
      route: "/profile",
    },
    {
      icon: <Settings size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("settings"),
      route: "/settings",
    },
    {
      icon: <HelpCircle size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("help"),
      route: "/help",
    },
  ];

  if (!isAuthenticated) {
    menuItems.push({
      icon: <LogIn size={20} color={isDarkMode ? "#fff" : "#000"} />,
      label: t("signIn"),
      route: "/login",
    });
  }

  return (
    <View
      className={`w-full px-4 pt-12 pb-2 border-b shadow-sm ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <View className="flex-1 bg-black/50">
          <View
            className={`h-full w-3/4 shadow-lg ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <View
              className={`flex-row justify-between items-center p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              <Text
                className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
              >
                Menu
              </Text>
              <TouchableOpacity onPress={toggleMenu}>
                <X size={24} color={isDarkMode ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>
            <ScrollView className="flex-1">
              {menuItems.map((item, index) => (
                <Pressable
                  key={index}
                  className={`flex-row items-center p-4 border-b ${isDarkMode ? "border-gray-800 active:bg-gray-800" : "border-gray-100 active:bg-gray-100"}`}
                  onPress={() => navigateTo(item.route)}
                >
                  <View className="mr-3">{item.icon}</View>
                  <Text
                    className={`text-base ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    {item.label}
                  </Text>
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
          <Menu size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>

        <Text
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          ShopApp
        </Text>

        <View className="flex-row">
          <TouchableOpacity
            className="mr-4 relative"
            onPress={() => router.push("/favorites")}
          >
            <Heart size={24} color={isDarkMode ? "#fff" : "#000"} />
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
            <ShoppingCart size={24} color={isDarkMode ? "#fff" : "#000"} />
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

      <View
        className={`flex-row items-center rounded-full px-3 py-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <Search size={20} color="#6b7280" />
        <TextInput
          className={`flex-1 ml-2 text-base ${isDarkMode ? "text-white" : "text-black"}`}
          placeholder={t("search")}
          placeholderTextColor="#6b7280"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearch(text); // Search as you type
          }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText ? (
          <Pressable onPress={handleClearSearch} className="p-1">
            <X size={16} color="#6b7280" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
