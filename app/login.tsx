import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "./context/AuthContext";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.replace("/");
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      style={{ paddingTop: insets.top }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="p-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full self-start"
            >
              <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#000"} />
            </TouchableOpacity>

            <View className="mt-8 mb-6">
              <Text
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {t("signIn")}
              </Text>
              <Text
                className={`text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Sign in to access your account
              </Text>
            </View>

            <View className="mb-4">
              <Text
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
                placeholder="Enter your email"
                placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </Text>
              <View
                className={`flex-row items-center border rounded-lg ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-white"
                }`}
              >
                <TextInput
                  className={`flex-1 p-3 text-base ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={toggleShowPassword} className="px-3">
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      color={isDarkMode ? "#9ca3af" : "#6b7280"}
                    />
                  ) : (
                    <Eye size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className={`py-3 rounded-lg ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold text-base">
                  {t("signIn")}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push("/register")}
            >
              <Text
                className={`text-center ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Don't have an account? Register
              </Text>
            </TouchableOpacity>

            <View className="mt-8">
              <Text
                className={`text-center text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Demo credentials:
              </Text>
              <Text
                className={`text-center text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Email: demo@example.com
              </Text>
              <Text
                className={`text-center text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Password: password123
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
