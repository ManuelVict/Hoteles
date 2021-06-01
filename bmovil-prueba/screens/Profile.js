import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Image, Input,Tile } from 'react-native-elements';
import firebase from "../dataBase/firebase";

import HotelList from './HotelList';
import BestCalification from './BestCalification';
//Funcion para generar elemento grafico que separa los modulos de la vista (genera una linea recta :v)
const Separator = () => (
    <View style={styles.separator} />
);

//Vista del perfil de usuario, esta contiene la informacion basica del usuario, tambien hace una comprobacion que 
//permite determinar si un usuario esta logeado o no, esto lo hace a traves de la variable global sesion
//que se uso para imitar el comportamiento de la sesiones
const Profile = (props) => {
    console.log("desde el profile"+global.Sesion)
    if (global.Sesion === "s") {
        alert("debes estar logeado")

        return (
        <View style={styles.container}>
            <View>
                <Tile
                     imageSrc={require('../assets/logo-actual.png') }
                    title="Acceso denegado"
                    contentContainerStyle={{ height: 50 }}
                ></Tile>
            </View>
             <View>
             <Text>Presiona el boton para dirigirte al inicio de sesion </Text>
             </View>
            <View style={styles.buton}>
                
                <Button title="Login" color="#ff4040" onPress={()=> props.navigation.navigate('Login')}></Button>
            </View>
        </View>
        
            
        )
    } else if(global.Sesion !='s') {
        const initialState = {
            id: "",
            name: "",
            lastName: "",
            passwrod: "",
        };
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(initialState);


        const handleTextChange = (value, prop) => {
            setUser({ ...user, [prop]: value });
        };
        //obtiene un usuario atraves del id
        const getUserById = async (id) => {
            const dbRef = firebase.db.collection("users").doc(id);
            const doc = await dbRef.get();
            const user = doc.data();
            setUser({ ...user, id: doc.id });
            setLoading(false);
        };
        // console.log(props.route.params.SUPUSUARIO)
        
        useEffect(() => {
            getUserById(global.Sesion);
        }, []);

        if (loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            );
        }
       //funcion que utiliza para cerrar sesion
        const logout=()=>{
            global.Sesion='s'
            props.navigation.navigate('Perfil')
        }
        //Muestra los datos del usuario extraidos desde FireBase 
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Image
                        source={require('../assets/dd.jpg')}
                        style={styles.logo}
                        PlaceholderContent={<ActivityIndicator size="large" color="#B22222" />}

                    />
                    <Separator />
                    <View>
                        <Input
                            placeholder="Name"
                            style={styles.inputGroup}
                            value={user.name}
                            disabled
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="lastName"
                            style={styles.inputGroup}
                            value={user.lastName}
                            disabled

                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Email"
                            style={styles.inputGroup}
                            value={user.email}
                            disabled

                        />
                    </View>
                    <View>
                        <Input
                            placeholder="password"
                            style={styles.inputGroup}
                            value={user.password}
                            disabled

                        />
                    </View>

                    <Separator />

                    <View style={styles.buttonContainer}>
                        <Button title="Actualizar Datos" color="#ff4040" onPress={() => props.navigation.navigate('Actualizar datos'
                            , { usu: global.Sesion })
                        } />
                       <View  style={styles.buton}>
                             <Button title="Cerra sesion" color="#ff4040" onPress={() => logout()        } /> 
                       </View>
                    </View>

                    
                    
                    



                </ScrollView>

            </View>
        )
       
    }
}


        
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",

    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 0,
        borderBottomColor: '#cccccc',
    },
    logo: {
        width: 250,
        height: 300,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#B22222',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    buton: {
        
       
     
        marginTop: 10,
        marginBottom:20,

        width: 200,
        height: 100,

    },
    buttonContainer: {

    
        marginTop: 10,
        marginBottom:20,
        marginLeft:20,

        width: 200,
        height: 100,
        


        //marginBottom: 120,
    },

})




export default Profile
