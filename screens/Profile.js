import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const Profile = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
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
  // useLayoutEffect(() => {
  //   setLoading(true);
  //   const unsubscribe = db
  //     .collection("Posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setChats(
  //         snapshot.docs.map(
  //           (doc) => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }),
  //           setLoading(false)
  //         )
  //       )
  //     );
  //   return unsubscribe;
  // }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, jusifyContent: "center", alignItems: "center" }}
    >
      {route.params ? (
        <>
          <View style={styles.profilepic}>
            <Avatar
              rounded
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              jusifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "600" }}>
              {route.params.name}
            </Text>
            <Text style={{ marginTop: 10, marginHorizontal: 10, fontSize: 18 }}>
              this is the bio giving more details about someone personality
            </Text>
            <View style={{ flexDirection: "row ", gap: 25, marginTop: 10 }}>
              <Button
                title="Message "
                onPress={() =>
                  navigation.navigate("Messages", { user: route.params.name })
                }
              />
              <Button title="Follow" />
            </View>{" "}
            <View
              style={{
                flexDirection: "row ",
                justifyContent: "between",
                gap: 15,
                marginTop: 15,
              }}
            >
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>5</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>Posts</Text>
              </View>
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>1000</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>
                  Followers
                </Text>
              </View>
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>23</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>Follows</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.profilepic}>
            <Avatar
              rounded
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              jusifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "600" }}>
              {auth?.currentUser?.displayName}
            </Text>
            <Text style={{ marginTop: 10, marginHorizontal: 10, fontSize: 18 }}>
              this is the bio giving more details about someone personality
            </Text>
            <View style={{ flexDirection: "row ", gap: 25, marginTop: 10 }}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate("EditProfile")}
              />
              <Button title="Logout" />
            </View>
            <View
              style={{
                flexDirection: "row ",
                justifyContent: "between",
                gap: 15,
                marginTop: 15,
              }}
            >
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>5</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>Posts</Text>
              </View>
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>1000</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>
                  Followers
                </Text>
              </View>
              <View style={{ jusifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>23</Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>Follows</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profilepic: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: "50%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
});
