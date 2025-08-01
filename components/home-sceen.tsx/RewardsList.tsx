import React from "react";
import { View, Text, FlatList } from "react-native";
import { TRewardItem } from "@/type/types";
import { RewardItem } from "./RewardItem";
import { useLocalization } from "@/context/localization";
import { SortOption } from "@/hooks/useRewardOrdering";

interface RewardsListProps {
  rewards: TRewardItem[];
  isTablet: boolean;
  isLandscape: boolean;
  onClaimReward: (rewardId: number) => void;
  userPoints: number;
  getRewardDistance: (rewardId: number) => number;
  sortOption: SortOption;
}

export function RewardsList({
  rewards,
  isTablet,
  isLandscape,
  onClaimReward,
  userPoints,
  getRewardDistance,
  sortOption
}: RewardsListProps) {
  const { t } = useLocalization();

  const renderRewardItem = ({ item }: { item: TRewardItem }) => (
    <RewardItem 
      item={item} 
      onClaim={() => onClaimReward(Number(item.id))} 
      userPoints={userPoints}
      distance={getRewardDistance(Number(item.id))}
      showDistance={sortOption === 'location'}
    />
  );

  const getSortDescription = () => {
    switch (sortOption) {
      case 'location':
        return t('order.nearby');
      case 'points-asc':
        return t('order.pointsAsc');
      case 'points-desc':
        return t('order.pointsDesc');
      default:
        return '';
    }
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-900">
          {t('home.availableRewards')}
        </Text>
        <Text className="text-sm text-gray-600">
          {getSortDescription()}
        </Text>
      </View>
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