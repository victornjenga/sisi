import { StyleSheet, View, Text, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-web";
import { TextInput } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";
import CustomListtem from "../components/CustomListItem";
import SearchContacts from "../components/SearchContacts";
import { Avatar, ListItem } from "react-native-elements";

const ChatScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // const createChat = async () => {
  //   console.log(input);
  //   if (input === "") {
  //     alert("type some message");
  //   } else {
  //     await db
  //       .collection("chats")
  //       .add({
  //         email: auth.currentUser.email,
  //         chatName: input,
  //       })
  //       .then(() => setInput(""))
  //       .catch((error) => alert(error));
  //   }
  // };
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("chats")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) =>
  //       setChats(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );

  //   return unsubscribe;
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("chats")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) =>
  //       setChats(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  //   return unsubscribe;
  // }, []);
  // const enterChat = (id, chatName) => {
  //   navigation.navigate("Chat", {
  //     id: id,
  //     chatName: chatName,
  //   });
  // };
  useLayoutEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("Posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
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
  }, []);
  return (
    <View>
      {/* <SearchContacts /> */}
      <View>
        {chats.map(({ id, data }) => (
          <TouchableOpacity key={id} onPress={() => navigation.navigate("Messages",{user:data?.displayName})}>
            <ListItem buttonDivider>
              <Avatar
                rounded
                source={{
                  uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "600" }}>
                  {data?.displayName}
                </ListItem.Title>
                <ListItem.Subtitle>{data?.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
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
    marginBottom: 30,
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
