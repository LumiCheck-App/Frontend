import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
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
import AllTasks from "./pages/AllTasks";
import TrophyDetail from "./pages/TrophyDetail";
import DataPage from "./pages/DataPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FirstQuestionnaire from "./pages/FirstQuestionnaire";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import AllLumiQuestions from "./pages/AllLumiQuestions";
import AllTrophies from "./pages/AllTrophies";

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
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 5, paddingBottom: 5, backgroundColor: "#fff" },
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

          return (
            <IconComponent
              width={size * 1.2}
              height={size * 1.2}
              fill={color}
            />
          );
        },
        tabBarActiveTintColor: "#fcc766",
        tabBarInactiveTintColor: "#d0d0d0",
      })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Troféus" component={TrophiesPageStack} />
        <Tab.Screen name="Dados" component={DataPage} />
        <Tab.Screen name="Perfil" component={ProfilePageStack} />
        <Tab.Screen name="Ajuda" component={HelpPage} />
      </Tab.Navigator>
    );
  }

  // Stack Navigator para Troféus e AllTasks
  function TrophiesPageStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TrophiesPage" component={TrophiesPage} />
        <Stack.Screen name="AllTasks" component={AllTasks} />
        <Stack.Screen name="AllTrophies" component={AllTrophies} />
      </Stack.Navigator>
    );
  }

  // Stack Navigator para ProfilePage e Settings
  function ProfilePageStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AllLumiQuestions" component={AllLumiQuestions} />
      </Stack.Navigator>
    );
  }

  // Stack Navigator principal
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
          />
          <Stack.Screen
            name="FirstQuestionnaire"
            component={FirstQuestionnaire}
          />
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
          />
          <Stack.Screen
            name="TrophyDetail"
            component={TrophyDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
