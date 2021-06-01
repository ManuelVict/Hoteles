import React, {useState} from 'react';
import {View,Button,ScrollView,StyleSheet,ActivityIndicator,} from 'react-native';
import { Image, Input } from 'react-native-elements';
import firebase from '../dataBase/firebase'

//vista para el registro de los usuarios, hace la conexion con FireBase 
const Register = (props)=> {

    //atributos que contiene el usuario
    const[state, setState]=useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:""

    })
    //funcion que detecta cambios dentro de un campo determinado
    const handleChangeText = (value, name)=>{
        setState({...state,[name]: value})
    }
    //funcion para redireccionar al usuario una vez termine su registro
    const redirect =()=>{

        props.navigation.navigate('BE-HOTELS');
        global.Sesion="pruebaUser"
        console.log()
        
    }
    //Funcion para el registro del usuario, hace una revision basica de que los datos
    //sean validos
    const registerUser = async() =>{
        console.log(state.name)
        if(state.name ===''|| state.password!=state.confirmPassword ){
            alert('Datos erroneos por favor revisar')
        }else{
            await  firebase.db.collection('users').add({
                id:1,
                name:state.name,
                lastName:state.lastName,
                email:state.email,
                password: state.password,
            })
            redirect()
        }
    }
    //Genera la Vista de la pantalla registros

    return (
        <ScrollView style={styles.container}>
             <Image
                source={require('../assets/logoBmovil.png')}
                style={styles.logo}
                PlaceholderContent={<ActivityIndicator size="large" color="#B22222" />}

            />
            <View style={styles.inputGroup}>
                <Input placeholder="Nombre Usuario"
                 onChangeText={(value)=> handleChangeText(value,"name")} value={state.name}/>
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Apellidos Usuario"
                 onChangeText={(value)=> handleChangeText(value, "lastName")}  value={state.lastName} />
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Correo Electronico" 
                 onChangeText={(value)=> handleChangeText(value,"email")}  value={state.email}/>
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Contraseña" secureTextEntry={true}
             onChangeText={(value)=> handleChangeText(value, "password")}  value={state.password}/>
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Confirmar Contraseña"  secureTextEntry={true}
                 onChangeText={(value)=> handleChangeText(value, 'confirmPassword')}  value={state.confirmPassword}/>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Crear cuenta"onPress={() => registerUser()} />
            </View>
            
            
        </ScrollView>

    )
}



const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:35,

    },

    inputGroup:{
        flex:1,
        padding:0,
        marginBottom: 15,
        borderBottomColor: '#cccccc',
    },
    logo: {
        width: 250,
        height: 300,
    },
})

export default Register