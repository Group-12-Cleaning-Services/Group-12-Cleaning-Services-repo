import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={styles.header}>
      <Feather name="log-out" size={24} color="black" style={styles.mirroredIcon} />
      </View>
      <View style={styles.profileSection}>
        <Image
        source={require("../../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Elizabeth Geraldo</Text>
        <Text style={styles.email}>lizzygeraldo23@gmail.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsSection}>
      <View style={styles.profileHeaderText}>
        <Text style={{fontSize:20}}>Profile</Text>
      </View>
        <View style={styles.option}>
          <Feather name="user" size={24} color="black" />
          <Text style={styles.optionText}>Registered as a customer</Text>
        </View>
        <TouchableOpacity style={styles.option}>
          <Feather name="book-open" size={24} color="black" />
          <Text style={styles.optionText} onPress={()=>navigation.navigate("MyBookings")}>My Bookings</Text>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Feather name="log-out" size={24} color="black" />
          <Text style={styles.optionText}>Logout</Text>
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