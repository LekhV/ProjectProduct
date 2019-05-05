import React from 'react'
import {StyleSheet, Image, Text, View} from 'react-native'
import { h, w } from '../constans'


const ImageDetail = ( {data} ) => {
    const {container, sub, cover } = styles
    const { img, name} = data
   // const img = `https${image.medium.slice(4)}`
    return(
      <View >
        <View style={sub}>
            <Image style={cover} source={{uri: "http://smktesting.herokuapp.com/static/"+img}}/>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
   container:{
       width:w/2.4,
       paddingVertical: 5
   },
   sub:{
      
       shadowColor: '#000',
       borderRadius: 10,
       backgroundColor: 'white',
       shadowRadius:8,
       shadowOffset: { width: 0, height: 5 },
       shadowOpacity: 0.4
   },
   cover: {
    marginHorizontal: 5,
    width: w/1.2,
       height: w * 0.8,
       borderRadius: 10
   }
})

export default ImageDetail