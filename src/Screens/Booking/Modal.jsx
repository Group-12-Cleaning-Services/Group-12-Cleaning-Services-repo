import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { SIZES } from '../../Constants/Theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { modalActions } from "../../store/modal";


const ModalScreen = ({time, location, date, paymentNav}) => {
  const dispatch = useDispatch()

  const handleModalState =()=>{
    dispatch(modalActions.handleModal())
  }
  const modalVisible = useSelector((state)=>state.modal.modal)
  // console.log(modalVisible)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <View style={styles.modalText}>
           <Text style={styles.title}>Confirmation</Text>
            <Text style={styles.desc}>{location}</Text>
            <Text style={styles.desc}>{date}</Text>
            <Text style={styles.desc}>{time}</Text>
            <Text style={styles.desc}>{time}</Text>
           </View>
           <View style={styles.confirmCancelBtns}>
           <Pressable
           onPress={paymentNav}
              style={[styles.button, styles.buttonContinue]}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleModalState}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
           </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.height*0.1,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: SIZES.width*0.2,
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
  confirmCancelBtns:{
    display:"flex",
    alignItems:"center",
    paddingTop:SIZES.height*0.02
  },
  title:{
    fontWeight:"bold",
    fontSize:SIZES.width*0.07
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "rgba(179, 205, 224, 1)",
    width:SIZES.width*0.4,
    marginTop:SIZES.height*0.02
  },
  buttonContinue: {
    backgroundColor: "#03396C",
    width:SIZES.width*0.3
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    margin:SIZES.width*0.01,
    textAlign: 'center',
  },
  modalText:{
    marginBottom:SIZES.height*0.02
  }
});

export default ModalScreen;