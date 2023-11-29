import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';

const OTPVerification = ({navigation}) => {
    const {headerContainer, headerTitle, headerMessage, resendContainer, resendText} = styles
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationSubmit = () => {
    const expectedCode = '1234';

    if (verificationCode === expectedCode) {
      Alert.alert('Verification Successful', 'You may proceed to the next step.');
    } else {
      Alert.alert('Verification Failed', 'Please enter the correct verification code.');
    }
  };

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
            value={verificationCode[index - 1]}
            onChangeText={(text) => {
              let updatedCode = verificationCode;
              updatedCode = updatedCode.split('');
              updatedCode[index - 1] = text;
              setVerificationCode(updatedCode.join(''));
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerificationSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={resendContainer}>
        <Text style={resendText} onPress={()=>navigation.navigate("OTP")}>
        Resend code
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 10, 10, 1)',
    marginTop: StatusBar.currentHeight || 0,
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
  }
});

export default OTPVerification;
