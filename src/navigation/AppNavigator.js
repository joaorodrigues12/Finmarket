import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

// Telas
import Cadastro from "../screens/Cadastro";
import Login from "../screens/login";
import Noticias from "../screens/noticias";
import HomeGraphics from "../screens/homegraphics";
import Perfil from "../screens/Perfil";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs inferiores
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff", height: 85 },
        tabBarActiveTintColor: "#1A73E8",
        tabBarInactiveTintColor: "#333",
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Noticias") {
            return <Ionicons name="newspaper-outline" size={size} color={color} />;
          } else if (route.name === "HomeGraphics") {
            return <Ionicons name="bar-chart-outline" size={size} color={color} />;
          } else if (route.name === "Perfil") {
            return <FontAwesome name="user" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Noticias" component={Noticias} />
      <Tab.Screen name="HomeGraphics" component={HomeGraphics} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// Navegação principal
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Login" component={Login} />
      {/* Quando logar → cai no Tab */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}