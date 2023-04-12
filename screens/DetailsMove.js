import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View, Dimensions, StyleSheet, Button, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Notifications from "expo-notifications";
import * as Linking from 'expo-linking';
const DetailsMove = () => {
  const route = useRoute();
  const { widthDevice } = Dimensions.get("screen");
  const [details, setDetails] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=a7e32237cd1022116e2ea2bbef3bcfb3&language=en-US`
      )
      .then(async (res) => {
        // console.log(res.data)
       await setDetails(res?.data);
       await axios
          .post(
            `https://task-appgain-io-default-rtdb.firebaseio.com/serviceAccountKey.json`,
            res?.data
          )
          .then(async (ress) => {
            const token = (await Notifications.getDevicePushTokenAsync()).data;
            // await fetch('https://fcm.googleapis.com/fcm/send', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: `key=AAAAb7MY0vM:APA91bG7PStnvjciV9BtAQD6w_szriClT_Gk4_1re0sLl1Fb0gCoXZulGZvYEW-_kGcBXqqLPYEfrXo1u5fIU7_255tJu08vAqstXsrN4Q7SJCVvr5xrvSpdp7OZf7U_wotJTgp6avdJ`,
            //   },
            //   body: JSON.stringify({
            //     to: token,
            //     priority: 'normal',
            //     data: {
            //       experienceId: "mostafahpater/appGainIo-app",
            //       scopeKey: "mostafahpater/appGainIo-app",
            //       title: "📧 You've got mail",
            //       message: 'Hello world! 🌐',
            //     },
            //   }),
            // }).then((res) => {
            //   console.log(res)
            //   console.log(true)
            // }
            // ).catch((err) => {
            //   console.log("err")
            // }
            // )
          });
      });
  }, []);
  return (
    <ScrollView style={{backgroundColor:'#0D0F14',borderTopWidth:1,borderTopColor:'#a7a6a670' }}>
      <Image
        style={{ width: widthDevice, height: 400, borderRadius: 5 }}
        resizeMode={"contain"}
        source={{
          uri: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details?.backdrop_path}`,
        }}
      />
      {details?.adult &&   <Text style={[styles.adults, { fontWeight: "600", fontSize: 16 }]}>
          18+
        </Text>}
      <View
        style={{
          margin: 10,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
     
        <View
          style={[
            styles.adults,
            { flexDirection: "row-reverse", alignItems: "center", margin: 10 },
          ]}
        >
         
          <Icon name="star" size={20} color="#F5D290" />
          <Text style={{ marginRight: 3,color:'#fff', fontSize: 16 }}>
            {Math.ceil(details?.vote_average)}
          </Text>
        </View>
      </View>
      <Text style={{ fontWeight: "700",color:'#fff', fontSize: 18, margin: 10 }}>
        {details?.title}
      </Text>
      <Text style={{ fontSize: 17,color:'#fff', margin: 10 }}>{details?.overview}</Text>
      <TouchableOpacity style={styles.button} onPress={()=> Linking.openURL(`${details.homepage}`)}>
        <Text style={styles.text}>More Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailsMove;

const styles = StyleSheet.create({
  adults: {
    padding: 3,
    borderRadius: 4,
    backgroundColor: "#a7a6a670",
    color: "#fff",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 1,
    width:200,
    alignSelf:'center',
    shadowColor:'#a7a6a650',
    backgroundColor: '#a7a6a650',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
