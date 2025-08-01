import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RegisterLinkProps {
  isLoading: boolean;
  onPress?: () => void;
  text?: string;
  linkText?: string;
}

export const RegisterLink: React.FC<RegisterLinkProps> = ({
  isLoading,
  onPress,
  text = "Don't have an account?",
  linkText = "Register",
}) => {
  return (
    <View className="flex-row justify-center flex-wrap">
      <Text className="text-gray-500 text-base">{text} </Text>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Register for new account"
        disabled={isLoading}
        onPress={onPress}
      >
        <Text
          className={`text-base font-medium ${
            isLoading ? "text-gray-400" : "text-[#0066F9]"
          }`}
        >
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};