import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
  TextInput,
  Pressable,
  Alert,
  StatusBar,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';
import Textarea from 'react-native-textarea';
import Buttons from '../../Components/Button';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { useSelector } from 'react-redux';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const UpdateModal = () => {

  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.updateModal);
  const update_id = useSelector((state) => state.modal.updateId);
  console.log(update_id);

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [thumnail, setThumnail] = useState(null);

  const handleChange = (key, value) => {
    if (key === 'title') {
      setTitle(value);
    } else if (key === 'price') {
      setPrice(value);
    } else if (key === 'category') {
      setCategory(value);
    } else if (key === 'desc') {
      setDescription(value);
    }
  };

  const handleCloseModal = () => {
    dispatch(modalActions.handleUpdateModal());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setThumnail(result.assets[0].uri);
    }
  };

  const handleUpdateService = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('thumbnail', {
          uri: thumnail,
          name: 'thumbnail.jpg',
          type: 'image/jpeg',
        });

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
          Alert.alert('Success✔️', 'Successfully added');
          dispatch(modalActions.handleUpdateModal());
        } else if (response.status === 403) {
          Alert.alert('Warning⚠️', 'Not authorized');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>Xavier & Co.</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.input}
                  placeholder="Service type"
                  onChangeText={(value) => handleChange('title', value)}
                />
              </View>
              <View style={styles.inputs}>
               <TextInput
                style={styles.input}
                placeholder="category"
                onChangeText={(value) => handleChange('category', value)}
              />
             </View>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.input}
                  placeholder="price"
                  keyboardType="numeric"
                  onChangeText={(value) => handleChange('price', value)}
                />
              </View>
              <Textarea
                containerStyle={styles.textAreaContainer}
                maxLength={120}
                placeholder={'Service description'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                onChangeText={(value) => handleChange('desc', value)}
              />
              <View style={styles.imageContainer}>
                <Pressable style={styles.imageBtn}>
                <Text onPress={pickImage} style={styles.imageBtnText}> 
                  choose image 
                </Text>
                </Pressable>
                {thumnail ? (
                  <Image
                    source={{ uri: thumnail }}
                    style={{ width: 100, height: 50 }}
                  /> ):(
                    <Text style={{paddingLeft:SIZES.width*0.03}}>No file chosen</Text>
                  )
                  }
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
                onPress={handleUpdateService}
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
    height: SIZES.height * 0.7,
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
  imageContainer: {
    alignItems: 'center',
    flexDirection:"row",
    justifyContent: 'center',
  },
  imageBtn:{
    backgroundColor:"blue",
    borderRadius:3,
    padding:SIZES.height*0.006,
  },
  imageBtnText:{
    color:"white",
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

export default UpdateModal;
