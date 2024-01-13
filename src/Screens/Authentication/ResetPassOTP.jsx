import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIZES } from '../../Constants/Theme';
import { Feather } from '@expo/vector-icons';
import { LoadingModal } from "react-native-loading-modal";
import Button from '../../Components/Button';



const OTPVerification = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false);
  

  const handleChange = (key,value) =>{
    if (key === 'password') {
      setPassword(value);
    } else if (key === 'confirm') {
      setConfirm(value);
    }
  }

  const handleVerificationSubmit = async() => {
    if(password.value === confirm.value){
      try {
        setLoading(true);
        const email = await AsyncStorage.getItem("otp_mail")
        const response = await axios.post('https://cleaningservice.onrender.com/api/accounts/password-reset-confirm/', {
        otp,
        password,
        email
        });
        if(response.status === 200){
         Alert.alert("Success✔️", "Password reset successful");
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert("Invalid ❌","Incorrect otp code entered")
      }finally{
        setPassword('')
        setOtp('')
        setConfirm('')
      }
    }else{
      Alert.alert("Invalid❌","Password doesn't match")
    }
  };
  const {
      headerContainer,
      headerTitle, headerMessage,
      resendContainer,
      resendText,
      inputContainer,
      inputField,
      input,
      iconUser,
      } = styles
   

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerContainer}>
        <Text style={headerTitle}>Enter Verification Code</Text>
        <Text style={headerMessage}>Enter the 4-digit we sent via email</Text>
      </View>
      <View style={styles.codeContainer}>
        {[1, 2, 3, 4].map((index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index - 1]}
            onChangeText={(text) => {
            let updatedCode = otp;
            updatedCode = updatedCode.split('');
            updatedCode[index - 1] = text;
            setOtp(updatedCode.join(''));
            }}
          />
        ))}
      </View>

      <View style={resendContainer}>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput
           style={inputField} 
           placeholder="Password" 
           secureTextEntry
           onChangeText={(value)=>handleChange('password', value)}
           value={password}
           />
        </View>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput
           style={inputField} 
           placeholder="Confirm Password" 
           secureTextEntry 
           onChangeText={(value)=>handleChange('confirm', value)}
           value={confirm}
           />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerificationSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={resendText} onPress={()=>navigation.navigate("OTP")}>
        Resend code
      </Text>
      <Text style={indicator}>
          {loading && <LoadingModal modalVisible={true} />} 
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 10, 10, 1)',
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 20,
    color:'white',
    fontWeight:'bold',
  },
  headerMessage: {
    fontSize: 15,
    marginBottom: 20,
    color:'white',
    width:200,
    textAlign:'center'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width*0.7,
  },
  codeInput: {
    height: SIZES.height*0.08,
    width: SIZES.width*0.145,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
    borderRadius:50,
    color:'white',
  },
  button: {
    paddingTop:SIZES.height*0.04,
    alignItems:'center',
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width*0.4,
    padding: SIZES.height*0.0148,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    fontSize:SIZES.height*0.030
  },
  resendContainer:{
    alignItems:'center',
    paddingTop:20
  },
  resendText:{
    color:'rgba(153, 144, 255, 1)',
    paddingTop:SIZES.height*0.03
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  inputField:{
    width:SIZES.width*0.8,
    padding:SIZES.width*0.002
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
  cancelText: {
    color: 'white',
    backgroundColor: ' rgba(3, 57, 108, 1)',
    width: SIZES.width*0.3,
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
  indicator:{
    alignItems:'center',
    textAlign:'center',
    position:"absolute",
    top:SIZES.height*0.765,
    left:SIZES.width*0.45,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    flexGrow: 1,
    paddingBottom:50,
    paddingTop:Platform.OS === "ios"? 100:0
  },
  iconUser: {
    margin:2,
    paddingRight:5,
    color:'#9CADF2',
    borderColor: '#DBE3FF', 
    borderRightWidth: 1,
  },
});

export default OTPVerification;
