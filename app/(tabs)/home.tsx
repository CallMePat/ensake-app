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
} from "react-native";
import RewardDetailsScreen from "../../components/home-sceen.tsx/reward-details";

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
  const [showDetailsScreen, setShowDetailsScreen] = useState(false); // New state for details screen
  const { isTablet, isLandscape, responsiveSize } = useDevice();
  const { user, rewards, points, handleClaimReward, loading, refetch } =
    useRewardsData();
  const [modalMessage, setModalMessage] = useState<string>("");
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null); // Store the full claim result


  const handleClaim = async (rewardId: number) => {
    const reward = rewards.find((r) => Number(r.id) === rewardId);

    if (!reward) return;
    if (points < reward.points) {
      setModalMessage("You do not have enough points to claim this reward.");
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
    setModalMessage(result.message || "Something went wrong");
    setShowModal(result.success ? "success" : "failed");
  };

  const handleViewDetails = () => {
    setShowModal(null); // Close the status modal
    setShowDetailsScreen(true); // Open the details screen
  };

  const history = [
    {
      id: 1,
      type: "earned" as const,
      title: "Points Earned",
      description: "Received bonus points at sensible delicacy",
      points: "10pts",
      date: "Feb 12",
    },
    {
      id: 2,
      type: "claimed" as const,
      title: "Points Claimed",
      description: "Spent points at sensible delicacy",
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
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveSize(20) }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        >
          <UserHeader user={user} />

          <PointsCard points={points} availableRewards={rewards.length} />
          {loading ? (
            <ActivityIndicator size="large" color="#0066F9" />
          ) : (
            <RewardsList
              rewards={rewards}
              isTablet={isTablet}
              isLandscape={isLandscape}
              onClaimReward={handleClaim}
              userPoints={points}
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
          onViewDetails={handleViewDetails} // Pass the view details handler
        />
      )}

      {/* Reward Details Screen */}
      <RewardDetailsScreen
        visible={showDetailsScreen}
        onClose={() => setShowDetailsScreen(false)}
        claimResult={claimResult}
        type={showModal || "success"} // Use the current modal type or default to success
      />
    </SafeAreaView>
  );
}