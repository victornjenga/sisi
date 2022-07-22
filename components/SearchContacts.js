import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TextInput } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const SearchContacts = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("users")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setContacts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);
  useEffect(() => {
    setFilteredContacts(
      contacts.filter((user) =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setFilteredContacts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);
  const createChat = async () => {
    console.log(search);
    if (search === "") {
      alert("type some message");
    } else {
      await db
        .collection("chats")
        .add({
          email: auth.currentUser.email,
          chatName: search,
        })
        .then(() => setSearch(""))
        .catch((error) => alert(error));
    }
  };
  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.inputarea}>
          <View>
            <TextInput
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter username to chat"
              style={styles.TextInput}
            />
          </View>
          <TouchableOpacity
            disabled={!search}
            onPress={createChat}
            style={styles.addchatbtn}
          >
            <MaterialCommunityIcons
              name="message-plus-outline"
              size={34}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {filteredContacts.map((contact) => (
          <Text>{contact.email}</Text>
        ))}
      </View>
    </View>
  );
};

export default SearchContacts;

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
