import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function ProfileScreen({navigation}) {
  const [user, setUser] = useState('')
  const [userType, setUserType] = useState();
  const [profileState, setProfileState] = useState('');
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')

  useEffect(() => {
    const getItemFromStorage = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningserve.pythonanywhere.com/api/profile/retrieve/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }
          );

          setFirst_name(response.data.profile.first_name);
          setLast_name(response.data.profile.last_name)
    
        }
        const value = await AsyncStorage.getItem('user');
        const user_typeValue = await AsyncStorage.getItem('user_type');
        if (value !== null) {
          setUser(value);
        }if(user_typeValue !== null){
          setUserType(user_typeValue)
        } else {
          console.log('Item not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving item from AsyncStorage:', error);
      }
    };

    getItemFromStorage();
  }, []); 

  

  const handleLogout = async() =>{
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("user")
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={styles.header}>
      <Feather name="log-out" 
       size={24} color="black" 
       style={styles.mirroredIcon} 
       onPress={() => navigation.goBack()}
      />
      </View>
      <View style={styles.profileSection}>
        <Image
        source={require("../../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{first_name} {last_name}</Text>
        <Text style={styles.email}>{user}</Text>
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
        <TouchableOpacity style={styles.option}>
          <Feather name="book-open" size={24} color="black" />
          {userType === "customer" &&
          <Text style={styles.optionText} onPress={()=>navigation.navigate("TabView")}>My Bookings</Text>
          }
          {userType === "service_provider" &&
          <Text style={styles.optionText} onPress={()=>navigation.navigate("Dashboard")}>Dashboard</Text> 
          }
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Feather name="log-out" size={24} color="black"  />
          <Text style={styles.optionText} >Logout</Text>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
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
  mirroredIcon: {
    transform: [{ scaleX: -1 }],
  },
  header: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
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
});