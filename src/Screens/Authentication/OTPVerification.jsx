import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import { LoadingModal } from "react-native-loading-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIZES } from '../../Constants/Theme';


const OTPVerification = ({navigation}) => {
  const {headerContainer, headerTitle, headerMessage, resendContainer, resendText} = styles
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    const getItemFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('userRegistered');
        if (value !== null) {
          setEmail(value)
        } else {
          console.log('Item not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving item from AsyncStorage:', error);
      }
    };

    getItemFromStorage();
  }, []); 

  console.log(otp, email)

  const handleVerificationSubmit = async() => {
    setLoading(true)
    try {
      const response = await axios.post('https://cleaningservice.onrender.com/api/accounts/verify-account/', {
      otp,
      email
      });

      if(response.status === 200){
       Alert.alert("Success✔️", "Your account has been verified");
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Warning⚠️","Something went wrong! try again")
    }finally{
      setLoading(false)
    }
  };

  const handleResendCode = async() => {
    setResendLoading(true)
    try {
      const response = await axios.post('https://cleaningservice.onrender.com/api/accounts/resend-verification-pin/', {
      otp,
      email
      });
      if(response.status === 200){
       Alert.alert("Success✔️", "Code sent again");
        navigation.navigate('OTP');
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Warning⚠️","Something went wrong!")
    }finally{
      setResendLoading(false)
    }
  };
  const inputRefs = useRef([]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
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
              let updatedCode = otp.split('');
              updatedCode[index - 1] = text;
              setOtp(updatedCode.join(''));

              // Move to the next input field
              if (text && inputRefs.current[index]) {
                inputRefs.current[index].focus();
              }
            }}
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerificationSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={resendContainer}>
        <Text style={resendText} onPress={handleResendCode}>
           Resend code
        </Text>
      </View>
        {loading && <LoadingModal modalVisible={true} />} 
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
    width: 200,
  },
  codeInput: {
    height: 40,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
    borderRadius:50,
    color:'white'
  },
  button: {
    paddingTop:30,
    alignItems:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign:'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    width:100,
  },
  resendContainer:{
    alignItems:'center',
    paddingTop:20
  },
  resendText:{
    color:'rgba(153, 144, 255, 1)'
  },
  indicator: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: SIZES.height * 0.78,
    left: SIZES.width * 0.43,
  },
});

export default OTPVerification;
