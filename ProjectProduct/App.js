/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { w } from './constans'

import AllScreen from './components/AllScreen'
import DetailCard from './components/DetailCard'

class HomeScreen extends Component {

  constructor(props) {
    super(props);
      this.registerCall = this.registerCall.bind(this);
      this.state = {
      username: '',
      password: '',
      status: '',
      getValue : '',
      textInputData : '',
      wholeResult: '',
      baseUrl: 'http://smktesting.herokuapp.com/'
      
    };
  }

  onClickListenerregister = (viewId) => {
    if(this.state.username || this.state.username != " "){
      if(this.state.password){
          this.registerCallregister();
          this.props.navigation.navigate('Details');
       }else{
      Alert.alert("Please enter username");
     }
  }else{
Alert.alert("Please enter password");
}
}

  registerCallregister(){
    var that = this;
    var url = that.state.baseUrl + "api/register/";
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"username": this.state.username, "password": this.state.password})
      }).then(function (response) {
          return response.json();
}).then(function (result) {
          if(!result.error){
            that.setState({
            status: result.error,
            wholeResult: result,
            });
            Alert.alert("Sign Up successfully ");
        textInputData = that.state.wholeResult.token;
        console.log(textInputData);
        AsyncStorage.setItem('Vstorage_Key', textInputData);
        console.log(that.state.wholeResult);
        }else{
        Alert.alert(result.error_msg);
        console.log(result);
    }
}).catch(function (error) {
console.log("-------- error ------- "+error);
alert("result:"+error)
});
  }

  onClickListener = (viewId) => {
    if(this.state.username || this.state.username != " "){
      if(this.state.password){
          this.registerCall();
          this.props.navigation.navigate('Details');
       }else{
      Alert.alert("Please enter username");
     }
  }else{
Alert.alert("Please enter password");
}
}

  registerCall(){
    var that = this;
    var url = that.state.baseUrl + "api/login/";
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"username": this.state.username, "password": this.state.password})
      }).then(function (response) {
          return response.json();
}).then(function (result) {
          if(!result.error){
            that.setState({
            status: result.error,
            wholeResult: result,
            });
            Alert.alert("Sign In successfully");
        textInputData = that.state.wholeResult.token;
        console.log(textInputData);
        AsyncStorage.setItem('Vstorage_Key', textInputData);
        console.log(that.state.wholeResult);

        }else{
        Alert.alert(result.error_msg);
        console.log(result);
    }
}).catch(function (error) {
console.log("-------- error ------- "+error);
alert("result:"+error)
});
  }


  static navigationOptions = {
    header: null
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#302167"
      barStyle="light-content"/>
        <Text style={styles.welcome}>Login to App</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter UserName"
        onChangeText={(username) => this.setState({username})}
        />
        <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={(password) => this.setState({password})}
        secureTextEntry
        />
        <View>
<TouchableOpacity
style={styles.userButton}
onPress={() => this.onClickListenerregister('Details')}
>
  <Text style={styles.buttontext}>Sign Up</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.userButton}
onPress={() => this.onClickListener('Details')}>
  <Text style={styles.buttontext}>Sign In</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.userButton}
onPress = {() => this.props.navigation.navigate('Details')}>
  <Text style={styles.buttontext}>Without registering</Text>
</TouchableOpacity>
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
  Home: HomeScreen,
  Details: AllScreen,
  DetailCards: DetailCard

},
{
  defaultNavigationOptions: {
  headerStyle: {
    backgroundColor: "#302167"
  },
  headerTintColor: '#fff',
}
},
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302167',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily: "IndieFlower"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: "Raleway-Medium"
  },
  input: {
    width: "90%",
    backgroundColor: "#F5FCFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  userButton: {
    backgroundColor: "#61c3ff",
    padding: 10,
    width: w -20,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  buttontext: {
    fontSize: 16,
    color: '#fff',
  }
});
