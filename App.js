import * as AuthSession from "expo-auth-session"; 
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import MainTaskScreen from "./screens/MainTaskScreen";
import SplashScreenComponent from "./screens/SplashScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import * as WebBrowser from 'expo-web-browser';

console.log(AuthSession.makeRedirectUri({ useProxy: true }));

const Stack = createStackNavigator();
WebBrowser.maybeCompleteAuthSession();
// Mantener el splash nativo de Expo visible

export default function App() {
  const [] = React.useState(false);
  const [isReady, setIsReady] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const handleSplashFinish = () => {
    setIsReady(true);
  };

  if (!appIsReady) {
    return null; // Esperar a que todo esté listo
  }

  if (!isReady) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />; // Mostrar tu animación
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gestor de tareas"
          component={MainTaskScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
