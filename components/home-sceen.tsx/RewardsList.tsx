import React from "react";
import { View, Text, FlatList } from "react-native";
import { TRewardItem } from "@/type/types";
import { RewardItem } from "./RewardItem";

interface RewardsListProps {
  rewards: TRewardItem[];
  isTablet: boolean;
  isLandscape: boolean;
  onClaimReward: (rewardId: number) => void;
  userPoints: number;}


export function RewardsList({
  rewards,
  isTablet,
  isLandscape,
  onClaimReward,
  userPoints
}: RewardsListProps) {
  const renderRewardItem = ({ item }: { item: TRewardItem }) => (
<RewardItem item={item} onClaim={() => onClaimReward(Number(item.id))} userPoints={userPoints} />
  );

  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Available Rewards
      </Text>
      {isTablet && isLandscape ? (
        <FlatList
          data={rewards}
          renderItem={renderRewardItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />
      ) : (
        <FlatList
          data={rewards}
          renderItem={renderRewardItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}