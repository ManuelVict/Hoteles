import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Button,ScrollView,StyleSheet,ActivityIndicator,Text} from 'react-native';
import { Image, Input } from 'react-native-elements';
import firebase from "../dataBase/firebase";

import HotelList from './HotelList';
import BestCalification from './BestCalification';
import { LongPressGestureHandler } from 'react-native-gesture-handler';

// Elemente de estilo que es una linea para generar una transicion entre distintos modulos de la vista
const Separator = () => (
    <View style={styles.separator} />
  );
  
//variables del usuario de pruebas 
var userMen='pruebaUser'
var passMen= 'prueba12345'

//Login se va a generar de contener la vista y metodos necesarios para que el usuario inicie sesion
const Login = (props)=> {
    //contenedor del usuario 
    const initialState = {
        id: '',
        name: ' ',
        lastName: '',
        password: '',
      };
      //contenedor para los valores del campo imput
      const second={
          usuario:'',
          pass:''
      }
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(initialState);
    const [inp,setInp]=useState(second)
    var busqueda= user.name
      //detecta cambios al contenido de un campo
    const handleTextChange = (value, prop) => {
        setInp({ ...inp, [prop]: value });
      };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
      };
 
    //metodo de logeo para invitados
      const entrarInvitado=()=>{
        props.navigation.navigate('BE-HOTELS')
        global.Sesion="s"
      }
      //metodo de login para usuarios, valida que los campos no esten vacios y que la informacion
      //dilegenciada sea la correcta  
      const logear=()=>{
          console.log(inp.pass)
          if(inp.usuario==='' || inp.pass===''){
              console.log("entre en el 1")
              alert("Rellene los campos")
          }
          
          else if(inp.usuario===userMen &&inp.pass===passMen){
            
            global.Sesion=userMen
            console.log(global.Sesion)
            props.navigation.navigate('BE-HOTELS')
            
          }
          else{
              alert("Revise los datos ingresados")
          }
          
      }


      return (


        <View style={styles.container}>
            <Image
                source={require('../assets/logoBmovil.png')}
                style={styles.logo}
                PlaceholderContent={<ActivityIndicator size="large" color="#B22222" />}

            />
            <Input placeholder="Ingrese su Usuario" leftIcon={{ type: 'ionicon', name: 'person-circle' }}
                onChangeText={(value) => handleTextChange(value, "usuario")} />
                

            <Input placeholder="Ingrese su Contraseña" secureTextEntry={true} leftIcon={{ type: 'ionicon', name: 'lock-closed' }}
                onChangeText={(value) => handleTextChange(value, "pass")} />
            <View style={styles.container}>
                <View style={styles.buttonContainer} >
                    <Button title="Iniciar Sesion" color="#ff4040" onPress={() => logear() } />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Registrarse" color="#ff4040" onPress={() => props.navigation.navigate('Register')} />

                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Ingresar como invitado" color="#ff4040" onPress={()=>entrarInvitado()} />
                </View>
                
            </View>

        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 300,
    },

    buttonContainer: {

        width: 200,
        height: 100,


        //marginBottom: 120,
    },

});
const Tab = createBottomTabNavigator();
export default Login
