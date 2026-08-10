import { homeApi } from "@/redux/homeApi";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppDispatch, store } from "../redux/store";

SplashScreen.preventAutoHideAsync();

function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
    let mounted = true;
    const loadCategories = async () => {
      try {
        await dispatch(
          homeApi.endpoints.getCategories.initiate(undefined, {
            forceRefetch: true,
          }),
        ).unwrap();

        if (mounted) {
          setCategoriesLoaded(true);
        }
      } catch (error) {
        console.error("Category loading failed:", error);
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [fontsLoaded, dispatch]);

  useEffect(() => {
    if (fontsLoaded && categoriesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, categoriesLoaded]);

  if (!fontsLoaded || !categoriesLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppInitializer />
      </Provider>
    </SafeAreaProvider>
  );
}
