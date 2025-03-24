import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenFromStorage } from "./redux/authSlice";

// Importar os ícones personalizados
import HomeIcon from "../assets/icons/home.svg";
import TrophyIcon from "../assets/icons/trophy.svg";
import StatsIcon from "../assets/icons/stats.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import HelpIcon from "../assets/icons/help.svg";

// Importar as telas
import Onboarding from "./pages/Onboarding";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import TrophiesPage from "./pages/TrophiesPage";
import ReportPage from "./pages/ReportPage";
import AllTasks from "./pages/AllTasks";
import TrophyDetail from "./pages/TrophyDetail";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FirstQuestionnaire from "./pages/FirstQuestionnaire";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import AllLumiQuestions from "./pages/AllLumiQuestions";
import AllTrophies from "./pages/AllTrophies";
import QuestionPage from "./pages/QuestionPage";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(setTokenFromStorage(token));
      }
    };
    loadToken();
  }, []);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // Tab Navigator (navbar embaixo)
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
              case "Relatório":
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
        <Tab.Screen
          name="Troféus"
          component={TrophiesPageStack}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Troféus", {
                screen: "TrophiesPage",
              });
            },
          })}
        />
        <Tab.Screen name="Relatório" component={ReportPage} />
        <Tab.Screen
          name="Perfil"
          component={ProfilePageStack}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Perfil", {
                screen: "ProfilePage",
              });
            },
          })}
        />
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
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="FirstQuestionnaire" component={FirstQuestionnaire} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="QuestionPage" component={QuestionPage} />
          <Stack.Screen name="TrophyDetail" component={TrophyDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
