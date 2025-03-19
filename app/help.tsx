import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "./components/Header";
import {
  ChevronRight,
  ChevronDown,
  MessageCircle,
  FileText,
  Phone,
} from "lucide-react-native";

export default function HelpScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information, then confirm your order.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, PayPal, and Apple Pay. All transactions are secure and encrypted for your safety.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order in the 'My Orders' section of your profile. Each order has a unique tracking number that you can use to check its status.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Items can be returned within 30 days of delivery. They must be in original condition with tags attached. Refunds are typically processed within 5-7 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options during checkout.",
    },
    {
      question: "How do I change or cancel my order?",
      answer:
        "You can change or cancel your order within 1 hour of placing it. After that, please contact our customer support team for assistance.",
    },
  ];

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const handleContactSupport = (method) => {
    Alert.alert(
      "Contact Support",
      `This would open the ${method} support channel in a real app.`,
      [{ text: "OK" }],
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Help & Support</Text>

        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="bg-gray-50 p-4 rounded-xl flex-1 mr-2 items-center"
            onPress={() => handleContactSupport("chat")}
          >
            <MessageCircle size={24} color="#4f46e5" />
            <Text className="mt-2 text-center">Chat Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-50 p-4 rounded-xl flex-1 mx-2 items-center"
            onPress={() => handleContactSupport("email")}
          >
            <FileText size={24} color="#4f46e5" />
            <Text className="mt-2 text-center">Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-50 p-4 rounded-xl flex-1 ml-2 items-center"
            onPress={() => handleContactSupport("phone")}
          >
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
              onPress={() => toggleFaq(index)}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-medium flex-1 pr-2">
                  {item.question}
                </Text>
                {expandedFaq === index ? (
                  <ChevronDown size={20} color="#6b7280" />
                ) : (
                  <ChevronRight size={20} color="#6b7280" />
                )}
              </View>
              {expandedFaq === index && (
                <Text className="text-gray-500 mt-2">{item.answer}</Text>
              )}
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
