import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

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
        'https://cleaningserve.pythonanywhere.com/api/login/',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem('access', response.data.access);
        await AsyncStorage.setItem('user', email);
        navigation.navigate('Organizations');
      }
    } catch (error) {
      Alert.alert('Invalid', 'Incorrect password or username');
      setLoading(false); 
    } finally {
      setLoading(false); 
      setEmail('');
      setPassword('')
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
    indicator
  } = styles;

  return (
    <LinearGradient
      colors={['#040268', '#1410B4', '#040268']}
      locations={[0.36, 0.4889, 0.9948]}
      style={linearGradientBackground}
    >
      <SafeAreaView style={container}>
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
          {loading && <ActivityIndicator color="yellow" size="large" press={handleLogin} />} 
        </Text>
        <View style={forgotPass}>
          <Text style={forgotPassText}>Forgot Password?</Text>
          <Text style={clickHere} onPress={() => navigation.navigate('ResetPassword')}>
            Click Here
          </Text>
        </View>
      </SafeAreaView>
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
    paddingTop: Platform.OS === "ios" ? 120 : 0
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: Platform.OS === 'ios' ? 210 : 200,
    height: Platform.OS === 'ios' ? 210 : 200,
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
    paddingTop: 25,
  },
  input: {
    borderWidth: 2,
    borderColor: '#fff',
    width: Platform.OS === "ios"? 300 : 240,
    padding: Platform.OS === "ios"? 15 : 7,
    borderRadius: 10,
    margin: 10,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 5,
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: 110,
    padding: 10,
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
  indicator:{
    alignItems:'center',
    textAlign:'center',
    position:"absolute",
    top:SIZES.height*0.74,
    left:SIZES.width*0.45
  }
});

export default Login;
