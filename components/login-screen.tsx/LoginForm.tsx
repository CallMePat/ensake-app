import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import InputField from "@/components/InputField";

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  responsiveSize: (size: number) => number;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  responsiveSize,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onForgotPassword,
}) => {
  return (
    <View className="mb-8">
      {/* Email Field */}
      <InputField
        label="Email Address"
        value={email}
        onChangeText={onEmailChange}
        placeholder="hello@ensake.com"
        icon={<Mail size={responsiveSize(20)} color="#9ca3af" />}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        required
        accessibilityLabel="Email address input"
        editable={!isLoading}
      />

      {/* Password Field */}
      <InputField
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        placeholder="••••••••••"
        icon={<Lock size={responsiveSize(20)} color="#9ca3af" />}
        rightIcon={
          showPassword ? (
            <EyeOff size={responsiveSize(20)} color="#9ca3af" />
          ) : (
            <Eye size={responsiveSize(20)} color="#9ca3af" />
          )
        }
        onRightIconPress={onTogglePassword}
        secureTextEntry={!showPassword}
        autoComplete="password"
        required
        accessibilityLabel="Password input"
        rightIconAccessibilityLabel={
          showPassword ? "Hide password" : "Show password"
        }
        containerClassName="mb-4"
        editable={!isLoading}
      />

      {/* Forgot Password */}
      <TouchableOpacity
        className="mb-8"
        accessibilityRole="button"
        accessibilityLabel="Forgot password"
        disabled={isLoading}
        onPress={onForgotPassword}
      >
        <Text
          className={`text-base ${
            isLoading ? "text-gray-400" : "text-[#0066F9]"
          }`}
        >
          Forget Password??
        </Text>
      </TouchableOpacity>
    </View>
  );
};