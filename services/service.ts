import Constants from "expo-constants";
import * as Device from "expo-device";

import {
  TClaimRewardResponse,
  TLogin,
  TLoginResponseData,
  TRewardsResponse,
} from "@/type/types";
import { MakeDryApiCall, MakeDryApiCallForReward } from "./make-api-call";
import { IGetAPIResponse, IPostAPIResponse } from "@/type/api-response.interface";

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL ?? "";

// ✅ Login service
export const Login = async (values: TLogin, deviceHeader: string) => {
  const url = `${BASE_URL}/login`;

  return await MakeDryApiCall<TLoginResponseData>(url, "POST", values, {
    "Ensake-Device": deviceHeader,
  });
};


// ✅ Rewards service
export const getRewards = async (
  token: string
): Promise<IGetAPIResponse<TRewardsResponse>> => {
  const deviceHeader = `${Device.osInternalBuildId ?? "unknown-id"}/${Device.osName ?? "unknown-os"}/${Device.modelName ?? "unknown-device"}`;
  const url = `${BASE_URL}/rewards`;

  const raw = await MakeDryApiCallForReward<any>(url, "GET", null, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Ensake-Device": deviceHeader,
  });

  // 👇 Manually wrap response in expected `data` shape
  if (raw?.data?.customer_points !== undefined && raw?.data?.rewards) {
    return {
      status: 200,
      message: raw.message,
      data: {
        customer_points: raw.data.customer_points,
        rewards: raw.data.rewards,
      },
    };
  }

  return {
    status: raw.status,
    message: raw.message,
    error: "Unexpected response format",
  };
};

export const claimReward = async (token: string, rewardId: number): Promise<IPostAPIResponse<TClaimRewardResponse>> => {
  const deviceHeader = `${Device.osInternalBuildId ?? "unknown-id"}/${Device.osName ?? "unknown-os"}/${Device.modelName ?? "unknown-device"}`;
  const url = `${BASE_URL}/rewards`;

  const rawRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Ensake-Device": deviceHeader,
    },
    body: JSON.stringify({ reward_id: rewardId }),
  });

  const rawText = await rawRes.text();
  const parsed = JSON.parse(rawText);

  // Check top-level structure before wrapping
  if (parsed?.customer_points !== undefined && parsed?.rewards) {
    return {
      status: rawRes.status,
      message: parsed.message,
      data: {
        customer_points: parsed.customer_points,
        rewards: parsed.rewards,
      },
    };
  }

  return {
    status: rawRes.status,
    message: parsed.message,
    error: "Unexpected response format",
  };
};
