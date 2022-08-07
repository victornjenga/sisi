import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import ChatScreen from "./ChatScreen";
import { MaterialIcons, AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "orange",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // headerShown: false,
          headerStyle: { backgroundColor: "orange",position:"fixed" },
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Layout;

const styles = StyleSheet.create({});
