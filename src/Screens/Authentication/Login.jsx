import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingModal } from "react-native-loading-modal";
import Button from '../../Components/Button';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    if (key === 'email') {
      setEmail(value);
    } else if (key === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
  
      const response = await axios.post(
        'https://cleaningservice.onrender.com/api/login/',
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        console.log(response.status)
        await AsyncStorage.setItem('access', response.data.token.access);
        await AsyncStorage.setItem('user', email);
        Alert.alert('Success✔️', 'Logged in successful');
        setEmail('');
        setPassword('');
        navigation.navigate('Organizations');
      }
    } catch (error) {
      Alert.alert('Invalid⚠️', 'Incorrect password or username');
    } finally {
      setLoading(false);
    }
  };  

  const {
    container,
    linearGradientBackground,
    imageContainer,
    image,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    inputContainer,
    input,
    buttonText,
    buttonContainer,
    forgotPass,
    forgotPassText,
    clickHere,
    indicator,
  } = styles;

  return (
    <LinearGradient
      colors={['#040268', '#1410B4', '#040268']}
      locations={[0.36, 0.4889, 0.9948]}
      style={linearGradientBackground}
    >
      <ScrollView>
      <SafeAreaView style={container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : '100%'}
          style={container}
        >
          <View style={imageContainer}>
            <Image source={require('../../../assets/logo.png')} style={image} />
          </View>
          <View style={welcomeContainer}>
            <Text style={welcomeTitle}>Welcome Back!</Text>
            <Text style={welcomeText}>Please Log into your existing account</Text>
          </View>
          <View style={inputContainer}>
            <TextInput
              style={input}
              placeholder="Email"
              placeholderTextColor="#fff"
              onChangeText={(value) => handleChange('email', value)}
              value={email}
            />
            <TextInput
              style={input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              onChangeText={(value) => handleChange('password', value)}
              value={password}
            />
          </View>
          <Button
            title={'Login'}
            buttonContainer={buttonContainer}
            buttonText={buttonText}
            press={handleLogin}
          />
          <Text style={indicator}>
            {loading && <LoadingModal task='Logging in..' modalVisible={true} />}
          </Text>
          <View style={forgotPass}>
            <Text style={forgotPassText}>Forgot Password?</Text>
            <Text style={clickHere} onPress={() => navigation.navigate('OTPMail')}>
              Click Here
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradientBackground: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  image: {
    width: SIZES.width * 0.4,
    height: SIZES.height * 0.34,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  welcomeText: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    width: 200,
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.05,
  },
  input: {
    borderWidth: 2,
    borderColor: '#fff',
    width: SIZES.width * 0.8,
    padding: SIZES.height * 0.017,
    borderRadius: 10,
    margin: 10,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width * 0.4,
    padding: SIZES.height * 0.017,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  forgotPass: {
    alignItems: 'center',
    paddingTop: 13,
  },
  forgotPassText: {
    color: 'white',
  },
  clickHere: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  indicator: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: SIZES.height * 0.78,
    left: SIZES.width * 0.43,
  },
});

export default Login;
