import React from "react";
import { View, Text } from "react-native";

interface LoginTitleProps {
  title?: string;
  subtitle?: string;
}

export const LoginTitle: React.FC<LoginTitleProps> = ({
  title = "Login to your Account",
  subtitle = "Enter your Email Address and Password",
}) => {
  return (
    <View className="mb-8">
      <Text className="text-3xl font-semibold text-gray-900 mb-2">
        {title}
      </Text>
      <Text className="text-gray-500 text-base">{subtitle}</Text>
    </View>
  );
};