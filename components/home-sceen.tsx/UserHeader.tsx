import React from "react";
import { View, Text, Image } from "react-native";
import { TCustomer } from "@/utils/auth";

interface UserHeaderProps {
  user: TCustomer | null;
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <View className="flex-row items-center mt-4 mb-6">
      <Image
        source={require("@/assets/images/profilePic.png")}
        className="w-12 h-12 rounded-full mr-3"
      />
      <Text className="text-xl font-semibold text-gray-900">
        Welcome {user?.first_name}
      </Text>
    </View>
  );
}