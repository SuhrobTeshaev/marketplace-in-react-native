import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  discountEnds?: Date;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  getFavoritesCount: () => 0,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  // Load favorites from storage when component mounts or user changes
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (typeof localStorage !== "undefined" && isAuthenticated && user) {
          const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
          if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
          }
        } else if (!isAuthenticated) {
          // Clear favorites when user logs out
          setFavorites([]);
        }
      } catch (error) {
        console.error("Failed to load favorites from storage", error);
      }
    };

    loadFavorites();
  }, [isAuthenticated, user]);

  // Save favorites to storage whenever it changes
  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined" && isAuthenticated && user) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Failed to save favorites to storage", error);
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (item: FavoriteItem) => {
    if (!isAuthenticated) {
      // Handle not authenticated case
      console.log("User must be logged in to add favorites");
      return;
    }

    setFavorites((prevItems) => {
      // Check if item already exists in favorites
      const existingItemIndex = prevItems.findIndex(
        (favItem) => favItem.id === item.id,
      );

      if (existingItemIndex >= 0) {
        // Item already in favorites, do nothing
        return prevItems;
      } else {
        // Add new item to favorites
        return [...prevItems, item];
      }
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
