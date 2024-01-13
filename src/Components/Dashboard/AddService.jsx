import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';
import Textarea from 'react-native-textarea';
import Buttons from '../../Components/Button';
import { FontAwesome } from '@expo/vector-icons';

const AddService = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
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

  const resetFields = () => {
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setThumnail(null);
  };

  const handleAddService = async () => {
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
          'https://cleaningservice.onrender.com/api/service/create/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 201) {
          console.log(response.data)
          Alert.alert('Success✔️', 'Service created Successfully');
          resetFields(); 
        } else if (response.status === 403) {
          Alert.alert('Warning⚠️', 'Not authorized');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={styles.uploadTextContainer}>
          <View style={styles.border}>
            <FontAwesome name="cloud-upload" size={24} color="black" />
            <Text style={styles.uploadText}>Upload services here</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.inputContainer}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Service type"
              onChangeText={(value) => handleChange('title', value)}
              value={title}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="category"
              onChangeText={(value) => handleChange('category', value)}
              value={category}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(value) => handleChange('price', value)}
              value={price}
            />
          </View>
          <Textarea
            containerStyle={styles.inputs}
            style={styles.input}
            maxLength={120}
            placeholder={'Service description'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            onChangeText={(value) => handleChange('desc', value)}
            value={description}
          />
          <View style={styles.imageContainer}>
            <Button title="Pick an image " onPress={pickImage} />
            {thumnail && <Image source={{ uri: thumnail }} style={{ width: 200, height: 200 }} />}
          </View>
          <Buttons
            title={'Upload'}
            buttonContainer={styles.btnsContainer}
            buttonText={styles.buttonText}
            press={handleAddService}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    paddingTop: SIZES.height * 0.02,
    flex: 1,
  },
  uploadTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  border: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: SIZES.height * 0.05
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
  input: {
    padding: SIZES.width * 0.003,
    width: SIZES.width * 0.6,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "white",
    backgroundColor: "#005B96",
    width: SIZES.width * 0.25,
    padding: SIZES.height * 0.013,
    textAlign: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  btnsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: SIZES.height * 0.03,
    paddingBottom: SIZES.height * 0.03
  },
  uploadText: {
    paddingLeft: 10,
  },
});

export default AddService;
