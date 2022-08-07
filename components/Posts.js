import React, { useLayoutEffect, useState } from "react";
import { auth, db ,storage} from "../firebase";
import firebase from "firebase";
import { Text, View, StyleSheet,ScrollView } from "react-native";
import Post from "./Post";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  useLayoutEffect(() => {
    
    setLoading(true);
    const unsubscribe = db
      .collection("Posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPost( snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              data: doc.data(),
              
              
            }),
            

            setLoading(false)
          )
        ),
       
      );
    return unsubscribe;
  }, []);
  return (
    <View>
      <ScrollView>
      {post.map(({ id, data }) => (
        //  console.log(data.displayName),
        <Post
          key={id}
          name={data.displayName}
          message={data.message}
          email={data.email}
          timestamp={data.timestamp}
          postImage={data.postImage}
        />
      ))}
      <View style={styles.loading}>
        {loading ? <Text style={{ fontSize: 25 }}>Loading...</Text> : null}
      </View>
      </ScrollView>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  loading: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
