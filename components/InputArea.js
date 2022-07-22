import { StyleSheet, Text, View, Keyboard } from "react-native";
import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-web";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";

const InputArea = () => {
  const [imageToPost, setImageToPost] = useState(null);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
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
      })
      .then(() => setInput(""))
      .catch((error) => alert(error));
    
  };
  return (
    <>
      <View style={styles.inputarea}>
        <TouchableOpacity
          rounded
          style={{ position: "relative" }}
          ref={filepickerRef}
          onPress={addImageToPost}
          >
          <EvilIcons name="camera" size={29} color="black" />
          <input
            hidden
            onChange={addImageToPost}
            ref={filepickerRef}
            style={{ position: "absolute" }}
            type="file"
          />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setInput(text)}
          value={input}
          onSubmitEditing={sendMessage}
          placeholder="Whats Up"
          style={styles.input}
        />
        <TouchableOpacity   onPress={sendMessage} activeOpacity={0.5}>
          <Ionicons disabled={!input} name="send" size={24} color="#2B68E6" />
        </TouchableOpacity>
      </View>
      <View>
        {imageToPost && (
          <View>
            <Image source={{ uri: imageToPost }} />
          </View>
        )}
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
  input:{
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
  }
});
