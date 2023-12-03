import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../Components/Button';
import { SIZES } from "../../Constants/Theme";
import SaveSuccess from "../Profile/SaveSuccess";
import axios from 'axios';

const EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (key, value) => {
    if (key === 'username') {
      setUsername(value);
    } else if (key === 'fullName') {
      setFullName(value);
    } else if (key === 'phone') {
      setPhone(value);
    }
  };

  const handleProfileEdit = async () => {
    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        fullName,
        phone,
      });
      console.log('Profile updated successful:', response.data);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate('Profile');
      }, 1000);
    } catch (error) {
      setErr(error.message);
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
    scrollContainer
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
              <Text style={welcomeText}>Changes made to this file can be changed again</Text>
            </View>
            <View style={inputContainer}>
              <View style={input}>
                <Feather name={'lock'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                  placeholder="Full Name"
                  secureTextEntry
                  onChangeText={(value) => handleChange('fullName', value)}
                />
              </View>
              <View style={input}>
                <Feather name={'lock'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                  placeholder="Username"
                  secureTextEntry
                  onChangeText={(value) => handleChange('username', value)}
                />
              </View>
              <View style={input}>
                <Feather name={'phone'}
                  size={20} color={'black'}
                  style={iconUser} />
                <TextInput
                  placeholder="Phone"
                  secureTextEntry
                  onChangeText={(value) => handleChange('phone', value)}
                />
              </View>
            </View>
            <View style={btnsContainer}>
              <Button title={'Save'}
                buttonContainer={saveCancelBtn}
                buttonText={buttonText}
                press={handleProfileEdit}
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
