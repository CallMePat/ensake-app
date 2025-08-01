import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Filter, MapPin, TrendingUp, TrendingDown, Check, X } from 'lucide-react-native';
import { useDevice } from '@/hooks/useDevice';
import { SortOption } from '@/hooks/useRewardOrdering';
import { useLocalization } from '@/context/localization';

interface SortFilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
  {
    value: 'location' as SortOption,
    icon: MapPin,
    translationKey: 'order.location',
    description: 'order.nearby'
  },
  {
    value: 'points-asc' as SortOption,
    icon: TrendingUp,
    translationKey: 'order.pointsAsc',
    description: 'order.pointsAsc'
  },
  {
    value: 'points-desc' as SortOption,
    icon: TrendingDown,
    translationKey: 'order.pointsDesc',
    description: 'order.pointsDesc'
  },
];

export default function SortFilterModal({
  visible,
  onClose,
  currentSort,
  onSortChange,
}: SortFilterModalProps) {
  const { t } = useLocalization();
  const { isTablet } = useDevice();
  const [selectedSort, setSelectedSort] = useState<SortOption>(currentSort);

  const handleApply = () => {
    onSortChange(selectedSort);
    onClose();
  };

  const handleReset = () => {
    setSelectedSort('location');
  };

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
          className={`bg-white rounded-3xl shadow-2xl ${
            isTablet ? "w-96" : "w-full max-w-sm"
          }`}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
            <View className="flex-row items-center">
              <Filter size={24} color="#0066F9" />
              <Text className="text-xl font-bold text-gray-900 ml-3">
                {t('order.filterSort')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel={t('common.close')}
            >
              <X size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Sort Options */}
          <View className="p-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              {t('order.sortBy')}
            </Text>
            
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedSort === option.value;
              
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSelectedSort(option.value)}
                  className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                  accessibilityRole="button"
                  accessibilityLabel={`Sort by ${t(option.translationKey)}`}
                >
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <IconComponent
                        size={20}
                        color={isSelected ? '#0066F9' : '#6B7280'}
                      />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-semibold text-base">
                        {t(option.translationKey)}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        {option.value === 'location' 
                          ? t('order.nearby')
                          : t(option.translationKey)
                        }
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <Check size={20} color="#0066F9" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Actions */}
          <View className="flex-row gap-3 p-6 pt-0">
            <TouchableOpacity
              className="flex-1 border border-gray-200 rounded-xl py-3 px-4 justify-center"
              onPress={handleReset}
              accessibilityRole="button"
              accessibilityLabel={t('order.reset')}
            >
              <Text className="text-gray-700 text-center text-lg font-medium">
                {t('order.reset')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-blue-500 rounded-xl py-3 px-4 justify-center"
              onPress={handleApply}
              accessibilityRole="button"
              accessibilityLabel={t('order.apply')}
            >
              <Text className="text-white text-center text-lg font-medium">
                {t('order.apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}