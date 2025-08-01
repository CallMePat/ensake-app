import React from "react";
import { View, Text, FlatList } from "react-native";
import { HistoryItem } from "./HistoryItem";

interface HistoryItemData {
  id: number;
  type: "earned" | "claimed";
  title: string;
  description: string;
  points: string;
  date: string;
}

interface RewardsHistoryProps {
  history: HistoryItemData[];
  iconSize: number;
}

export function RewardsHistory({ history, iconSize }: RewardsHistoryProps) {
  const renderHistoryItem = ({ item }: { item: HistoryItemData }) => (
    <HistoryItem item={item} iconSize={iconSize} />
  );

  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Rewards History
      </Text>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}