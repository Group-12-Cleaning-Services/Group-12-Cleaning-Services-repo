import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { FontAwesome,Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIZES } from '../../Constants/Theme';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { useSelector } from 'react-redux';



const ProfileModal = ({viewNav, logoutNav}) => {

  const dispatch = useDispatch()

  const handleViewProfile =()=>{
    dispatch(modalActions.handleProfileModal())
    viewNav()
  }

  const handleLogout = async() =>{
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("user")
    logoutNav()
    dispatch(modalActions.handleProfileModal())
  }
  const modalVisible = useSelector((state)=>state.modal.profileModal);
  console.log(modalVisible)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>Xavier & Co.</Text>
            <FontAwesome style={styles.userIcon}
             name="user-circle" size={40} color="black"
             />
            <Pressable
              style={[styles.button, styles.viewProfileBtn]}
              onPress={handleViewProfile}
              >
              <MaterialIcons name="dashboard" 
              size={24} color="black" 
              style={styles.dashboardIcon}
               />
              <Text style={styles.textStyle}>View Profile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.logoutBtn]}
              onPress={handleLogout}>
              <Feather name="log-out" 
              size={24} color="white"
              style={styles.logoutIcon}
              />
              <Text style={[styles.textStyle, {color:"white"}]}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end',
    flexDirection:"row",
    paddingTop:SIZES.height*0.03
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:SIZES.width*0.51,
    height:SIZES.height*0.41,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  userIcon:{
    margin:SIZES.width*0.02
  },
 viewProfileBtn: {
    backgroundColor: '#B3CDE0',
    margin:SIZES.width*0.01,
    flexDirection:"row"
  },
  dashboardIcon:{
    paddingRight:SIZES.width*0.01
  },
  logoutBtn: {
    backgroundColor: '#FF0000',
    margin:SIZES.width*0.05,
    flexDirection:"row"
  },
  logoutIcon:{
    paddingRight:SIZES.width*0.01
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeaderText: {
    marginBottom: 15,
    textAlign: 'center',
    paddingTop:SIZES.height*0.03,
    fontWeight:"bold",
    fontSize:SIZES.width*0.05
  },
});

export default ProfileModal;