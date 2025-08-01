import React from "react";
import { View, Text } from "react-native";
import {  ArrowDownLeft, ArrowUpRight } from "lucide-react-native";

interface HistoryItemData {
  id: number;
  type: "earned" | "claimed";
  title: string;
  description: string;
  points: string;
  date: string;
}

interface HistoryItemProps {
  item: HistoryItemData;
  iconSize: number;
}

export function HistoryItem({ item, iconSize }: HistoryItemProps) {
  return (
    <View className="flex-row items-center mb-4">
      <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
        {item.type === "earned" ? (
          <ArrowUpRight size={iconSize} color="#3b82f6" />
        ) : (
          <ArrowDownLeft size={iconSize} color="#10b981" />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-medium text-base">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
      </View>
      <View className="items-end">
        <Text className="text-gray-900 font-medium text-base">
          {item.points}
        </Text>
        <Text className="text-gray-500 text-sm">{item.date}</Text>
      </View>
    </View>
  );
}
