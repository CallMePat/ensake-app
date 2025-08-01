import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin } from "lucide-react-native";
import { TRewardItem } from "@/type/types";
import { useLocalization } from "@/context/localization";

interface RewardItemProps {
  item: TRewardItem;
  onClaim: () => void;
  userPoints: number;
  distance: number;
  showDistance: boolean;
}

export function RewardItem({ 
  item, 
  onClaim, 
  userPoints, 
  distance, 
  showDistance 
}: RewardItemProps) {
  const { t } = useLocalization();
  const canAfford = userPoints >= item.points;

  return (
    <View
      className="flex-row items-center rounded-xl p-4 mb-3 shadow-sm overflow-hidden relative h-[7rem]"
      style={{ backgroundColor: "#edeff3" }}
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <Image
            source={
              typeof item?.brand?.logo === "string"
                ? { uri: item?.brand?.logo }
                : item?.brand?.logo
            }
            className="w-12 h-12 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-[#0E121B] font-medium">
              {item.description}
            </Text>
            <Text className="text-gray-600 text-sm">
              at {item.brand.name}
            </Text>
            {showDistance && (
              <View className="flex-row items-center mt-1">
                <MapPin size={12} color="#6B7280" />
                <Text className="text-gray-500 text-xs ml-1">
                  {distance}km away
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-blue-600 font-semibold">
              {item.points} {t('common.points').toLowerCase()}
            </Text>
            {!canAfford && (
              <Text className="text-red-500 text-xs ml-2">
                {t('rewards.needMore', { count: item.points - userPoints })}
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            className={`px-6 py-2 rounded-lg ${
              canAfford 
                ? "border-[#0066F9] border" 
                : "border-gray-300 border bg-gray-100"
            }`}
            onPress={onClaim}
            disabled={!canAfford}
            accessibilityRole="button"
            accessibilityLabel={`${t('common.claim')} reward for ${item.brand.name}`}
          >
            <Text className={`font-medium text-sm ${
              canAfford ? "text-[#0066F9]" : "text-gray-500"
            }`}>
              {t('common.claim')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute -top-8 -right-6 opacity-20">
        <Image
          source={
            typeof item?.brand?.logo === "string"
              ? { uri: item?.brand?.logo }
              : item?.brand?.logo
          }
          className="w-20 h-20 rounded-full"
        />
      </View>
    </View>
  );
}