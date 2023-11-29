import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, StatusBar, TouchableOpacity, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../../Components/Button';

const ResetPassword = ({navigation}) => {
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
    saveCancelBtn,
    cancelText,
    iconUser,
    scrollContainer,
    btnsContainer
  } = styles;

  return (
    <ScrollView style={scrollContainer}> 
    <SafeAreaView style={container}>
      <View style={imageContainer}>
        <Image source={require("../../../assets/logo.png")} style={image} />
      </View>
      <View style={welcomeContainer}>
        <Text style={welcomeTitle}>Reset Pasword</Text>
        <Text style={welcomeText}>Ready to create new password? Please type something you can remember</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'lock'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="New Password" secureTextEntry />
        </View>
        <View style={input}>
          <Feather name={'lock'} size={20} color={'black'} style={iconUser} />
          <TextInput placeholder="Confirm Password" secureTextEntry />
        </View>
      </View>
      <View style={btnsContainer}>
        <Button title={'Save'} 
        buttonContainer={saveCancelBtn} 
        buttonText={buttonText}
        press={()=>navigation.navigate("Login")}
        />
        <Button title={'Cancel'} 
        buttonContainer={saveCancelBtn} 
        buttonText={cancelText}
        />
      </View>
    </SafeAreaView>
   </ScrollView> 
  );
};
 
const window = Dimensions.get('window')
const height = window.height
const width = window.width
const buttonWidth = width * 0.3
const buttonWidth2 = width*0.3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    width: '100%',
    // marginTop: StatusBar.currentHeight || 0,
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
  btnsContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:20
  },
  saveCancelBtn: {
    alignItems: 'center',
    margin:12
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
  cancelText: {
    color: 'white',
    backgroundColor: ' rgba(3, 57, 108, 1)',
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

export default ResetPassword;
