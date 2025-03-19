import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo123",
    },
    {
      id: "2",
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=test123",
    },
  ];

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        if (typeof localStorage !== "undefined") {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password,
        );

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          try {
            if (typeof localStorage !== "undefined") {
              localStorage.setItem("user", JSON.stringify(userWithoutPassword));
            }
          } catch (error) {
            console.error("Failed to save user to storage", error);
          }
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to remove user from storage", error);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = mockUsers.some((u) => u.email === email);

        if (userExists) {
          resolve(false);
          return;
        }

        // Create new user
        const newUser = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        // In a real app, you would add the user to the database
        // For this demo, we'll just log it
        console.log("New user registered:", newUser);

        // Log in the new user
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        try {
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          }
        } catch (error) {
          console.error("Failed to save user to storage", error);
        }

        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
