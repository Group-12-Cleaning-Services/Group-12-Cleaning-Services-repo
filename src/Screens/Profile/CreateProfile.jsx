import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Image, Text, View, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../Components/Button';
import { SIZES } from "../../Constants/Theme";
import { LoadingModal } from "react-native-loading-modal";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CreateProfile = ({ navigation }) => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [contact, setContact] = useState('');
  const [profile_image, setProfile_image] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const handleChange = (key, value) => {
    if (key === 'first_name') {
      setFirst_name(value);
    } else if (key === 'last_name') {
      setLast_name(value);
    } else if (key === 'contact') {
      setContact(value);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile_image(result.assets[0].uri);
    }
  };

  const handleCreateProfile = async () => {
    try {
      setLoading(true)
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('contact', contact);
        formData.append('profile_image', {
          uri: profile_image,
          name: 'profile_image.jpg',
          type: 'image/jpeg',
        });

        const response = await axios.post(
          'https://cleaningservice.onrender.com/api/profile/create/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data', 
            },
          }
        )

        if(response.status === 201){
          Alert.alert("Profile created successful")
          navigation.navigate("Profile")
        }else if (response.status === 403) {
          Alert.alert('Warning⚠️', 'Not authorized');
        }
      } 
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
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
              <Text style={welcomeTitle}>Create a Profile</Text>
              <Text style={welcomeText}>Changes made to this file can be changed again</Text>
            </View>
            <View style={inputContainer}>
              <View style={input}>
                <Feather name={'user'}
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
                <Feather name={'user'}
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
              <View style={styles.imageContainer}>
                 <Pressable style={styles.imageBtn} onPress={pickImage}>
                   <Text style={styles.imageBtnText}>Choose Logo</Text>
                 </Pressable>
                  {profile_image ? (
                 <Image
                  source={{ uri: profile_image }}
                  style={{ width: 100, height: 50 }}
                 />
                  ) : (
                 <Text style={{ paddingLeft: SIZES.width * 0.03 }}>
                   No file chosen
                </Text>
                 )}
            </View>
            </View>
            <View style={btnsContainer}>
              <Button title={'Save'}
                buttonContainer={saveCancelBtn}
                buttonText={buttonText}
                press={handleCreateProfile}
              />
              <Button title={'Cancel'}
                buttonContainer={saveCancelBtn}
                buttonText={cancelText}
              />
            </View>
          </>
        )}
        <Text style={styles.indicator}>
          {loading && <LoadingModal modalVisible={true} />} 
       </Text>
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
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  imageBtn: {
    backgroundColor: '#6497B1',
    borderRadius: 3,
    padding: SIZES.height * 0.006,
  },
  imageBtnText: {
    color: 'white',
  },
  btnsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingTop:SIZES.height*0.02,
    paddingBottom:SIZES.height*0.02
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
  },
  indicator: {
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: SIZES.height * 0.78,
    left: SIZES.width * 0.43,
  },
});

export default CreateProfile;
