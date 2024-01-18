import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';


export default function ProfileScreen({navigation}) {

  const [user, setUser] = useState('')
  const [userType, setUserType] = useState();
  const [profileState, setProfileState] = useState('');
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [profile_image, setProfile_image] = useState('')
  const [notification, setNotification] = useState('');
  const [count, setCount] = useState();

  const handleNavigation = () =>{
    navigation.navigate("Notifications")
  }

  const handleLogout = async() =>{
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("user_type")
    navigation.navigate("Home")
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningservice.onrender.com/api/profile/retrieve/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }
          ); 

          const value = await AsyncStorage.getItem('user');
          const user_typeValue = await AsyncStorage.getItem('user_type');

          if(response.status === 200){
            setFirst_name(response.data.profile?.first_name);
            setLast_name(response.data.profile?.last_name);
            setProfile_image(response.data.profile?.profile_image)
            setUser(value || '');
            setUserType(user_typeValue || '');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [first_name || last_name]); 


  useEffect(() => {
    const getNotifications = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningservice.onrender.com/api/notification/all/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            setNotification(response.data.notifications);
            const notificationCount = response.data.notifications.flat().length;
            setCount(notificationCount);
          } else {
            Alert.alert('Error⚠️', 'Something went wrong!');
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };

    getNotifications();
  }, [count]);
  


  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <ScrollView style={{flex:1}}>
        <View style={styles.itemsContainer}>
      <View style={styles.header}>
      <Feather name="log-out" 
       size={24} color="black" 
       style={styles.mirroredIcon} 
       onPress={() => navigation.goBack()}
      />
       <View style={styles.notificationContainer}>
          <Ionicons 
            style={styles.notfiIcon} 
            name="notifications" 
            size={24} 
            color="black"
            onPress={handleNavigation} 
            />
          {count > 0 && 
           <Text
            onPress={handleNavigation} 
            style={styles.notificationCount}>
              {count}
            </Text>}
        </View>
      </View>
      <View style={styles.profileSection}>
        {profile_image && 
        <Image
         source={{uri:'https://cleaningservice.onrender.com'+profile_image}}
          style={styles.profileImage}
        />
        }
         {!profile_image && 
        <Image
         source={require("../../../assets/profile.png")}
          style={styles.profileImage}
        />
        }
        {first_name &&
        <Text style={styles.name}>{first_name || ''} {last_name || ''}</Text> 
        }
        <Text style={styles.email}>{user || ''}</Text>
        {!first_name &&
        <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("CreateProfile")}>
        <Text style={styles.editButtonText} >Create Profile</Text>
      </TouchableOpacity> 
        }
        {first_name &&
        <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("EditProfile")}>
        <Text style={styles.editButtonText} >Edit Profile</Text>
      </TouchableOpacity>
        }
      </View>
      <View style={styles.optionsSection}>
      <View style={styles.profileHeaderText}>
        <Text style={{fontSize:20}}>Profile</Text>
      </View>
        <View style={styles.option}>
          <Feather name="user" size={24} color="black" />
          <Text style={styles.optionText}>Regsitered as a {userType?.replace(/_/g, ' ' )}</Text>
        </View>
       {userType==="service_provider" &&
        <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("Dashboard")}>
        <Feather name="book-open" size={24} color="black" />
        <Text style={styles.optionText} >View Dashboard</Text> 
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity> 
       }
        {userType==="customer" &&
        <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate("MyBookings")}>
        <Feather name="book-open" size={24} color="black" />
        <Text style={styles.optionText} >My Bookings</Text> 
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity> 
       }
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Feather name="log-out" size={24} color="black"  />
          <Text style={styles.optionText} >Logout</Text>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3CDE0',
  },
  itemsContainer:{
   
  },
  mirroredIcon: {
    transform: [{ scaleX: -1 }],
  },
  header: {
    marginTop: SIZES.height*0.03,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop:Platform.OS==="ios" ? SIZES.height*0.1: SIZES.height*0.01
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    backgroundColor: 'yellow', 
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: 'rgba(100, 151, 177, 1)',
    borderWidth: 0.5,
  },
  editButtonText: {
    fontSize: 16,
    color: 'black',
  },
  profileHeaderText:{
    paddingLeft:30,
    paddingBottom:10
  },
  optionsSection: {
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(100, 151, 177, 1)',
    marginHorizontal: 20,
  },
  optionText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
  },
  notfiIcon: {
    paddingRight: SIZES.width * 0.02,
  },
  notificationContainer:{
    alignItems:"flex-end",
    justifyContent:"center"
  },
  notificationCount: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 200,
    width:SIZES.width*0.075,
    paddingVertical: SIZES.height*0.003,
    bottom:SIZES.height*0.065,
    textAlign:"center" 
  },
});