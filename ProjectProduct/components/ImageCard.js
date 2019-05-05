import React from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native'
import { h, w } from '../constans'

const ImageCard = ( {data, onPress} ) => {
    const { sub, h1, cover } = styles
    const { img, title} = data
    return(
      <TouchableOpacity onPress={onPress}>
      <View style={sub}>
            <Image style={cover} source={{uri: "http://smktesting.herokuapp.com/static/"+img}}/>
        <Text style={h1}>{title}</Text>
        </View>
   </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
   sub:{
       shadowColor: '#000',
       paddingVertical: 10,
       borderRadius: 10,
       backgroundColor: 'white',
       shadowRadius:8,
       shadowOffset: { width: 0, height: 5 },
       shadowOpacity: 0.4
   },
   h1:{
       paddingTop: 10,
       fontFamily: 'AvenirNext-DemiBold',
       fontSize: 24,
       alignSelf: 'center',
       textAlign: 'center',
       fontWeight: "bold",
       width: w/2.4
   },
   cover: {
    marginHorizontal: 5,
    width: w/1.2,
    height: w * 0.8,
       borderRadius: 10
   }
})

export default ImageCard