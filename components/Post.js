import { auth, db } from "../firebase";
import { Avatar, pressable } from "react-native-elements";

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";

import { useState } from "react";
const Post = ({ name, message, email, timestamp, postImage }) => {
  const [like, setLike] = useState();

  const handleLike = () => {
    setLike(!like);
  };
  return (
    <View>
      <View style={[styles.postcard, styles.elevation]}>
        <View style={styles.postheader}>
          <Avatar
            rounded
            source={{
              uri: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fflyclipart.com%2Fthumb2%2Fpng-icons-download-profile-196380.png&imgrefurl=https%3A%2F%2Fflyclipart.com%2Fpng-icons-download-profile-profile-icon-png-196380&tbnid=i4NYu7po1vC-oM&vet=12ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ..i&docid=C9COW7n4Qsd_tM&w=840&h=572&q=profile%20pic%20png%20icon&ved=2ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ",
            }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.headername}>{name}</Text>
            {timestamp ? (
              <Text style={{ color: "gray" }}>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </Text>
            ) : (
              <Text>Loading</Text>
            )}
          </View>
        </View>
        <View style={{ paddingLeft: 30, paddingVertical: 19 }}>
          <Text style={styles.message}>{message}</Text>
        </View>
        {postImage && (
          <View style={styles.postImage}>
            <Image
              source={{ uri: postImage }}
              style={{ width: 300, height: 300 }}
            />
          </View>
        )}
        <View style={{ borderTop: "1px solid #f7f5f2" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity onPress={handleLike}>
              {!like ? (
                <AntDesign name="like2" size={16} color="gray" />
              ) : (
                <AntDesign name="like2" size={16} color="red" />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {" "}
              <FontAwesome5 name="comment" size={16} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              {" "}
              <FontAwesome name="share-square-o" size={16} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postcard: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  postheader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headername: {
    fontSize: 17,
    fontWeight: "700",
  },
  message: {
    fontSize: 18,
    fontWeight: "400",
  },
  postImage: {
    alignItems: "center",
    justifyContent: "center",
  },
});
