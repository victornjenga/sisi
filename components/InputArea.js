import { StyleSheet, Text, View, Keyboard } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-web";
import { auth, db } from "../firebase";
import firebase from "firebase";

const InputArea = () => {
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    Keyboard.dismiss();

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
    <View>
      <TextInput
        onChangeText={(text) => setInput(text)}
        value={input}
        onSubmitEditing={sendMessage}
        style={styles.inputarea}
        placeholder="Whats Up"
      />
    </View>
  );
};

export default InputArea;

const styles = StyleSheet.create({
  inputarea: {
    height: 40,
    flex: 1,
    marginHorizontal: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
    borderRadius: 30,
    marginVertical: 10,
    textAlign: "center",
  },
});
