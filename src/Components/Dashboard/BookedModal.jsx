import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { useSelector } from 'react-redux';
import { dropdownData } from "../../../Data";
import { serviceActions } from '../../store/services';

const BookedModal = () => {

  const [status, setStatus] = useState()
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const update_id = useSelector((state) => state.modal.updateId);
  console.log(update_id);

  const handleCloseModal = () => {
    dispatch(modalActions.handleUpdateModal());
  };

  const handleStatus = () => {
    dispatch(serviceActions.handleServiceStatus({value:value}));
  };

  const handleUpdateService = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const formData = new FormData();
        formData.append('status', status);

        const response = await axios.post(
          `https://cleaningservice.onrender.com/api/service/update/${update_id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(response)

        if (response.status === 200) {
          console.log(response.data);
          Alert.alert('Success✔️', 'Service Status Updated Successfully');
          dispatch(modalActions.handleUpdateModal());
        } else if (response.status === 403) {
          Alert.alert('Warning⚠️', 'Not authorized');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleUpdateService = () =>{
  //   dispatch(updateService(
  //     {
  //       update_id:update_id, 
  //       title:title, 
  //       price:price, 
  //       category:category, 
  //       thumnail:thumnail
  //     }
  //     ))
  // }


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <Dropdown
                 style={[styles.inputField, isFocus && { borderColor: 'blue' }]}
                 placeholderStyle={styles.placeholderStyle}
                 selectedTextStyle={styles.selectedTextStyle}
                 inputSearchStyle={styles.inputSearchStyle}
                 iconStyle={styles.iconStyle}
                 data={dropdownData}
                 maxHeight={300}
                 labelField="label"
                 valueField="value"
                 placeholder={!isFocus ? 'Change Status' : '...'}
                 value={value}
                 onFocus={() => setIsFocus(true)}
                 onBlur={() => setIsFocus(false)}
                 onChange={item => {
                 setValue(item.value);
                 setIsFocus(false);
                }}
                renderLeftIcon={() => (
                <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
               />
              )}
              />
           </View>
            </View>
            <View style={styles.btnsContainer}>
              <Pressable
                style={[styles.button, styles.closeBtn]}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.updateBtn]}
                onPress={handleStatus}
              >
                <Text style={styles.updateBtnText}>Update</Text>
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
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: SIZES.height * 0.15,
    height:SIZES.height,
    marginTop: -StatusBar.currentHeight,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.3,
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
  border: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  inputs: {
    borderRadius: 6,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderColor: 'rgba(144, 137, 137, 1)',
    padding: SIZES.width * 0.0095,
    width: SIZES.width * 0.7,
    margin: SIZES.width * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textAreaContainer: {
    borderRadius: 6,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderColor: 'rgba(144, 137, 137, 1)',
    width: SIZES.width * 0.67,
    height: SIZES.height * 0.14,
    margin: SIZES.width * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: SIZES.width * 0.003,
    width: SIZES.width * 0.6,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  btnsContainer: {
    flexDirection: 'row',
    paddingBottom:SIZES.height*0.06,
    justifyContent:"space-evenly",
    display:"flex"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  updateBtn: {
    backgroundColor: 'mediumseagreen',
    flexDirection: 'row',
    width:SIZES.width*0.23,
    margin:SIZES.width*0.03,
    alignItems:'center',
    justifyContent:"center"
  },
  updateBtnText: {
    color: 'white',
  },
  closeBtn: {
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    width:SIZES.width*0.23,
    margin:SIZES.width*0.03,
    alignItems:'center',
    justifyContent:"center"
  },
  closeText: {
    color: 'white',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeaderText: {
    marginBottom: 15,
    textAlign: 'center',
    paddingTop: SIZES.height * 0.03,
    fontWeight: 'bold',
    fontSize: SIZES.width * 0.05,
  },
});

export default BookedModal;
