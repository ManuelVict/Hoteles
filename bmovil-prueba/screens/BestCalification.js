import React, { useEffect, useState } from 'react';
import { View,   Button } from 'react-native';
import firebase from '../dataBase/firebase';
import { ListItem, Avatar, } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";


const BestCalification = (props)=> {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        firebase.db.collection('bestHotels').onSnapshot(querySnapshot => {

            const hotels = [];

            querySnapshot.docs.forEach(doc => {
                const { name, star, addres, image, ciudad } = doc.data()
                hotels.push({
                    id: doc.id,
                    name,
                    star,
                    addres,
                    image,
                    ciudad
                })
            });
            setHotels(hotels)
        })
    }, []);
    
    return (
        <ScrollView>
            {hotels.map(hotel => {
                var positiveValorations= Math.round (hotel.star/5)
                return (

                    <ListItem key={hotel.id} topDivider bottomDivider
                    onPress={() => props.navigation.navigate("Detalles Fav", {
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
export default BestCalification