import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ArrowLeft, HelpCircle } from "lucide-react-native";

interface LoginHeaderProps {
  responsiveSize: (size: number) => number;
  isLoading: boolean;
  onBackPress?: () => void;
  onHelpPress?: () => void;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  responsiveSize,
  isLoading,
  onBackPress,
  onHelpPress,
}) => {
  return (
    <View className="flex-row items-center justify-between mt-4 mb-12">
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back"
        disabled={isLoading}
        onPress={onBackPress}
      >
        <ArrowLeft
          size={responsiveSize(24)}
          color={isLoading ? "#9ca3af" : "#000"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Help"
        disabled={isLoading}
        onPress={onHelpPress}
      >
        <HelpCircle
          size={responsiveSize(24)}
          color={isLoading ? "#9ca3af" : "#0066F9"}
        />
      </TouchableOpacity>
    </View>
  );
};
