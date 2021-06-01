import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HotelList from './HotelList';
import BestCalification from './BestCalification';
import Profile from './Profile'
//Permite la navegacion por medio de una Tab-bar entre las vistas principales
const TabBar = (props)=> {

    return (

        
        <Tab.Navigator >
            <Tab.Screen style={styles.titleText} name="Favoritos" component={BestCalification} />
           <Tab.Screen style={styles.titleText} name="Principal" component={HotelList} />
          <Tab.Screen style={styles.titleText} name="Profile" component={Profile}  />
          
        </Tab.Navigator>
    
    )
}

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin"
    },
    titleText: {
      fontSize: 40,
      fontWeight: "bold",
      marginBottom:40
    }
  });


export default TabBar