import { auth, db } from "../firebase";
import { Avatar, pressable } from "react-native-elements";

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
const Post = ({ name, message, email, timestamp }) => {
  return (
    <View>
      <View style={[styles.postcard, styles.elevation]}>
        <View style={styles.postheader}>
          <Avatar
            rounded
            source={{
              uri: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fflyclipart.com%2Fthumb2%2Fpng-icons-download-profile-196380.png&imgrefurl=https%3A%2F%2Fflyclipart.com%2Fpng-icons-download-profile-profile-icon-png-196380&tbnid=i4NYu7po1vC-oM&vet=12ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ..i&docid=C9COW7n4Qsd_tM&w=840&h=572&q=profile%20pic%20png%20icon&ved=2ahUKEwjJ9rakiIf5AhVMZRoKHdoJCRsQMygSegUIARDvAQ",
            }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.headername}>{name}</Text>
            {timestamp ? (
              <Text style={{color:"gray"}}>{new Date(timestamp?.toDate()).toLocaleString()}</Text>
            ) : (
              <Text>Loading</Text>
            )}
          </View>
        </View>
        <View style={{ paddingLeft: 30, paddingVertical: 19 }}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={{ borderTop: "1px solid #f7f5f2" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 5,
            }}
          >
            <AntDesign name="like2" size={24} color="gray" />
            <FontAwesome5 name="comment" size={24} color="gray" />
            <FontAwesome name="share-square-o" size={24} color="gray" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;

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
    fontSize: 21,
    fontWeight: "400",
  },
});
