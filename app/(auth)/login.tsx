import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { router } from "expo-router";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";

import { useDevice } from "@/hooks/useDevice";
import { Login } from "@/services/service";
import { LoginHeader } from "@/components/login-screen.tsx/LoginHeader";
import { LoginTitle } from "@/components/login-screen.tsx/LoginTitle";
import { LoginForm } from "@/components/login-screen.tsx/LoginForm";
import { LoginButton } from "@/components/login-screen.tsx/LoginButton";
import { RegisterLink } from "@/components/login-screen.tsx/RegisterLink";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isTablet, responsiveSize } = useDevice();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in both email and password");
        return;
      }

      setIsLoading(true);

      const deviceHeader = `${Device.osInternalBuildId ?? "unknown-id"}/${
        Device.osName ?? "unknown-os"
      }/${Device.modelName ?? "unknown-device"}`;

      const response = await Login({ email, password }, deviceHeader);

      if (response?.data) {
        const customer = response.data.customer;
        await SecureStore.setItemAsync("userData", JSON.stringify(customer));

        setTimeout(async () => {
          await SecureStore.deleteItemAsync("token");
        }, 5 * 60 * 1000);

        router.replace("/(tabs)/home");
      } else {
        Alert.alert(
          "Login failed",
          response?.message || "Invalid email or password"
        );
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleHelpPress = () => {
    // Navigate to help screen or show help modal
    console.log("Help pressed");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
  };

  const handleRegisterPress = () => {
    console.log("Register pressed");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={`flex-1 self-center w-full px-6 ${
              isTablet ? "max-w-lg px-8" : ""
            }`}
          >
            <LoginHeader
              responsiveSize={responsiveSize}
              isLoading={isLoading}
              onBackPress={handleBackPress}
              onHelpPress={handleHelpPress}
            />

            <LoginTitle />

            <LoginForm
              email={email}
              password={password}
              showPassword={showPassword}
              isLoading={isLoading}
              responsiveSize={responsiveSize}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onTogglePassword={togglePasswordVisibility}
              onForgotPassword={handleForgotPassword}
            />

            <View className="flex-1 justify-end">
              <LoginButton isLoading={isLoading} onPress={handleLogin} />

              <RegisterLink
                isLoading={isLoading}
                onPress={handleRegisterPress}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}