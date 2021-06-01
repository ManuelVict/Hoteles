import React, { useEffect, useState } from 'react';
import { View,   Button } from 'react-native';
import firebase from '../dataBase/firebase';
import { ListItem, Avatar, } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";

//Vista de la lista de hoteles, se conecta con FireBase (FB) y realiza solo operaciones de lectura
const HotelList = (props) => {

    //almacena y permite interactuar con la informacion de los hoteles
    const [hotels, setHotels] = useState([])
    //trae la informacion de lso hoteles desde FB
    useEffect(() => {
        firebase.db.collection('hotels').onSnapshot(querySnapshot => {

            const hotels = [];

            querySnapshot.docs.forEach(doc => {
                const { name, stars, addres, image, ciudad } = doc.data()
                hotels.push({
                    id: doc.id,
                    name,
                    stars,
                    addres,
                    image,
                    ciudad
                })
            });
            setHotels(hotels)
        })
    }, []);
    //inicio de la vista, se utilzia un map en el listado de los hoteles para asignar en elementos de una lista
    //como si se tratase de una tarjeta, el resultado es una lista scroll con tarjetas que contienen los hoteles
    return (
        <ScrollView>
            {hotels.map(hotel => {
                var positiveValorations= Math.round (hotel.stars/5)
                return (

                    <ListItem key={hotel.id} topDivider bottomDivider
                     onPress={() => props.navigation.navigate("Detalles", {
                        hotelId: hotel.id
                    })}>
                        <ListItem.Chevron />
                        <Avatar  size="large"
                            source={{ uri: hotel.image }}

                        />
                        <ListItem.Content>
                            <ListItem.Title>Nombre: {hotel.name}</ListItem.Title>
                            <ListItem.Title>Ciudad: {hotel.ciudad}</ListItem.Title>
                            <ListItem.Subtitle>Valoraciones: {positiveValorations}</ListItem.Subtitle>
                        </ListItem.Content>


                    </ListItem>

                )

            })}

        </ScrollView>
    )
}
export default HotelList