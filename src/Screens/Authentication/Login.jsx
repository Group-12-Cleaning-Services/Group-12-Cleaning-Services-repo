import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';



const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('')

  const handleChange = (key,value) =>{
    if (key === 'username') {
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      navigation.navigate('Home');
    } catch (error) {
      setErr(error.message)
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
            placeholder="Username"
            placeholderTextColor="#fff"
            onChangeText={(value)=>handleChange('usename', value)}
            value={username}
          />
          <TextInput
            style={input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            onChangeText={(value)=>handleChange('password', value)}
            value={password}
          />
        </View>
        <Button
          title={'Login'}
          buttonContainer={buttonContainer}
          buttonText={buttonText}
          press={handleLogin}
        />
        <View style={forgotPass}>
          <Text style={forgotPassText}>Forgot Password?</Text>
          <Text
            style={clickHere}
            onPress={() => navigation.navigate('ResetPassword')}
          >
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
    paddingTop: Platform.OS ==="ios" ? 120 : 0
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
});

export default Login;
