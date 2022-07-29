import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";

const Layout = () => {
  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
};

export default Layout;

const styles = StyleSheet.create({});
