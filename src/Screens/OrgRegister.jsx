import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Text, View, TextInput, StatusBar, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../Components/Button';

const OrgRegister = ({navigation}) => {
  const {
    container,
    imageContainer,
    image,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    inputContainer,
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
        <Text style={welcomeText}>Sign up as an organization to post your services</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'user'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Username" />
        </View>
        <View style={input}>
          <Feather name={'lock'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Password" secureTextEntry />
        </View>
        <View style={input}>
          <Feather name={'mail'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Email" />
        </View>
        <View style={input}>
          <Feather name={'phone'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Phone" />
        </View>
        <View style={input}>
          <Feather name={'map-pin'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Location" />
        </View>
      </View>
      <Button title={'Create Account'}
       buttonContainer={buttonContainer}
       buttonText={buttonText}
       press={()=>navigation.navigate("Login")}
      />
      <Button title={'Already have an account'}
       buttonContainer={haveAccount} 
       buttonText={haveAccountText}
       press={()=>navigation.navigate("Login")}
       />
      </ScrollView>
    </SafeAreaView>
    
  );
};
 
const window = Dimensions.get('window')
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
    width: 160,
    height: 160,
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
    overflow:'hidden',
    bottom:5,
  },
  iconUser: {
    margin:2,
    paddingRight:5,
    color:'#9CADF2',
    borderColor: '#DBE3FF', 
    borderRightWidth: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  }
});

export default OrgRegister;
