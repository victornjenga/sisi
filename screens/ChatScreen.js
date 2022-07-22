import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-web";
import { TextInput } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";
import CustomListtem from "../components/CustomListItem";
import SearchContacts from "../components/SearchContacts";


const ChatScreen = () => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const createChat = async () => {
    console.log(input);
    if (input === "") {
      alert("type some message");
    } else {
      await db
        .collection("chats")
        .add({
          email: auth.currentUser.email,
          chatName: input,
        })
        .then(() => setInput(""))
        .catch((error) => alert(error));
    }
  };
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };
  return (
    <View>
      <SearchContacts/>
      <View>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListtem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </View>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  inputarea: {
    width: "70%",
    height: 50,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    marginBottom:30
  },
  addchatbtn: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 53,
  },
  TextInput: {
    height: 40,
    flex: 1,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
