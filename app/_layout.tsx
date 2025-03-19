import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { Platform } from "react-native";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider as AppThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_TEMPO && Platform.OS === "web") {
      const { TempoDevtools } = require("tempo-devtools");
      TempoDevtools.init();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <AppThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <FavoritesProvider>
                <Stack
                  screenOptions={({ route }) => ({
                    headerShown: !route.name.startsWith("tempobook"),
                  })}
                >
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="cart" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="all-products"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="more-products"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="categories"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="favorites"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="help" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="profile"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="settings"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="settings/language"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="settings/theme"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="register"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="product/[id]"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="404" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
              </FavoritesProvider>
            </CartProvider>
          </LanguageProvider>
        </AppThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
