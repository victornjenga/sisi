import { auth, db } from "../firebase";
import { Avatar, pressable } from "react-native-elements";
import firebase from "firebase";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";

import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import React, { useLayoutEffect, useRef } from "react";
import { useState } from "react";

const Comment = ({ navigation, route }) => {
  const [like, setLike] = useState();
  const [input, setInput] = useState("");
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  const commentRef = useRef(null);

  const handleLike = () => {
    setLike(!like);
  };
  const sendComment = async () => {
    Keyboard.dismiss();
    if (!commentRef.current.value) return;
    await db
      .collection("Posts")
      .doc(route.params.id)
      .collection("Comment")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        comment: input,
        displayName: auth?.currentUser?.displayName,
        email: auth.currentUser.email,
        likes: null,
        // profilePic:auth?.currentUser?.profilePic,
      })
      .catch((error) => alert(error));
    setInput("");
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("Posts")

      .doc(route.params.id)
      .collection("Comment")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setComment(
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              data: doc.data(),
            }),

            setLoading(false)
          )
        )
      );

    return unsubscribe;
  }, [route]);
  return (
    <ScrollView>
      <View style={[styles.postcard, styles.elevation]}>
        <View style={styles.postheader}>
          <Avatar
            rounded
            source={{
              uri: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fflyclipart.com%2Fthumb2%2Fpng-icons-download-profile-196380.png&imgrefurl=https%3A%2F%2Fflyclipart.com%2Fpng-icons-download-profile-profile-icon-png-196380&tbnid=i4NYu7po1vC-oM&vet=12ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ..i&docid=C9COW7n4Qsd_tM&w=840&h=572&q=profile%20pic%20png%20icon&ved=2ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ",
            }}
          />
          <Pressable
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.navigate("Profile", { name: name })}
          >
            <Text style={styles.headername}>{route.params.name}</Text>
            {/* {timestamp ? (
              <Text style={{ color: "gray" }}>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </Text>
            ) : (
              <Text>Loading</Text>
            )} */}
          </Pressable>
        </View>
        <View style={{ paddingLeft: 30, paddingVertical: 19 }}>
          <Text style={styles.message}>message</Text>
        </View>
        {/* <Image
              source={{ uri:route.params.postImage }}
              style={{ width: 300, height: 300 }}
            /> */}
        {route.params.postImage && (
          <View style={styles.postImage}>
            <Image
              source={{ uri: route.params.postImage }}
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
                <AntDesign name="like2" size={18} color="gray" />
              ) : (
                <AntDesign name="like1" size={18} color="red" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Comment");
              }}
            >
              {" "}
              <FontAwesome5 name="comment" size={18} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              {" "}
              <FontAwesome name="share-square-o" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {comment.map(
          ({ id, data }) => (
            console.log(data.displayName),
            (
              <View key={id}>
                <Text>{data?.displayName}</Text>
              </View>
            )
          )
        )}
      </View>
      <View style={styles.footer}>
        <TextInput
          ref={commentRef}
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={sendComment}
          placeholder="Send Comment"
          style={styles.TextInput}
        />

        <TouchableOpacity onPress={sendComment} activeOpacity={0.5}>
          <Ionicons name="send" size={24} color="#2B68E6" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Comment;

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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    bottom: 0,
    marginBottom: 0,
    position: "fixed",
  },
  TextInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
