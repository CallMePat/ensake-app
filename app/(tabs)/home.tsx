import { PointsCard } from "@/components/home-sceen.tsx/PointsCard";
import { RewardsHistory } from "@/components/home-sceen.tsx/RewardsHistory";
import { RewardsList } from "@/components/home-sceen.tsx/RewardsList";
import StatusModal from "@/components/home-sceen.tsx/StatusModal";
import { UserHeader } from "@/components/home-sceen.tsx/UserHeader";
import { useDevice } from "@/hooks/useDevice";
import { useRewardsData } from "@/hooks/useRewardsData";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Globe, Filter } from "lucide-react-native";
import { useLocalization } from "@/context/localization";
import { useRewardOrdering } from "@/hooks/useRewardOrdering";
import RewardDetailsScreen from "@/components/home-sceen.tsx/reward-details";
import LanguageSelector from "@/components/LanguageSelector";
import SortFilterModal from "@/components/SortFilterModal";

// Define the claim result type to match the actual return type
interface ClaimResult {
  customer_points?: number;
  message: string;
  rewards?: {
    brand: {
      name: string;
      logo: string | any;
    };
    claimed: boolean;
    description: string;
    id: number;
    points: number;
  }[];
  success: boolean;
}

export default function HomeScreen() {
  const [showModal, setShowModal] = useState<"success" | "failed" | null>(null);
  const [showDetailsScreen, setShowDetailsScreen] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  
  const { isTablet, isLandscape, responsiveSize } = useDevice();
  const { user, rewards, points, handleClaimReward, loading, refetch } = useRewardsData();
  const { t } = useLocalization();
  
  // Reward ordering
  const {
    sortedRewards,
    sortOption,
    setSortOption,
    getRewardDistance,
  } = useRewardOrdering(rewards);
  
  const [modalMessage, setModalMessage] = useState<string>("");
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);

  const handleClaim = async (rewardId: number) => {
    const reward = rewards.find((r) => Number(r.id) === rewardId);

    if (!reward) return;
    if (points < reward.points) {
      setModalMessage(t('error.notEnoughPoints'));
      setShowModal("failed");
      return;
    }

    const result = await handleClaimReward(rewardId);
    console.log("Claim:", result);
    console.log("Claim result:", result);
    console.log("Claim result message:", result.message);
    console.log("Claim result:", result.success);
    
    // Store the full result for the details screen
    setClaimResult(result as ClaimResult);
    setModalMessage(result.message || t('error.somethingWrong'));
    setShowModal(result.success ? "success" : "failed");
  };

  const handleViewDetails = () => {
    setShowModal(null);
    setShowDetailsScreen(true);
  };

  const history = [
    {
      id: 1,
      type: "earned" as const,
      title: t('history.pointsEarned'),
      description: t('history.receivedBonus', { place: 'sensible delicacy' }),
      points: "10pts",
      date: "Feb 12",
    },
    {
      id: 2,
      type: "claimed" as const,
      title: t('history.pointsClaimed'),
      description: t('history.spentPoints', { place: 'sensible delicacy' }),
      points: "30pts",
      date: "Feb 12",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View
        className={`flex-1 self-center w-full ${
          isTablet ? "max-w-4xl px-8" : "px-4"
        }`}
      >
        {/* Header with Language and Sort buttons */}
        <View className="flex-row justify-between items-center pt-4 pb-2">
          <TouchableOpacity
            onPress={() => setShowLanguageSelector(true)}
            className="flex-row items-center bg-white px-4 py-2 rounded-xl shadow-sm"
            accessibilityRole="button"
            accessibilityLabel={t('settings.language')}
          >
            <Globe size={18} color="#0066F9" />
            <Text className="text-blue-600 font-medium ml-2">
              {t('settings.language')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSortFilter(true)}
            className="flex-row items-center bg-white px-4 py-2 rounded-xl shadow-sm"
            accessibilityRole="button"
            accessibilityLabel={t('order.filterSort')}
          >
            <Filter size={18} color="#0066F9" />
            <Text className="text-blue-600 font-medium ml-2">
              {t('order.sortBy')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveSize(20) }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        >
          <UserHeader user={user} />

          <PointsCard points={points} availableRewards={sortedRewards.length} />
          {loading ? (
            <ActivityIndicator size="large" color="#0066F9" />
          ) : (
            <RewardsList
              rewards={sortedRewards}
              isTablet={isTablet}
              isLandscape={isLandscape}
              onClaimReward={handleClaim}
              userPoints={points}
              getRewardDistance={getRewardDistance}
              sortOption={sortOption}
            />
          )}

          <RewardsHistory history={history} iconSize={responsiveSize(16)} />
        </ScrollView>
      </View>

      {/* Status Modal */}
      {showModal && (
        <StatusModal
          type={showModal}
          visible={!!showModal}
          onClose={() => setShowModal(null)}
          message={modalMessage}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Reward Details Screen */}
      <RewardDetailsScreen
        visible={showDetailsScreen}
        onClose={() => setShowDetailsScreen(false)}
        claimResult={claimResult}
        type={showModal || "success"}
      />

      {/* Language Selector */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />

      {/* Sort Filter Modal */}
      <SortFilterModal
        visible={showSortFilter}
        onClose={() => setShowSortFilter(false)}
        currentSort={sortOption}
        onSortChange={setSortOption}
      />
    </SafeAreaView>
  );
}