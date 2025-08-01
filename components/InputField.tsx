import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?:
     | 'birthdate-day'
     | 'birthdate-full'
     | 'birthdate-month'
     | 'birthdate-year'
     | 'cc-csc'
     | 'cc-exp'
     | 'cc-exp-day'
     | 'cc-exp-month'
     | 'cc-exp-year'
     | 'cc-number'
     | 'country'
     | 'current-password'
     | 'email'
     | 'family-name'
     | 'gender'
     | 'given-name'
     | 'honorific-prefix'
     | 'honorific-suffix'
     | 'name'
     | 'new-password'
     | 'nickname'
     | 'one-time-code'
     | 'organization'
     | 'postal-address'
     | 'postal-address-country'
     | 'postal-address-extended'
     | 'postal-address-extended-postal-code'
     | 'postal-address-locality'
     | 'postal-address-region'
     | 'postal-code'
     | 'street-address'
     | 'sms-otp'
     | 'tel'
     | 'tel-country-code'
     | 'tel-national'
     | 'tel-device'
     | 'username'
     | 'password'
     | 'url'
     | 'additional-name'
     | undefined;
  required?: boolean;
  accessibilityLabel?: string;
  containerClassName?: string;
  inputClassName?: string;
  rightIconAccessibilityLabel?: string;
  editable?: boolean;
}

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete,
  required = false,
  accessibilityLabel,
  containerClassName = 'mb-6',
  inputClassName = '',
  rightIconAccessibilityLabel,
  editable
}: InputFieldProps) {
  
  return (
    <View className={containerClassName}>
      <Text className="text-gray-900 text-base font-medium mb-2">
        {label} {required && <Text className="text-[#0066F9]">*</Text>}
      </Text>
      <View className="flex flex-row items-center border border-gray-200 rounded-xl px-4 py-2">
        {icon && icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          className={`flex-1 text-gray-900 text-base ${icon ? 'ml-3' : ''} ${inputClassName}`}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          accessibilityLabel={accessibilityLabel}
          editable={editable}
          style={{
            paddingVertical: 8,
            textAlign: 'left',
            textAlignVertical: 'top',
            includeFontPadding: false,
            lineHeight: 20,
          }}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="ml-3"
            accessibilityRole="button"
            accessibilityLabel={rightIconAccessibilityLabel}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}