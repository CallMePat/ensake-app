import { TLoginResponseData } from "@/type/types";
import * as SecureStore from "expo-secure-store";

export type TCustomer = TLoginResponseData["customer"];

export const getUserData = async (): Promise<TCustomer | null> => {
  const userData = await SecureStore.getItemAsync("userData");
  return userData ? (JSON.parse(userData) as TCustomer) : null;
};
