import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Header from "./components/Header";
import {
  ChevronRight,
  MessageCircle,
  FileText,
  Phone,
} from "lucide-react-native";

export default function HelpScreen() {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add items to your cart, and proceed to checkout.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and Apple Pay.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order in the 'My Orders' section of your profile.",
    },
    {
      question: "What is your return policy?",
      answer: "Items can be returned within 30 days of delivery.",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Help & Support</Text>

        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="bg-gray-50 p-4 rounded-xl flex-1 mr-2 items-center">
            <MessageCircle size={24} color="#4f46e5" />
            <Text className="mt-2 text-center">Chat Support</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-50 p-4 rounded-xl flex-1 mx-2 items-center">
            <FileText size={24} color="#4f46e5" />
            <Text className="mt-2 text-center">Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-50 p-4 rounded-xl flex-1 ml-2 items-center">
            <Phone size={24} color="#4f46e5" />
            <Text className="mt-2 text-center">Call Us</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold mb-3">
          Frequently Asked Questions
        </Text>

        <View className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
          {faqItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="p-4 border-b border-gray-100 active:bg-gray-50"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-medium flex-1 pr-2">
                  {item.question}
                </Text>
                <ChevronRight size={20} color="#6b7280" />
              </View>
              <Text className="text-gray-500 mt-1">{item.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-gray-50 p-4 rounded-xl mb-4">
          <Text className="text-base font-medium mb-2">
            Contact Information
          </Text>
          <Text className="text-gray-500">Email: support@shopapp.com</Text>
          <Text className="text-gray-500">Phone: +1 (555) 123-4567</Text>
          <Text className="text-gray-500">Hours: Mon-Fri, 9am-5pm EST</Text>
        </View>
      </ScrollView>
    </View>
  );
}
