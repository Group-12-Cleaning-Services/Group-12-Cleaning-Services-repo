import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, Dimensions, ScrollView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../../Components/Button';
import axios from 'axios';
import { useState } from 'react';
import { SIZES } from '../../Constants/Theme';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleChange = (key,value) =>{
    if (key === 'mail') {
      setEmail(value);
    }
  }

  const handleReset = async () => {
    try {
        const response = await axios.post('https://cleaningserve.pythonanywhere.com/api/accounts/password-reset/', {
          email
        });
        await AsyncStorage.setItem("otp_mail", email)
        if(response.status === 200){
          Alert.alert("Success","Password reset code sent")
          navigation.navigate('ResetPasswordOTP');
        }else{
          Alert.alert("Warning","Something went wrong!")
        }
      } catch (error) {
      console.log(error)
     }finally{
      setEmail('')
     }
  };
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
    btnsContainer,
    inputField
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView style={scrollContainer}> 
      <View style={imageContainer}>
        <Image source={require("../../../assets/logo.png")} style={image} />
      </View>
      <View style={welcomeContainer}>
        <Text style={welcomeTitle}>Reset Pasword</Text>
        <Text style={welcomeText}>An otp verification code will be sent to you via you emailprovided</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput
           style={inputField} 
           placeholder="Enter you email" 
           onChangeText={(value)=>handleChange('mail', value)}
           value={email}
           />
        </View>
      </View>
      <View style={btnsContainer}>
        <Button title={'Submit'} 
        buttonContainer={saveCancelBtn} 
        buttonText={buttonText}
        press={handleReset}
        />
        <Button title={'Cancel'} 
        buttonContainer={saveCancelBtn} 
        buttonText={cancelText}
        />
      </View>
      </ScrollView> 
    </SafeAreaView>
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
  inputField:{
    width:SIZES.width*0.8
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
    marginVertical:10,
    width:SIZES.width*0.8,
    padding: SIZES.height*0.013,
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
    paddingBottom:50,
    paddingTop:Platform.OS === "ios"? 100:0
  }
});

export default ResetPassword;
