import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const pickProfile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfile(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <TouchableOpacity onPress={pickProfile}>
            <View style={styles.profilepic}>
              {profile ? (
                <Image
                  source={{ uri: profile }}
                  style={{ width: 70, height: 70, borderRadius: "50%" }}
                />
              ) : (
                <Entypo
                  name="plus"
                  size={34}
                  color="black"
                  style={styles.addbutton}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#333333" size={20} />
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                // value={userData ? userData.fname : ''}
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#333333" size={20} />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                // value={userData ? userData.lname : ''}
                // onChangeText={(txt) => setUserData({...userData, lname: txt})}
                autoCorrect={false}
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <Ionicons
                name="ios-clipboard-outline"
                color="#333333"
                size={20}
              />
              <TextInput
                multiline
                numberOfLines={3}
                placeholder="About Me"
                placeholderTextColor="#666666"
                // value={userData ? userData.about : ''}

                autoCorrect={true}
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <Feather name="phone" color="#333333" size={20} />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                // value={userData ? userData.phone : ''}
                // onChangeText={(txt) => setUserData({...userData, phone: txt})}
                style={styles.textInput}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome name="globe" color="#333333" size={20} />
              <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                autoCorrect={false}
                // value={userData ? userData.country : ''}
                // onChangeText={(txt) => setUserData({...userData, country: txt})}
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                color="#333333"
                size={20}
              />
              <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                // value={userData ? userData.city : ''}
                style={styles.textInput}
              />
            </View>
            <Button title="Update" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profilepic: {
    width: 70,
    height: 70,
    backgroundColor: "gray",
    borderRadius: "50%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:30
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: "#333333",
    height: 40,
  },
  form: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
