import { homeApi } from "@/redux/homeApi";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";

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

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    let mounted = true;

    const loadInitialData = async () => {
      try {
        await Promise.all([
          dispatch(
            homeApi.endpoints.getCategories.initiate(undefined, {
              forceRefetch: true,
            }),
          ).unwrap(),

          dispatch(
            homeApi.endpoints.getCities.initiate(undefined, {
              forceRefetch: true,
            }),
          ).unwrap(),
        ]);
      } catch (error) {
      } finally {
        if (mounted) {
          setAppReady(true);
        }
      }
    };

    loadInitialData();

    return () => {
      mounted = false;
    };
  }, [fontsLoaded, dispatch]);

  useEffect(() => {
    if (fontsLoaded && appReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  if (!fontsLoaded || !appReady) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 150,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppInitializer />
      </SafeAreaProvider>
    </Provider>
  );
}
