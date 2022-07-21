import React, { useEffect, useLayoutEffect } from "react";
import { auth, db } from "../firebase";
import { Avatar, pressable } from "react-native-elements";

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import InputArea from "../components/InputArea";
import Posts from "../components/Posts";
import Sidebar from "./Sidebar";

const Home = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sisi",
      headerStyle: { backgroundColor: "orange" },
      headerTitleStyle: {
        color: "#000",
        alignSelf: "start",
        justifyContent: "start",
      },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            onPress={signOutUser}
            style={{ alignItems: "center", justifyContent: "center" }}
            activeOpacity={0.5}
          >
            <Avatar
              rounded
              source={{
                uri: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fflyclipart.com%2Fthumb2%2Fpng-icons-download-profile-196380.png&imgrefurl=https%3A%2F%2Fflyclipart.com%2Fpng-icons-download-profile-profile-icon-png-196380&tbnid=i4NYu7po1vC-oM&vet=12ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ..i&docid=C9COW7n4Qsd_tM&w=840&h=572&q=profile%20pic%20png%20icon&ved=2ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ",
              }}
            />
            <Text> Hi {auth?.currentUser?.displayName}</Text>
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons name="message" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <Sidebar /> */}
        <InputArea />
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
