import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TRewardItem } from "@/type/types";

interface RewardItemProps {
  item: TRewardItem;
  onClaim: () => void;
  userPoints: number;
}

export function RewardItem({ item, onClaim, userPoints }: RewardItemProps) {
  return (
    <View
      className="flex-row items-center rounded-xl p-4 mb-3 shadow-sm overflow-hidden relative h-[7rem] "
      style={{ backgroundColor: "#edeff3" }}
    >
      <View>
        <Image
          source={
            typeof item?.brand?.logo === "string"
              ? { uri: item?.brand?.logo }
              : item?.brand?.logo
          }
          className="w-12 h-12 rounded-full mr-4"
        />

        <View className="flex flex-row justify-between items-center w-full">
          <View>
            <Text className="text-[#0E121B] ">
              {item.description} at {item.brand.name}
            </Text>
          </View>
          <TouchableOpacity
            className="border-[#0066F9] border px-6 py-2 rounded-lg"
            onPress={onClaim}
            accessibilityRole="button"
            accessibilityLabel={`Claim reward for ${item.brand.name}`}
          >
            <Text className="text-[#0066F9] font-medium text-sm">Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute -top-8 -right-6">
        <Image
          source={
            typeof item?.brand?.logo === "string"
              ? { uri: item?.brand?.logo }
              : item?.brand?.logo
          }
          className="w-20 h-20 rounded-full mr-4"
        />
      </View>
    </View>
  );
}
