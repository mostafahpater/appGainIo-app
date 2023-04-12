import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native-safe-area-context';
const Movies = () => {
    const navigation =useNavigation()
    const [movies,setMovies]=useState([])
    useEffect(() => {
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a7e32237cd1022116e2ea2bbef3bcfb3').then((res) => {
          setMovies(res.data.results)
          axios.post(`https://task-appgain-io-default-rtdb.firebaseio.com/serviceAccountKey.json`,res.data).then(async() => {
            const  token = (await Notifications.getExpoPushTokenAsync()).data;
            await   fetch('https://exp.host/--/api/v2/push/send', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             to: token,
           title:"Log Movies",
           body:"You Are Log Movies"
           }),
         });
        })
        }
        )
        
    },[])
    console.log(movies)

  return (
    <SafeAreaView style={styles.container}>
           <FlatList
          data={movies}
          renderItem={({ item,index }) =>     
          <TouchableOpacity key={index} style={{marginHorizontal:12}} onPress={()=>navigation.navigate('movename',{id:item.id,name:item.title})}>
          <View style={styles.listItem}>
       
          <Image source={{uri:`https://image.tmdb.org/t/p/w220_and_h330_face${item.backdrop_path}`}}  style={{width:60, height:60,borderRadius:30}} />
          <View style={{alignItems:'flex-end'}}>
            <Text style={{fontWeight:"bold",color:'#fff',marginBottom:5}}>{item.title}</Text>
            <Text style={{color:'#fff'}}>{item.release_date}</Text>
            <View>
            {item?.adult && <Text style={[styles.adults, { fontWeight: "600", fontSize: 16 }]}>
          18+
        </Text>}
            </View>
            <View
          style={[
            styles.adults,
            { flexDirection: "row-reverse", alignItems: "center", margin: 10 },
          ]}
        >
         
          <Icon name="star" size={20} color="#F5D290" />
          <Text style={{ marginRight: 3,color:'#fff', fontSize: 16 }}>
            {Math.ceil(item?.vote_average)}
          </Text>
        </View>
          </View>
          </View>
          </TouchableOpacity>
        }
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  )
}

export default Movies

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#0D0F14',
    },
    listItem:{
      margin:5,
    padding:10,
elevation:5,
      backgroundColor:"#a7a6a670",
      width:"100%",

      alignSelf:"center",
      justifyContent:'space-between',
      flexDirection:"row",
      borderRadius:5
    },
    adults: {
      padding: 3,
      borderRadius: 4,
      backgroundColor: "#a7a6a670",
      color: "#fff",
    },
  });