import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Globe, Check, X } from 'lucide-react-native';
import { useDevice } from '@/hooks/useDevice';
import {  useLocalization, Locale} from '@/context/localization';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en' as Locale, name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'de' as Locale, name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { locale, setLocale, t } = useLocalization();
  const { isTablet } = useDevice();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);

  const handleApply = () => {
    setLocale(selectedLocale);
    onClose();
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
              <Globe size={24} color="#0066F9" />
              <Text className="text-xl font-bold text-gray-900 ml-3">
                {t('settings.language')}
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

          {/* Language Options */}
          <View className="p-6">
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                onPress={() => setSelectedLocale(language.code)}
                className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
                  selectedLocale === language.code
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
                accessibilityRole="button"
                accessibilityLabel={`Select ${language.name}`}
              >
                <View className="flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">{language.flag}</Text>
                  <View>
                    <Text className="text-gray-900 font-semibold text-base">
                      {language.nativeName}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {language.name}
                    </Text>
                  </View>
                </View>
                {selectedLocale === language.code && (
                  <Check size={20} color="#0066F9" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Actions */}
          <View className="flex-row gap-3 p-6 pt-0">
            <TouchableOpacity
              className="flex-1 border border-gray-200 rounded-xl py-3 px-4 justify-center"
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={t('common.cancel')}
            >
              <Text className="text-gray-700 text-center text-lg font-medium">
                {t('common.cancel')}
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