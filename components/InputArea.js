import { StyleSheet, Text, View, Keyboard, Image } from "react-native";
import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-web";
import { auth, db, storage } from "../firebase";
import firebase from "firebase";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const InputArea = () => {
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const sendMessage = async () => {
    Keyboard.dismiss();
    if (!inputRef.current.value) return;
    await db
      .collection("Posts")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth?.currentUser?.displayName,
        email: auth.currentUser.email,
        likes: null,
        comments: null,
        // profilePic:auth?.currentUser?.profilePic,
        postImage: image,
      })
      .catch((error) => alert(error));
      setInput("")
      setImage("")

  };
  return (
    <>
      <View style={styles.inputarea}>
        <TouchableOpacity
          rounded
          style={{
            position: "relative",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={filepickerRef}
          onPress={pickImage}
        >
          <EvilIcons name="camera" size={29} color="black" />
          <View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setInput(text)}
          value={input}
          onSubmitEditing={sendMessage}
          placeholder="Whats Up"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
          <Ionicons disabled={!input} name="send" size={24} color="#2B68E6" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default InputArea;

const styles = StyleSheet.create({
  inputarea: {
    height: 40,
    marginHorizontal: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "grey",
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: "row",
  },
  input: {
    width: "100%",
    height: 40,
    marginHorizontal: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "grey",
    marginVertical: 10,
    flexDirection: "row",
  },
});
