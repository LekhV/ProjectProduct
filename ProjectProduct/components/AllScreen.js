import React, {Component} from 'react';
import {Dimensions, AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import  ImageCard  from '../components/ImageCard'
const url = 'http://smktesting.herokuapp.com/api/products/'

export default class AllScreen extends Component {
 static navigationOptions = {
    title: 'All Product'
  }
  state = {
    data: []
  }

  componentDidMount = async() => {
    try {
    const response = await fetch(url)
    const data = await response.json () // для отображения массива с обьектами
    this.setState({ data })

    const value = await AsyncStorage.getItem('Vstorage_Key')
    console.log("storage_Key2:"+value);
    
    }catch(e) {
      throw e
    }
  }
  render() {
    const { title, data} = this.state
    const {container} = styles
    const { navigation} = this.props
    console.log('data', data)
    return (
     
      <View>
        <ScrollView>
          <View style={container}>
          { data.map(item => (
        <ImageCard
        data = {item}
        key={item.id}
        onPress={() => navigation.navigate('DetailCards', ({item}))}
        />
        ))}
          </View>
        </ScrollView>
      </View>
    );
    }
  }

const styles = StyleSheet.create ({
  container: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 100
  }
}) 

