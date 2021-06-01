import React, { useState, useEffect } from "react";
import {  Button,  View,  StyleSheet,  TextInput,  ScrollView, ActivityIndicator} from "react-native";
import firebase from "../dataBase/firebase";

//Vista encargada de actualizar los datos de un usuario
const updateData = (props) => {
  //estado incial de los atributos del usuario
    const initialState = {
        id: "",
        name: "",
        lastName: "",
        passwrod: "",
      };
    
      const [user, setUser] = useState(initialState);
      const [loading, setLoading] = useState(true);
      //detecta cambios en un campo determinado
      const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
    //Busca un usuario dentro de FireBase (FB) a traves del id de un usuario (este dato se recibe  a traves de la vista perfil)
      const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
        setLoading(false);
      };
    
      //Metodo para actualizar el usuario, en caso de que sea exitoso se redirige al usuario
      // a la pantalla principal
      const updateUser = async () => {
          try {
            const userRef = firebase.db.collection("users").doc(user.id);
            await userRef.set({
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              password: user.password
            });
            setUser(initialState);
            props.navigation.navigate('BE-HOTELS')
          } catch (error) {
              alert("por favor espere unos momentos para realizar esta acción")
          }
              };
    
      useEffect(() => {
        getUserById(props.route.params.usu);
      }, []);
    //Muestra un simbolo de carga mientras se esta realizando una peticion
      if (loading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
          </View>
        );
      }
    //Genera la vista para actulizar los datos del usuario
      return (
        <ScrollView style={styles.container}>
          <View>
            <TextInput
              placeholder="Name"
              style={styles.inputGroup}
              value={user.name}
              onChangeText={(value) => handleTextChange(value, "name")}
            />
          </View>
          <View>
            <TextInput
              placeholder="lastName"
              style={styles.inputGroup}
              value={user.lastName}
              onChangeText={(value) => handleTextChange(value, "lastName")}
            />
          </View>
          <View>
            <TextInput
              placeholder="Email"
              style={styles.inputGroup}
              value={user.email}
              onChangeText={(value) => handleTextChange(value, "email")}
            />
          </View>
          <View>
            <TextInput
              placeholder="password"
              style={styles.inputGroup}
              value={user.password}
              onChangeText={(value) => handleTextChange(value, "password")}
            />
          </View>
          
          <View>
            <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 35,
      },
      loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      },
      inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      },
      btn: {
        marginBottom: 7,
      },
    });
export default updateData