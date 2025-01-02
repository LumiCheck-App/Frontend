import React from "react";
import { Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";

// Importar os ícones personalizados
import HomeIcon from "../assets/icons/home.svg";
import TrophyIcon from "../assets/icons/trophy.svg";
import StatsIcon from "../assets/icons/stats.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import HelpIcon from "../assets/icons/help.svg";

// Importar as telas
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import TrophiesPage from "./pages/TrophiesPage";
import DataPage from "./pages/DataPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_Regular: Quicksand_400Regular,
    Quicksand_Bold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-off'white">
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
          tabBarStyle: {
            paddingTop: 5, // Espaçamento superior dentro da barra
            paddingBottom: 5, // Espaçamento inferior dentro da barra
            backgroundColor: "#fff", // Cor de fundo da barra
          },
          tabBarIcon: ({ focused, size }) => {
            let IconComponent;
            let color = focused ? "#fcc766" : "#d0d0d0";

            switch (route.name) {
              case "Home":
                IconComponent = HomeIcon;
                break;
              case "Troféus":
                IconComponent = TrophyIcon;
                break;
              case "Dados":
                IconComponent = StatsIcon;
                break;
              case "Perfil":
                IconComponent = ProfileIcon;
                break;
              case "Ajuda":
                IconComponent = HelpIcon;
                break;
              default:
                IconComponent = null;
            }

            return <IconComponent width={size * 1.2} height={size * 1.2} fill={color} />;
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
    <>
      <StatusBar barStyle="dark-content" />
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
          <Stack.Screen
          name="Register"
          component={RegisterPage}
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
    </>
  );
}
