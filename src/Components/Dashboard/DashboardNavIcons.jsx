import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Alert, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { SIZES } from '../../Constants/Theme';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { useSelector } from 'react-redux';

const DashboardNavIcons = ({ viewNotification }) => {

  const [notification, setNotification] = useState('');
  const [count, setCount] = useState();
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.profileModal);

  const handleProfileModal = () => {
    dispatch(modalActions.handleProfileModal());
  };

  const handleNavigation = () =>{
    viewNotification()
  }

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
  }, []);


  return (
    <View>
      <View style={styles.headerItems}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Xavier&Co.</Text>
        </View>
        <View style={styles.headerIconsContainer}>
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
          <FontAwesome
            style={styles.userIcon}
            name="user-circle" size={24} color="black"
            onPress={handleProfileModal}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerItems: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? SIZES.height * 0.07 : SIZES.height * 0.03,
  },
  headerIconsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: SIZES.width * 0.05,
  },
  headerTextContainer: {
    paddingLeft: SIZES.width * 0.09,
  },
  headerText: {
    fontSize: SIZES.width * 0.06,
  },
  notfiIcon: {
    paddingRight: SIZES.width * 0.04,
  },
  userIcon: {
    paddingRight: SIZES.width * 0.04,
  },
  notificationCount: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 100,
    paddingHorizontal: SIZES.width * 0.01,
    paddingVertical: SIZES.height * 0.002,
    marginLeft: -SIZES.width * 0.03,
    bottom: SIZES.height * 0.02,
    right: SIZES.width * 0.04,
  },
});

export default DashboardNavIcons;
