import React,{useState,useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import Movies from './screens/Movies';
import DetailsMove from './screens/DetailsMove';
import * as Linking from 'expo-linking';
import { ActivityIndicator } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
const Index = () => {
    const Stack = createNativeStackNavigator();
    // Linking Navigate
    const prefix = Linking.createURL('movieapptask://')
    // Linking.openURL('https://expo.dev')
    const linking = {
      prefixes: [prefix],
      config: {
        initialRouteName: 'movies',
        screens: {
          movies:  'Movies',
          movename: 'Movename/:Move_id',
          NotFound: '*',
        }
      }
    };
    console.log(prefix)
    const [loading, setLoading] = useState(false);

    setTimeout(() => {
      setLoading(true);
    }, 3000);
  return (
    <AnimatedSplash
    translucent={true}
    isLoaded={loading}
    logoImage={require("./assets/movies.png")}
    backgroundColor={"#fff"}
    logoHeight={150}
    logoWidth={150}
  >

<NavigationContainer linking={linking}>
<Stack.Navigator initialRouteName="movies"   screenOptions={{
  headerShown: false,
}}>
 <Stack.Screen name="movies" component={Movies}  />
 <Stack.Screen name="movename" options={({ route }) =>(
   {
     title:`${route?.params?.name}`,
     headerTintColor: '#fff',
     headerStyle: {
      backgroundColor: '#000',
    },
     headerTitleStyle: {
      fontWeight: 'bold',
    },
     headerShown:true})} component={DetailsMove} />  
</Stack.Navigator>
</NavigationContainer>
     </AnimatedSplash>
  )
}

export default Index
