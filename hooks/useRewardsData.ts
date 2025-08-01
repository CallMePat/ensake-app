import { useState, useEffect } from "react";
import { claimReward, getRewards } from "@/services/service";
import { TRewardItem } from "@/type/types";
import { getUserData, TCustomer } from "@/utils/auth";

export function useRewardsData() {
  const [user, setUser] = useState<TCustomer | null>(null);
  const [rewards, setRewards] = useState<TRewardItem[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userInfo = await getUserData();
        setUser(userInfo);

        if (userInfo?.token) {
          const response = await getRewards(userInfo.token);
          if (response?.data) {
            setPoints(response.data.customer_points);
            setRewards(response.data.rewards);
          } else {
            console.log("Failed to load rewards:", response?.message);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

const refetch = async () => {
    try {
      setLoading(true);
      const userInfo = await getUserData();
      setUser(userInfo);

      if (userInfo?.token) {
        const response = await getRewards(userInfo.token);
        if (response?.data) {
          setPoints(response.data.customer_points);
          setRewards(response.data.rewards);
        } else {
          console.log("Failed to load rewards:", response?.message);
        }
      }
    } catch (error) {
      console.error("Error loading rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load user and rewards on mount
  useEffect(() => {
    refetch();
  }, []);

const handleClaimReward = async (rewardId: number) => {
  if (!user?.token) {
    return { success: false, message: "Missing user token" };
  }

  try {
    const response = await claimReward(user.token, rewardId);

    if (response?.data) {
      await refetch();

      return {
        success: true,
        message: response.message || "Reward claimed successfully",
        customer_points: response.data.customer_points,
        rewards: response.data.rewards,
      };
    } else {
      return {
        success: false,
        message: response?.message || response?.error || "Claim failed",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Unexpected error occurred",
    };
  }
};

  return { user, rewards, points, loading, handleClaimReward, refetch };
}
