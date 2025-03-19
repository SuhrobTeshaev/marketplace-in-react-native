import React, { createContext, useState, useContext, useEffect } from "react";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    home: "Home",
    categories: "Categories",
    favorites: "Favorites",
    cart: "Cart",
    profile: "Profile",
    settings: "Settings",
    help: "Help",
    search: "Search products or categories...",
    featuredProducts: "Featured Products",
    popularRightNow: "Popular Right Now",
    viewAll: "View All",
    seeAll: "See All",
    freeShipping: "Free shipping on orders over $50",
    noProductsFound: "No products found in this category",
    theme: "Theme",
    language: "Language",
    chooseTheme:
      "Choose how ShopApp looks to you. Select a light theme for a bright look, or a dark theme to reduce eye strain in low light.",
    chooseLanguage:
      "Select your preferred language. This will change the language throughout the app.",
    light: "Light",
    dark: "Dark",
    systemDefault: "System Default",
    signIn: "Sign In",
    signOut: "Sign Out",
    personalInfo: "Personal Information",
    myOrders: "My Orders",
    paymentMethods: "Payment Methods",
    myFavorites: "My Favorites",
    shoppingCart: "Shopping Cart",
    yourProfile: "Your Profile",
    noFavorites: "You haven't added any favorites yet.",
    browseProducts: "Browse Products",
    comingSoon: "Coming Soon",
    featureNotImplemented: "This feature is not yet implemented.",
    confirmSignOut: "Are you sure you want to sign out?",
    cancel: "Cancel",
    loadingProducts: "Loading products...",
    noProductsFoundSearch: "No products found",
    loadingMoreProducts: "Loading more products...",
    allProducts: "All Products",
  },
  ru: {
    home: "Главная",
    categories: "Категории",
    favorites: "Избранное",
    cart: "Корзина",
    profile: "Профиль",
    settings: "Настройки",
    help: "Помощь",
    search: "Поиск товаров или категорий...",
    featuredProducts: "Рекомендуемые товары",
    popularRightNow: "Популярное сейчас",
    viewAll: "Смотреть все",
    seeAll: "Показать все",
    freeShipping: "Бесплатная доставка при заказе от $50",
    noProductsFound: "В этой категории нет товаров",
    theme: "Тема",
    language: "Язык",
    chooseTheme:
      "Выберите, как будет выглядеть ShopApp. Выберите светлую тему для яркого вида или темную тему для уменьшения нагрузки на глаза при слабом освещении.",
    chooseLanguage:
      "Выберите предпочитаемый язык. Это изменит язык во всем приложении.",
    light: "Светлая",
    dark: "Темная",
    systemDefault: "Системная",
    signIn: "Войти",
    signOut: "Выйти",
    personalInfo: "Личная информация",
    myOrders: "Мои заказы",
    paymentMethods: "Способы оплаты",
    myFavorites: "Мое избранное",
    shoppingCart: "Корзина покупок",
    yourProfile: "Ваш профиль",
    noFavorites: "Вы еще не добавили избранное.",
    browseProducts: "Просмотреть товары",
    comingSoon: "Скоро",
    featureNotImplemented: "Эта функция еще не реализована.",
    confirmSignOut: "Вы уверены, что хотите выйти?",
    cancel: "Отмена",
    loadingProducts: "Загрузка товаров...",
    noProductsFoundSearch: "Товары не найдены",
    loadingMoreProducts: "Загрузка дополнительных товаров...",
    allProducts: "Все товары",
  },
  es: {
    home: "Inicio",
    categories: "Categorías",
    favorites: "Favoritos",
    cart: "Carrito",
    profile: "Perfil",
    settings: "Configuración",
    help: "Ayuda",
    search: "Buscar productos o categorías...",
    featuredProducts: "Productos destacados",
    popularRightNow: "Popular ahora",
    viewAll: "Ver todo",
    seeAll: "Ver todos",
    freeShipping: "Envío gratis en pedidos superiores a $50",
    noProductsFound: "No se encontraron productos en esta categoría",
    theme: "Tema",
    language: "Idioma",
    chooseTheme:
      "Elige cómo se ve ShopApp. Selecciona un tema claro para un aspecto brillante o un tema oscuro para reducir la fatiga visual con poca luz.",
    chooseLanguage:
      "Selecciona tu idioma preferido. Esto cambiará el idioma en toda la aplicación.",
    light: "Claro",
    dark: "Oscuro",
    systemDefault: "Predeterminado del sistema",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    personalInfo: "Información personal",
    myOrders: "Mis pedidos",
    paymentMethods: "Métodos de pago",
    myFavorites: "Mis favoritos",
    shoppingCart: "Carrito de compras",
    yourProfile: "Tu perfil",
    noFavorites: "Aún no has añadido favoritos.",
    browseProducts: "Explorar productos",
    comingSoon: "Próximamente",
    featureNotImplemented: "Esta función aún no está implementada.",
    confirmSignOut: "¿Estás seguro de que quieres cerrar sesión?",
    cancel: "Cancelar",
    loadingProducts: "Cargando productos...",
    noProductsFoundSearch: "No se encontraron productos",
    loadingMoreProducts: "Cargando más productos...",
    allProducts: "Todos los productos",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Load language from storage when component mounts
    const loadLanguage = async () => {
      try {
        if (typeof localStorage !== "undefined") {
          const savedLanguage = localStorage.getItem("language");
          if (savedLanguage) {
            setLanguage(savedLanguage);
          }
        }
      } catch (error) {
        console.error("Failed to load language from storage", error);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    // Save language to storage whenever it changes
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("language", language);
      }
    } catch (error) {
      console.error("Failed to save language to storage", error);
    }
  }, [language]);

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English if translation not found
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    // Return key if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
