import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
const Messages = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello there",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sisi",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            {route.params.user}
          </Text>
        </View>
      ),
      headerStyle: { backgroundColor: "orange", position: "fixed" },
      headerTitleStyle: {
        color: "#000",
        alignSelf: "start",
        justifyContent: "start",
      },
    });
  }, [navigation]);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Messages;

const styles = StyleSheet.create({});
