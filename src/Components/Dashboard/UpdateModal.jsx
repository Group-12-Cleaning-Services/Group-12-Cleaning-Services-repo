import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome,Feather, MaterialIcons } from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-web';



const UpdateModal = () => {

    const [serviceType, setServiceType] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

  const dispatch = useDispatch()

  const handleChange = (key, value) => {
    if (key === 'type') {
      setServiceType(value);
    } else if (key === 'price') {
      setPrice(value);
    }else if(key === 'desc'){
      setDescription(value)
    }
  };

  const handleUpdateService = async (id) => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const response = await axios.post(
          `https://cleaningserve.pythonanywhere.com/api/service/update/${id}/`,
          {
            serviceType,
            price,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        if(response.status === 200){
          setServices(response.data);
          Alert.alert("Success✔️", "Successfully updated");
        } else {
          Alert.alert("Error⚠️", 'Something went wrong!');
        }
      }
    } catch (error) {
      console.error('Something went wrong!', error);
    }
  };
  
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
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                  <TextInput 
                   style={styles.input} 
                   placeholder="Service type"
                   onChangeText={(value) => handleChange('type', value)}
                   />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput 
                   style={styles.input} 
                   placeholder="Service type"
                   keyboardType="numeric"
                   onChangeText={(value) => handleChange('price', value)}
                   />
                </View>
                <Textarea
                 containerStyle={styles.inputContainer}
                 style={styles.input}
                 maxLength={120}
                 placeholder={'Service description'}
                 placeholderTextColor={'#c7c7c7'}
                 underlineColorAndroid={'transparent'}
                 onChangeText={(value) => handleChange('desc', value)}
                />
            </View>
            <Pressable
              style={[styles.button, styles.updateBtn]}
              onPress={handleUpdateService}>
              <Text style={styles.updateBtnText}>Update</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.closeBtn]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeBtnText}>Close</Text>
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
  updateBtn:{},
  updateBtnText:{},
  closeBtn: {
    backgroundColor: '#FF0000',
    margin:SIZES.width*0.05,
    flexDirection:"row"
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

export default UpdateModal;