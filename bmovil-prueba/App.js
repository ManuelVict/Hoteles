import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from  '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack=createStackNavigator()
import LoginScreen from './screens/Login';
import TabBar from './screens/tabBar';
import Register from './screens/Register';
import InfoExtend from './screens/InfoExtend';
import updateData from './screens/updateData'
import Profile from './screens/Profile'
import salvador from './screens/salvador'


//navegacion de la app
function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>   
      <Stack.Screen name="Register" component={Register}/>   
      <Stack.Screen name="BE-HOTELS" component={TabBar}/>
      <Stack.Screen name="Detalles" component={InfoExtend}/>
      <Stack.Screen name="Detalles Fav" component={salvador}/>
      <Stack.Screen name="Actualizar datos" component={updateData}/> 
      <Stack.Screen name="Perfil" component={Profile}/>

      
     
    </Stack.Navigator>

  )
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>      
      
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
