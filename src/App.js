import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";

// Importar as telas
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import TrophiesPage from "./pages/TrophiesPage";
import DataPage from "./pages/DataPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_Regular: Quicksand_400Regular,
    Quicksand_Bold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // Tab Navigator (navbar embaixo)
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            // Define os ícones com base no nome da rota
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Troféus") iconName = "trophy";
            else if (route.name === "Dados") iconName = "stats-chart";
            else if (route.name === "Perfil") iconName = "person";
            else if (route.name === "Ajuda") iconName = "help-circle";

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#fcc766",
          tabBarInactiveTintColor: "#d0d0d0",
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Troféus" component={TrophiesPage} />
        <Tab.Screen name="Dados" component={DataPage} />
        <Tab.Screen name="Perfil" component={ProfilePage} />
        <Tab.Screen name="Ajuda" component={HelpPage} />
      </Tab.Navigator>
    );
  }

  // Stack Navigator (para gerenciar Welcome e HomeTabs)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tela de boas-vindas sem navbar */}
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        {/* Tela HomeTabs com navbar */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}