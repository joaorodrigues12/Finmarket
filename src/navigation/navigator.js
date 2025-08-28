import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "../screens/Cadastro";
import Login from "../screens/Login";
import HomeGraphics from "../screens/HomeGraphics";
import Perfil from "../screens/Perfil";
import Home from "../screens/Home";
import Noticias from "../screens/Noticias"; // ✅ corrigido

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeGraphics" component={HomeGraphics} />
        <Stack.Screen name="Noticias" component={Noticias} /> {/* ✅ corrigido */}
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
