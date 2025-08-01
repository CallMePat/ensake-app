import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import {
  CheckCircle,
  AlertCircle,
  X,
  Trophy,
  Gift,
  Star,
} from "lucide-react-native";
// import { useDevice } from "@/hooks/useDevice";

interface RewardDetail {
  brand: {
    name: string;
    logo: string | any;
  };
  claimed: boolean;
  description: string;
  id: number;
  points: number;
}

interface ClaimResult {
  customer_points?: number;
  message: string;
  rewards?: RewardDetail[];
  success: boolean;
}

interface RewardDetailsScreenProps {
  visible: boolean;
  onClose: () => void;
  claimResult: ClaimResult | null;
  type: "success" | "failed";
}

export default function RewardDetailsScreen({
  visible,
  onClose,
  claimResult,
  type,
}: RewardDetailsScreenProps) {
  // const { isTablet, responsiveSize } = useDevice();
  const isSuccess = type === "success";

  if (!claimResult) return null;

  const claimedReward = claimResult.rewards?.find((reward) => reward.claimed);
  const availableRewards = claimResult.rewards?.filter((reward) => !reward.claimed) || [];
  const customerPoints = claimResult.customer_points || 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-900">
              Reward Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Status Section */}
          <View className="bg-white mx-4 mt-6 rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <View
                className={`w-16 h-16 rounded-2xl items-center justify-center mr-4 ${
                  isSuccess ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle size={32} color="#10b981" />
                ) : (
                  <AlertCircle size={32} color="#ef4444" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900">
                  {isSuccess ? "Claim Successful!" : "Claim Failed"}
                </Text>
                <Text className="text-gray-600 mt-1">
                  {claimResult.message}
                </Text>
              </View>
            </View>

            {/* Points Balance */}
            <View className="bg-blue-50 rounded-xl p-4 flex-row items-center">
              <Star size={24} color="#0066F9" />
              <View className="ml-3">
                <Text className="text-blue-900 font-semibold text-lg">
                  {customerPoints} Points
                </Text>
                <Text className="text-blue-700 text-sm">
                  Current Balance
                </Text>
              </View>
            </View>
          </View>

          {/* Claimed Reward Section */}
          {claimedReward && (
            <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
              <View className="flex-row items-center mb-4">
                <Trophy size={20} color="#10b981" />
                <Text className="text-lg font-bold text-gray-900 ml-2">
                  Reward Claimed
                </Text>
              </View>

              <View className="bg-green-50 rounded-xl p-4 border border-green-200">
                <View className="flex-row items-center">
                  <Image
                    source={
                      typeof claimedReward.brand.logo === "string"
                        ? { uri: claimedReward.brand.logo }
                        : claimedReward.brand.logo
                    }
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold">
                      {claimedReward.description}
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                      at {claimedReward.brand.name}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <View className="bg-green-100 px-3 py-1 rounded-full">
                        <Text className="text-green-800 font-medium text-xs">
                          -{claimedReward.points} pts
                        </Text>
                      </View>
                      <View className="bg-green-600 px-3 py-1 rounded-full ml-2">
                        <Text className="text-white font-medium text-xs">
                          CLAIMED
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Available Rewards Section */}
          {availableRewards.length > 0 && (
            <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
              <View className="flex-row items-center mb-4">
                <Gift size={20} color="#0066F9" />
                <Text className="text-lg font-bold text-gray-900 ml-2">
                  Available Rewards ({availableRewards.length})
                </Text>
              </View>

              {availableRewards.map((reward, index) => {
                const canAfford = customerPoints >= reward.points;
                
                return (
                  <View
                    key={reward.id}
                    className={`rounded-xl p-4 ${
                      index !== availableRewards.length - 1 ? "mb-3" : ""
                    } ${canAfford ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"}`}
                  >
                    <View className="flex-row items-center">
                      <Image
                        source={
                          typeof reward.brand.logo === "string"
                            ? { uri: reward.brand.logo }
                            : reward.brand.logo
                        }
                        className={`w-10 h-10 rounded-full mr-3 ${
                          !canAfford ? "opacity-50" : ""
                        }`}
                      />
                      <View className="flex-1">
                        <Text
                          className={`font-semibold ${
                            canAfford ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {reward.description}
                        </Text>
                        <Text
                          className={`text-sm mt-1 ${
                            canAfford ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          at {reward.brand.name}
                        </Text>
                      </View>
                      <View className="items-end">
                        <View
                          className={`px-3 py-1 rounded-full ${
                            canAfford
                              ? "bg-blue-100"
                              : "bg-gray-200"
                          }`}
                        >
                          <Text
                            className={`font-medium text-xs ${
                              canAfford ? "text-blue-800" : "text-gray-500"
                            }`}
                          >
                            {reward.points} pts
                          </Text>
                        </View>
                        {!canAfford && (
                          <Text className="text-red-500 text-xs mt-1">
                            Need {reward.points - customerPoints} more
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Summary Section */}
          <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Summary
            </Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Total Rewards</Text>
                <Text className="font-semibold text-gray-900">
                  {claimResult.rewards?.length || 0}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Claimed</Text>
                <Text className="font-semibold text-green-600">
                  {claimResult.rewards?.filter(r => r.claimed).length || 0}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Available</Text>
                <Text className="font-semibold text-blue-600">
                  {availableRewards.length}
                </Text>
              </View>
              <View className="h-px bg-gray-200 my-2" />
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-900 font-semibold">
                  Affordable Now
                </Text>
                <Text className="font-bold text-blue-600">
                  {availableRewards.filter(r => customerPoints >= r.points).length}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View className="bg-white px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            className="bg-blue-500 rounded-xl py-4 px-6"
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Continue"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}