import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-web";
import { db, auth } from "../firebase";

const CustomListtem = ({ name ,email}) => {

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
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Messages")
        }
      >
        <ListItem  buttonDivider>
          <Avatar
            rounded
            source={{
              uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "600" }}>
              {name}
            </ListItem.Title>
            <ListItem.Subtitle>subtitle </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </View>
  );
};

export default CustomListtem;
