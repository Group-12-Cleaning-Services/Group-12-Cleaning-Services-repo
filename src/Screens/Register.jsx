import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, StatusBar, TouchableOpacity, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../Components/Button';

const Register = ({navigation}) => {
  const {
    container,
    imageContainer,
    image,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    inputContainer,
    inputField,
    input,
    buttonText,
    buttonContainer,
    haveAccountText,
    haveAccount,
    iconUser,
    scrollContainer
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView style={scrollContainer}> 
      <View style={imageContainer}>
        <Image source={require("../../assets/logo.png")} style={image} />
      </View>
      <View style={welcomeContainer}>
        <Text style={welcomeTitle}>Create Account</Text>
        <Text style={welcomeText}>Go ahead and sign up, we can't wait to serve you</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'user'} size={20} color={'black'} style={iconUser} />
          <TextInput style={inputField} placeholder="Username" />
        </View>
        <View style={input}>
          <Feather name={'lock'} size={20} color={'black'} style={iconUser} />
          <TextInput style={inputField} placeholder="Password" secureTextEntry />
        </View>
        <View style={input}>
          <Feather name={'mail'} size={20} color={'black'} style={iconUser} />
          <TextInput style={inputField} placeholder="Email" />
        </View>
      </View>
      <Button title={'Create Account'} 
       buttonContainer={buttonContainer}
       buttonText={buttonText}
       press={()=>navigation.navigate("Login")}
       />
      <Button title={'Already have an account?'}
       buttonContainer={haveAccount}
       buttonText={haveAccountText}
       press={()=>navigation.navigate("Login")}
       />
       </ScrollView> 
    </SafeAreaView>
  );
};
 
const window = Dimensions.get('window')
const height = window.height
const width = window.width
const buttonWidth = width * 0.4
const buttonWidth2 = width*0.6

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25
  },
  welcomeText: {
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
    width: 200
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  inputField:{
    width:500
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
    padding: 7,
    borderRadius: 10,
    margin: 7,
    backgroundColor: 'white',
    color: 'black',
    marginVertical:10
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: buttonWidth,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 10
  },
  haveAccount: {
    alignItems: 'center',
    paddingTop: 20
  },
  haveAccountText: {
    color: 'white',
    backgroundColor: '#6497B1',
    width: buttonWidth2,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    paddingTop: 10,
    overflow:'hidden'
  },
  iconUser: {
    margin:2,
    paddingRight:5,
    color:'#9CADF2',
    borderColor: '#DBE3FF', 
    borderRightWidth: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    flexGrow: 1,
    paddingBottom:50
  }
});

export default Register;
