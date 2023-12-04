import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Alert, ActivityIndicator,Image, Text, View, TextInput, Platform, } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Button from '../../Components/Button';
import { SIZES } from '../../Constants/Theme';
import axios from 'axios';


const OrgRegister = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loaction, setLocation] = useState('');
  const [user_type, setUserType] = useState("service_provider")
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleChange = (key,value) =>{
    if (key === 'username') {
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    }else if (key === 'email') {
      setEmail(value);
    }else if (key === 'phone') {
      setPhone(value);
   }else if (key === 'location') {
    setLocation(value);
}
}

const handleCreateAccount = async () => {
  try {
    setLoading(true);
    const response = await axios.post('https://cleaningserve.pythonanywhere.com/api/accounts/create/', {
      email,
      password,
      user_type
    });
    if(response.status === 201){
      Alert.alert("Success","User created succesful")
      await AsyncStorage.setItem("userRegistered",email);
      await AsyncStorage.setItem("user_type",user_type);
      navigation.navigate("OTP")
    }
    if(response.status === 208){
      alert("User already exist")
    }
  } catch (error) {
    // Alert.alert("Warning", "Something went wrong")
    console.log(error)
    setLoading(false); 
    setEmail('');
    setPassword('')
  }finally {
    setLoading(false); 
    setEmail('');
    setPassword('')
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
    inputField,
    buttonText,
    buttonContainer,
    haveAccountText,
    haveAccount,
    iconUser,
    scrollContainer,
    indicator
  } = styles;

  return (
    <SafeAreaView style={container}>
       <ScrollView style={scrollContainer}>
      <View style={imageContainer}>
        <Image source={require("../../../assets/logo.png")} style={image} />
      </View>
      <View style={welcomeContainer}>
        <Text style={welcomeTitle}>Create Account</Text>
        <Text style={welcomeText}>Sign up as an organization to post your services</Text>
      </View>
      <View style={inputContainer}>
        <View style={input}>
          <Feather name={'user'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput style={inputField} 
           placeholder="Username" 
           onChangeText={(value)=>handleChange('username', value)}
           />
        </View>
        <View style={input}>
          <Feather name={'lock'} 
           size={20} color={'black'} 
           style={iconUser} 
           />
          <TextInput style={inputField} 
           placeholder="Password" 
           secureTextEntry 
           onChangeText={(value)=>handleChange('password', value)}
           value={password}
           />
        </View>
        <View style={input}>
          <Feather name={'mail'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput style={inputField} 
           placeholder="Email"
           onChangeText={(value)=>handleChange('email', value)}
           value={email} 
          />
        </View>
        <View style={input}>
          <Feather name={'phone'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput style={inputField} 
           placeholder="Phone" 
           onChangeText={(value)=>handleChange('phone', value)}
           />
        </View>
        <View style={input}>
          <Feather name={'map-pin'} 
           size={20} color={'black'} 
           style={iconUser} />
          <TextInput style={inputField} 
           placeholder="Location" 
           onChangeText={(value)=>handleChange('location', value)}
           />
        </View>
      </View>
      <Button title={'Create Account'}
       buttonContainer={buttonContainer}
       buttonText={buttonText}
       press={handleCreateAccount}
      />
      <Text style={indicator}>
        {loading && <ActivityIndicator color="yellow" size="large" press={handleCreateAccount} />} 
      </Text>
      <Button title={'Already have an account'}
       buttonContainer={haveAccount} 
       buttonText={haveAccountText}
       press={()=>navigation.navigate("Login")}
       />
      </ScrollView>
    </SafeAreaView>
    
  );
};
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    width: '100%',
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
    paddingBottom:10
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
    width: Platform.OS === "ios"? 300 : 240,
    padding: Platform.OS === "ios"? 10 : 7,
    borderRadius: 10,
    margin: 7,
    backgroundColor: 'white',
    color: 'black',
    marginVertical:10
  },
  inputField:{
    width:500
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width*0.4,
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
    paddingTop: 20,
  },
  haveAccountText: {
    color: 'white',
    backgroundColor: '#6497B1',
    width: SIZES.width*0.6,
    padding: Platform.OS === "ios"? 15 : 10,
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
    paddingTop: Platform.OS ==="ios" ? 25 : 0
  },
  indicator:{
    alignItems:'center',
    textAlign:'center',
    position:"absolute",
    top:SIZES.height*0.97,
    left:SIZES.width*0.45
  }
});

export default OrgRegister;
