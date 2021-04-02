import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import LoginScreen from "./screens/sessions/LoginScreen";
import RegisterScreen from "./screens/sessions/RegisterScreen";
import ShopmindersTab from "./screens/ShopMindersTab";
import SettingsTab from "./screens/SettingsTab";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function App() {
  const [signedIn, setSignedIn] = useState(true);

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
      backgroundColor: "transparent",
    },
  });

  /* auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }); */
  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#29434e" }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === "shopminders") {
                  return (
                    <FontAwesome name="list-ul" size={size} color={color} />
                  );
                }
                if (route.name === "settings") {
                  return <FontAwesome name="cogs" size={size} color={color} />;
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: "white",
              inactiveTintColor: "#819ca9",
              style: {
                backgroundColor: "#29434e",
              },
            }}
          >
            <Tab.Screen
              name="shopminders"
              component={ShopmindersTab}
              options={{
                title: "Productos",
              }}
            />
            <Tab.Screen
              name="settings"
              component={SettingsTab}
              options={{
                title: "Configuración",
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <StatusBar style="light" />
          <Stack.Navigator mode="card" screenOptions={{}}>
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{
                title: "Sign in",
                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                headerTintColor: "#fff",
                cardStyleInterpolator: forFade,
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{
                title: "Register",
                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                headerTintColor: "#fff",
                cardStyleInterpolator: forFade,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
}
