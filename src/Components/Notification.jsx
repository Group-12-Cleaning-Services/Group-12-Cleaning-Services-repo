import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SIZES } from '../Constants/Theme';
import Button from './Button';

const Notification = ({navigation}) => {

  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

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
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, [notification]);

  const handleDelete = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const response = await axios.delete(
          `https://cleaningservice.onrender.com/api/notification/delete/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        if(response.status === 200){
          Alert.alert("Success✔️", "Successfully Deleted")
        }
        else{
          Alert.alert("Error⚠️", 'Not authorized!')
        }
      }
    } catch (error) {
      console.error('Something went wrong!', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      {loading ? (
        <View style={styles.activity}>
          <ActivityIndicator size={50} color="#0000ff" style={styles.loadingIndicator} />
          <Text style={styles.activityText}>Fetching Notifications...</Text>
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.headerText}>Notifications</Text>
          {notification.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text onPress={()=>navigation.navigate("Dashboard")}>{item.message}</Text>
            </View>
          ))}
          <Button
            title={'Clear all'}
            buttonContainer={styles.buttonContainer}
            buttonText={styles.buttonText}
            press={handleDelete}
          />
        </ScrollView>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  itemContainer: {
    paddingTop: SIZES.height * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: SIZES.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop:SIZES.height*0.04
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activity:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop:SIZES.height*0.4
  },
  activityText:{
    paddingTop:SIZES.height*0.06
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  buttonText: {
    color: 'black',
    backgroundColor: 'white',
    width: SIZES.width * 0.4,
    padding: SIZES.height * 0.017,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Notification;
