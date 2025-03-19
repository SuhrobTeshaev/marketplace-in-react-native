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

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register } = useAuth();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const success = await register(name, email, password);
      if (success) {
        router.replace("/");
      } else {
        Alert.alert("Registration Failed", "Email may already be in use");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during registration");
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
                Register
              </Text>
              <Text
                className={`text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Create a new account
              </Text>
            </View>

            <View className="mb-4">
              <Text
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
                placeholder="Enter your name"
                placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                value={name}
                onChangeText={setName}
              />
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

            <View className="mb-4">
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

            <View className="mb-6">
              <Text
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
                placeholder="Confirm your password"
                placeholderTextColor={isDarkMode ? "#9ca3af" : "#9ca3af"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              className={`py-3 rounded-lg ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold text-base">
                  Register
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push("/login")}
            >
              <Text
                className={`text-center ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
