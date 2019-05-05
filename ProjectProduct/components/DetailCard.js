import React, {PureComponent} from 'react';
import {Dimensions, AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar,ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import  ImageDetail  from '../components/ImageDetail'
import AsyncStorage from '@react-native-community/async-storage';
import { h, w } from '../constans'
import  ReviewCard  from '../components/ReviewCard'

const urlrev = 'http://smktesting.herokuapp.com/api/reviews/'


class DetailCard extends PureComponent {
    static navigationOptions = {
        title: 'Details Product'
      }

      constructor(props) {
        super(props);
          this.registerCall = this.registerCall.bind(this);
          this.urlCall = this.urlCall.bind(this);
          this.state = {
            textrew: '',
            reviews: [],
          getValue : '',
          textInputData : '',
          wholeResult: '',
          baseUrl: 'http://smktesting.herokuapp.com/api/reviews/1'
        };
      }


      registerCall(){
        var that = this;
        var baseUrl = that.state.baseUrl;
     fetch(baseUrl,{
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({"textrew": this.state.textrew})
          }).then(function (response) {
              return response.json();
         }).then(function (result) { 
             
              if(!result.error){
                that.setState({ 
                status: result.error,
                wholeResult: result,
                });
           Alert.alert("User successfully " );
         }else{
           Alert.alert(result.error_msg);
           console.log(result);
        }
    }).catch(function (error) {
    console.log("-------- error ------- "+error);
    alert("result:"+error)
    });
      }
      
   
      urlCall (idurl) {
        fetch(idurl, {
          method: 'GET',
          headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
          }
      })
      .then(response => { return response.json();})
      .then(responseData => {console.log(responseData); return responseData;})
      .then(reviews => {this.setState({"reviews" : reviews});})
  
      .catch(err => {
          console.log("fetch error" + err);
      });
  }

      componentDidMount = async() => {
        try {
        const value = await AsyncStorage.getItem('Vstorage_Key')
        console.log("storage_Key2:"+value);
        }catch(e) {
          throw e
        }
      }

      render() {

        const  {item } = this.props.navigation.state.params
        const { img, title, text, id} = item
        const { container, sub, h1, h2 } = styles

        const idurl = urlrev + id;
        console.log('keyid', idurl)

this.urlCall(idurl);
const { reviews} = this.state
console.log('reviews', reviews)
        const data = { img }
        return (
          <View style={container}>
          <ScrollView>
          <View style={sub}>
            <Text style={h2}>{title}</Text>
          <ImageDetail data={data} />
            <Text style={h1}>Product Description</Text>
            <Text style={h2}>{text}</Text>
            <TextInput
        style={styles.input}
        placeholder="Type your review..."
        onChangeText={(textrew) => this.setState({textrew})}
        />
        <TouchableOpacity style={styles.userButton}>
  <Text style={styles.buttontext}>Submit Review</Text>
</TouchableOpacity>
            <Text style={h1}>Reviews</Text>
            { reviews.map(itemrev => (
              <ReviewCard reviews={itemrev}
              key={itemrev.id}
              />
            ))}
          </View>
        </ScrollView>
          </View>
        );
      }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  sub: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
    backgroundColor: '#fff'
  },
  h1: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 20,
    marginTop: 5,
    alignItems: 'center'
  },
  h2: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 20,
    marginTop: 5,
    color: '#000'
  },
  input: {
    marginTop: 5,
    width: "90%",
    backgroundColor: "#F5FCFF",
    borderRadius: 10,
    padding: 10,
    borderColor: "#61c3ff",
    borderWidth: 2,
  },
  userButton: {
    backgroundColor: "#61c3ff",
    width: "90%",
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttontext: {
    fontSize: 16,
    color: '#fff',
  }
})

export default DetailCard