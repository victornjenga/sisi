import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db ,auth} from "../firebase";

const CustomListtem = ({ id, chatName,email, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);
  return (
    <ListItem key={id} onPress={() => enterChat(id,email, chatName)} buttonDivider>
      <Avatar
        rounded
        source={{
          uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle> subtitle </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListtem;
