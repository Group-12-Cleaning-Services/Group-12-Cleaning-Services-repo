import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bookings } from '../../../Data';
import { nanoid } from "@reduxjs/toolkit";
import { SIZES } from '../../Constants/Theme';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

export default function MyBookings({ navigation }) {

  const [bookingss, setBookings] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access");
        if (accessToken) {
          const response = await axios.get(
            "https://cleaningservice.onrender.com/api/service/user-booked-service/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            const bookingData = response.data.services;
            setBookings(bookingData);
            setStatus(response.data.status);
          }
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  console.log(bookingss)

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching Bookings...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <View style={styles.gobackArrow}>
        <Feather name="arrow-left" size={24} color="black" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.MyBookingsTextContainer}>
        <Text style={styles.MyBookingsText}>My Bookings</Text>
      </View>
      {bookings === ''?(
         <ScrollView style={styles.bookingList}>
         {bookingss?.map((booking, index) => (
           <View key={index} style={styles.bookingCard}>
             <Text style={styles.bookingId}>{nanoid()}</Text>
             <Text style={[{ color: booking.color }, styles.bookingStatus]}>{booking.status}</Text>
             <Text style={styles.bookingName}>{booking?.title}</Text>
             <Text style={styles.bookingDate}>{booking?.date}</Text>
             <Text style={styles.bookingPrice}>{booking?.price}</Text>
             <View style={styles.border}></View>
             <Text style={styles.bookingCompany}>{booking?.organization_name}</Text>
           </View>
         ))}
       </ScrollView>
      ):(
        <Text style={styles.bookingInfoText}>No Booking information found</Text>
      )}
      <TouchableOpacity style={styles.homeButton}>
        <Feather name="home" size={24} color="black" onPress={() => navigation.navigate("Home")} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
  },
  gobackArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.height * 0.05,
    paddingLeft: SIZES.height * 0.03,
  },
  MyBookingsTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: SIZES.height * 0.02,
  },
  MyBookingsText: {
    fontSize: SIZES.width * 0.07,
  },
  bookingList: {
    flex: 1,
  },
  bookingCard: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: 'rgba(100, 151, 177, 1)',
    borderWidth: 0.5,
  },
  bookingId: {
    fontWeight: 'bold',
  },
  bookingStatus: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffff',
    padding: 7,
    borderRadius: 20,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bookingDate: {
    color: '#555',
  },
  bookingPrice: {
    color: '#555',
  },
  bookingCompany: {
    color: '#555',
    marginBottom: 10,
  },
  border: {
    borderTopWidth: 0.5,
    borderColor: 'rgba(100, 151, 177, 1)',
    marginTop: 10,
    marginBottom: 10,
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingInfoText:{
    textAlign:'center',
    paddingTop:SIZES.height*0.03
  }
});
