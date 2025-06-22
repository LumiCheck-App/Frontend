import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokenFromStorage } from './redux/authSlice';
import { NavigationRef } from './NavigationRef';

// Importar os ícones personalizados
import HomeIcon from '../assets/icons/home.svg';
import TrophyIcon from '../assets/icons/trophy.svg';
import StatsIcon from '../assets/icons/stats.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import HelpIcon from '../assets/icons/help.svg';

// Importar as telas
import Onboarding from './pages/Onboarding';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import TrophiesPage from './pages/TrophiesPage';
import ReportPage from './pages/ReportPage';
import AllTasks from './pages/AllTasks';
import TrophyDetail from './pages/TrophyDetail';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FirstQuestionnaire from './pages/FirstQuestionnaire';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import AllLumiQuestions from './pages/AllLumiQuestions';
import AllTrophies from './pages/AllTrophies';
import QuestionPage from './pages/QuestionPage';

import * as Linking from 'expo-linking';

import { NativeModules } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const { FloatingBubble } = NativeModules;

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

export default function App() {
  const linking = {
    prefixes: [Linking.createURL('/'), 'exp+lumicheck://'],
    config: {
      screens: {
        QuestionPage: 'question-page',
      },
    },
  };

  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Foreground message handler
    const ForegroundMessage = messaging().onMessage(async (remoteMessage) => {
      if (FloatingBubble && remoteMessage?.notification?.body) {
        FloatingBubble.showBubble();
        FloatingBubble.showMessage(remoteMessage.notification.body);
      }
    });
    return ForegroundMessage;
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
          dispatch(setTokenFromStorage({ token, user: JSON.parse(user) }));
          setInitialRoute('HomeTabs');
        } else if (refreshToken && user) {
          // tenta refresh
          const response = await fetch(`${API_URL}/user/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem('token', data.access_token);
            dispatch(
              setTokenFromStorage({
                token: data.access_token,
                user: JSON.parse(user),
              })
            );
            setInitialRoute('HomeTabs');
          } else {
            await AsyncStorage.multiRemove(['token', 'refresh_token', 'user']);
            setInitialRoute('Welcome');
          }
        } else {
          setInitialRoute('Welcome');
        }
      } catch (error) {
        console.error('Erro ao verificar tokens:', error);
        setInitialRoute('Welcome');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return null;
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
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#fff',
          },
          tabBarIcon: ({ focused, size }) => {
            let IconComponent;
            let color = focused ? '#ff9d00' : '#d0d0d0';

            switch (route.name) {
              case 'Home':
                IconComponent = HomeIcon;
                break;
              case 'Troféus':
                IconComponent = TrophyIcon;
                break;
              case 'Relatório':
                IconComponent = StatsIcon;
                break;
              case 'Perfil':
                IconComponent = ProfileIcon;
                break;
              case 'Ajuda':
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
          tabBarActiveTintColor: '#ff9d00',
          tabBarInactiveTintColor: '#d0d0d0',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen
          name="Troféus"
          component={TrophiesPageStack}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Troféus', {
                screen: 'TrophiesPage',
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
              navigation.navigate('Perfil', {
                screen: 'ProfilePage',
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
      <NavigationContainer ref={NavigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen
            name="FirstQuestionnaire"
            component={FirstQuestionnaire}
          />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="QuestionPage" component={QuestionPage} />
          <Stack.Screen name="TrophyDetail" component={TrophyDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
