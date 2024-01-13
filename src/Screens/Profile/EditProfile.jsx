import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../Components/Button';
import { SIZES } from "../../Constants/Theme";
import SaveSuccess from "../Profile/SaveSuccess";
import axios from 'axios';

const EditProfile = ({ navigation }) => {
  const [first_name, setFirst_name] = useState('');
  const [contact, setContact] = useState('');
  const [last_name, setLast_name] = useState('')
  const [showSuccess, setShowSuccess] = useState(false);
 

  const handleChange = (key, value) => {
    if (key === 'first_name') {
      setFirst_name(value);
    } else if (key === 'last_name') {
      setLast_name(value);
    } else if (key === 'contact') {
      setContact(value);
    }
  };

  const handleProfileEdit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
  
      if (accessToken) {
        const response = await axios.post(
          'https://cleaningservice.onrender.com/api/profile/update/',
          {
            first_name,
            last_name,
            contact,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        await AsyncStorage.setItem("profile_details", first_name)
        Alert.alert("Success","Profile updated successful")
        navigation.navigate("Profile")
  
      } else {
        Alert.alert("Not authorized")
         navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }finally{
      setFirst_name('')
      setLast_name('')
      setContact('')
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
    btnsContainer,
    scrollContainer,
    inputField
  } = styles;

  return (
    <ScrollView style={scrollContainer}>
      <SafeAreaView style={container}>
        {showSuccess ? (
          <SaveSuccess />
        ) : (
          <>
            <View style={imageContainer}>
              <Image source={require("../../../assets/logo.png")} style={image} />
            </View>
            <View style={welcomeContainer}>
              <Text style={welcomeTitle}>Edit Profile</Text>
              <Text style={welcomeText}>Changes made to this profile can be changed again</Text>
            </View>
            <View style={inputContainer}>
              <View style={input}>
                <Feather name={'lock'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                  style={inputField}
                  placeholder="First Name"
                  onChangeText={(value) => handleChange('first_name', value)}
                  value={first_name}
                />
              </View>
              <View style={input}>
                <Feather name={'lock'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                 style={inputField}
                  placeholder="Last Name"
                  onChangeText={(value) => handleChange('last_name', value)}
                  value={last_name}
                />
              </View>
              <View style={input}>
                <Feather name={'phone'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                style={inputField}
                  placeholder="Phone"
                  keyboardType="numeric"
                  onChangeText={(value) => handleChange('contact', value)}
                  value={contact}
                />
              </View>
            </View>
            <View style={btnsContainer}>
              <Button title={'Save'}
                buttonContainer={saveCancelBtn}
                buttonText={buttonText}
                press={handleProfileEdit}
                // press={()=>navigation.navigate("Profile")}
              />
              <Button title={'Cancel'}
                buttonContainer={saveCancelBtn}
                buttonText={cancelText}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
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
    width: SIZES.width*0.8,
    padding: 7,
    borderRadius: 10,
    margin: 7,
    backgroundColor: 'white',
    color: 'black',
    marginVertical:10
  },
  btnsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  saveCancelBtn: {
    alignItems: 'center',
    margin:10
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width*0.3,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cancelText: {
    color: 'white',
    backgroundColor: 'rgba(3, 57, 108, 1)',
    width: SIZES.width*0.3,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
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
    paddingBottom: 50
  }
});

export default EditProfile;
