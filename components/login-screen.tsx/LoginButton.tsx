import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface LoginButtonProps {
  isLoading: boolean;
  onPress: () => void;
  title?: string;
  loadingTitle?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  isLoading,
  onPress,
  title = "Log in",
  loadingTitle = "Logging in...",
}) => {
  return (
    <TouchableOpacity
      className={`rounded-xl py-4 mb-6 min-h-14 justify-center flex-row items-center ${
        isLoading ? "bg-[#0066F9]/70" : "bg-[#0066F9]"
      }`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={isLoading ? loadingTitle : title}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-center text-lg font-medium">
            {loadingTitle}
          </Text>
        </>
      ) : (
        <Text className="text-white text-center text-lg font-medium">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
