import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);
  const register = ({ navigation }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        db.collection("users").add({
          displayName: name,
          email: auth.currentUser.email,
          password:password,
        });
      })
      .catch((error) => alert(error.message));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
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
        <Text style={{ fontStyle: "italic", fontWeight: "900", fontSize: 30 }}>
          SISI
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="person-outline" size={24} color="black" />
          <Input
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
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
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            placeholder="Password"
            type="password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Button
          containerStyle={styles.button}
          onPress={register}
          raised
          title="Register"
        />
        <Text style={{ paddingVertical: 20 }}>Forgot Password?</Text>
        <Text style={{ paddingVertical: 20 }}>
          Already have an account?
          <Pressable
            onPress={() => navigation.push("Login")}
            style={{ fontStyle: "italic", fontWeight: "500" }}
          >
            <Text>Login</Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
