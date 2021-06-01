import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import firebase from '../dataBase/firebase';
import { ListItem, Avatar, Tile, Input } from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, Swipeable } from "react-native-gesture-handler";



//Vista que trae la informacion en detalle de un Hotel de  las mejores posiciones

const salvador = (props) => {


    //variables para el manejo de la fecha y la informacion del hotel
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fecha = hoy.toDateString();
    const initialState = {
        id: "",
        name: "",
        stars: 0,
        addres: "",
        image: "",
        ciudad: "",
    };

    const [actualHotel, setActualHotel] = useState(initialState);
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [comentario, setComentario] = useState({
        comment: "",
        fecha: "",
    })
    //funcion que detecta un cambio en un campo determinado
    const handleTextChange = (value, prop) => {
        setActualHotel({ ...actualHotel, [prop]: value });
        setComentario({ ...comentario, [prop]: value })
    };
    //Funcion que encuentra el hotel a traves de su Id
    const getHotelById = async (id) => {
        const dbRef = firebase.db.collection("bestHotels").doc(id);
        const doc = await dbRef.get();
        const actualHotel = doc.data();
        setActualHotel({ ...actualHotel, id: doc.id });
        setLoading(false);
    };
    //metodo para asignar una valoracion
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }
    //metodo para actualizar la informacion del hotel
    const updateInfo = async () => {

        try {
            const hotelRef = firebase.db.collection("hotels").doc(actualHotel.id);
            await hotelRef.set({

                name: actualHotel.name,
                stars: actualHotel.stars + 1,
                addres: actualHotel.addres,
                image: actualHotel.image,
                ciudad: actualHotel.Ciudad,

            });
            console.log(stars)

        } catch (error) {
            console.log("entre al fallo")
        }


    }

    //Trae las imagenes del hotel

    useEffect(() => {
        getHotelById(props.route.params.hotelId);
        firebase.db.collection('images').onSnapshot(querySnapshot => {

            const images = [];

            querySnapshot.docs.forEach(doc => {
                const { url } = doc.data()
                images.push({
                    id: doc.id,
                    url
                })
            });

            setImages(images)
        })
    }, []);

    useEffect(() => {

        console.log(getHotelById(props.route.params.hotelId))
    }, []);
    //Funcion para el registro de un comentario, realiza la verificacion de si esta logueado o no
    const registerComment = async () => {

        if (global.Sesion === 's') {
            alert("lo siento debes estar logueado")

        } else {
            await firebase.db.collection('coments').add({
                content: comentario.comment,
                date: fecha
            })
            props.navigation.navigate('BE-HOTELS');
        }


    }


    //comprueba si hay informacion cargando en ese momento

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#B22222" />
            </View>
        );
    }
    //Variable para apoyar la valariciones de los hoteles
    var positiveValorations = Math.round(actualHotel.stars / 5)
    //muestra los 5 hoteles con mejores valoraciones
    return (
        <ScrollView >
            <Tile
                imageSrc={{ uri: actualHotel.image }}
                title=""
                contentContainerStyle={{ height: 20 }}
            ></Tile>
            <ListItem key={1} topDivider bottomDivider>
                <ListItem.Chevron />
                <ListItem.Content>
                    <ListItem.Title>Nombre Hotel: {actualHotel.name}</ListItem.Title>
                    <ListItem.Subtitle>Valoraciones Positivas: {positiveValorations}</ListItem.Subtitle>
                    <ListItem.Subtitle>Ciudad: {actualHotel.ciudad}</ListItem.Subtitle>
                    <ListItem.Subtitle>Direccion: {actualHotel.addres}</ListItem.Subtitle>
                    <Rating
                        type='heart'
                        ratingCount={5}
                        imageSize={60}
                        onFinishRating={ratingCompleted()}
                    />
                    <Button title="Enviar" color="#ff4040" onPress={() => updateInfo()} />
                </ListItem.Content>

            </ListItem>


            <View >

                <Input placeholder="Escriba su comentario" leftIcon={{ type: 'ionicon', name: 'person-circle' }}
                    onChangeText={(value) => handleTextChange(value, "comment")} />
                <View>
                    <Button title="Enviar" color="#ff4040" onPress={() => registerComment()}></Button>
                </View>

            </View>
            <ScrollView>

                <ListItem topDivider bottomDivider >
                    <ListItem.Chevron />
                    <Avatar size="xlarge" source={{}} />
                </ListItem>
            </ScrollView>
            <View style={styles.container}>

                {images.map(image => {
                    return (
                        <ScrollView >
                            <ListItem topDivider bottomDivider >
                                <ListItem.Chevron />
                                <Avatar size="xlarge" source={{ uri: image.url }} />
                            </ListItem>
                        </ScrollView>
                    )
                })}
            </View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },

});



export default salvador