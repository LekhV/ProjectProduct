import React from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native'
import { h, w } from '../constans'


const ReviewCard = ( {reviews} ) => {
    const {container, sub, h1,h2 } = styles
    const { created_by,created_at,rate, text} = reviews
    return(
      <View style={container}>
            <Text style={h2}>{created_by.username}, {created_at}</Text>
            <Text style={h1}>Rate: {rate}</Text>
        <Text style={h1}>Comment: {text}</Text>

        </View>
        )
}

const styles = StyleSheet.create({
   container:{
    width: "90%",
    backgroundColor: "#F5FCFF",
    borderColor: "#61c3ff",
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
   },
   sub:{
    backgroundColor: "#F5FCFF",
    borderRadius: 10,
    padding: 10,
   },
   h1:{
       paddingTop: 10,
       fontFamily: 'AvenirNext-DemiBold',
       fontSize: 18,
       width: w/1.2
   },
   h2:{
    paddingTop: 10,
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 18,
    width: w/1.2,
    fontWeight: "bold",
    fontStyle: 'italic'
},
   
})

export default ReviewCard