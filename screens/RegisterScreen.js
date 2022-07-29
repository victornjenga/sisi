import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);
  const pickProfile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfile(result.uri);
    }
  };
  const register = ({ navigation }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          profilePic: profile,
        });
      })
      .then(() => {
        db.collection("users").add({
          displayName: name,
          email: auth.currentUser.email,
          password: password,
          profilePic: profile,
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="pink" />
      <ScrollView>
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
        <TouchableOpacity onPress={pickProfile}>
          <View style={styles.profilepic}>
            {profile ? (
              <Image
                source={{ uri: profile }}
                style={{ width: 70, height: 70, borderRadius: "50%" }}
              />
            ) : (
              <Entypo
                name="plus"
                size={34}
                color="black"
                style={styles.addbutton}
              />
            )}
          </View>
        </TouchableOpacity>
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
       </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  profilepic: {
    width: 70,
    height: 70,
    backgroundColor: "gray",
    borderRadius: "50%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addbutton: {
    right: -20,
    bottom: 0,
    fontWeight: "600",
    fontSize: 32,
  },
});
