import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { auth } from "../firebase";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Layout");
      }
    });

    return unsubscribe;
  }, []);
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <StatusBar style="pink" />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            backgroundColor: "white",
            width: 300,
          }}
        >
          <Text
            style={{ fontStyle: "italic", fontWeight: "900", fontSize: 30 }}
          >
            SISI
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="email" size={24} color="black" />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              autoFocus
              type="email"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="lock" size={24} color="black" />
            <Input
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry
              type="password"
              onSubmitEditing={signIn}
            />
          </View>

          <Button title="Login" onPress={signIn} />
          <Text style={{ paddingVertical: 20 }}>Forgot Password?</Text>
          <Text style={{ paddingVertical: 20 }}>
            Dont have an account?
            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ fontStyle: "italic", fontWeight: "500" }}
            >
              <Text>Register</Text>
            </Pressable>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    flexDirection: "row",
    shadowColor: "#000",
  },
});
