import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import LoginScreen from "./screens/sessions/LoginScreen";
import RegisterScreen from "./screens/sessions/RegisterScreen";

const Stack = createStackNavigator();
export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? (
        <Text>Signed in</Text>
      ) : (
        <>
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
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
