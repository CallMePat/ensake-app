import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { CheckCircle, AlertCircle } from "lucide-react-native";
import { useDevice } from "@/hooks/useDevice";
import { useLocalization } from "@/context/localization";

interface StatusModalProps {
  type: "success" | "failed";
  visible: boolean;
  onClose: () => void;
  message: string;
  onViewDetails?: () => void;
}

export default function StatusModal({
  type,
  visible,
  onClose,
  message,
  onViewDetails
}: StatusModalProps) {
  const { isTablet, responsiveSize } = useDevice();
  const { t } = useLocalization();
  const isSuccess = type === "success";

  const iconSize = responsiveSize(20);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View
          className={`bg-white rounded-3xl p-8 shadow-2xl max-w-lg ${
            isTablet ? "w-96" : "w-full"
          }`}
        >
          {/* Icon */}
          <View className="flex flex-row items-center gap-3 border-b border-gray-200 pb-4 mb-4">
            <View className="items-center">
              <View
                className={`w-12 h-12 rounded-2xl items-center justify-center ${
                  isSuccess ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle size={iconSize} color="#10b981" />
                ) : (
                  <AlertCircle size={iconSize} color="#ef4444" />
                )}
              </View>
            </View>
            <View className="">
              <Text className="text-lg font-semibold text-gray-900 text-start">
                {isSuccess ? t('rewards.pointsEarned') : t('rewards.claimFailed')}
              </Text>
              <Text className="text-gray-500 text-start text-base leading-6">
                {message}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="w-full flex-row gap-3 items-center">
            <TouchableOpacity
              className="flex-1 border border-gray-200 rounded-xl py-3 px-4 justify-center"
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={isSuccess ? t('common.cancel') : t('common.tryAgain')}
            >
              <Text className="text-gray-700 text-center text-lg font-medium">
                {isSuccess ? t('common.cancel') : t('common.tryAgain')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-blue-500 rounded-xl py-3 px-4 justify-center"
              onPress={onViewDetails}
              accessibilityRole="button"
              accessibilityLabel={t('common.viewDetails')}
            >
              <Text className="text-white text-center text-lg font-medium">
                {t('common.viewDetails')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}