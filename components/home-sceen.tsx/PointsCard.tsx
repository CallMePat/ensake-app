import React from "react";
import { View, Text } from "react-native";

interface PointsCardProps {
  points: number;
  availableRewards: number;
}

export function PointsCard({ points, availableRewards }: PointsCardProps) {
  return (
    <View className="bg-[#0066F9] rounded-2xl p-6 mb-6">
      <Text className="text-white text-lg mb-2">Your Points</Text>
      <View className="flex-row items-baseline mb-3">
        <Text className="text-white text-4xl font-bold">{points}</Text>
        <Text className="text-white text-lg ml-1">pts</Text>
      </View>
      <Text className="text-white text-lg">
        Available Rewards: {availableRewards}
      </Text>
    </View>
  );
}