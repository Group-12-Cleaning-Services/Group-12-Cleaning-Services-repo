import React from 'react';
import {View,Text,SafeAreaView,StyleSheet, TextInput,ScrollView,} from 'react-native';
import DashboardNavbar from '../../Components/DashboardNavbar';
import { SIZES } from '../../Constants/Theme';
import Textarea from 'react-native-textarea';
import Button from '../../Components/Button';
import { FontAwesome } from '@expo/vector-icons';
import ImagePickerComponent from '../../Components/ImagePicker';


const AddService = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={styles.uploadTextContainer}>
           <View style={styles.border}>
           <FontAwesome name="cloud-upload" size={24} color="black" />
           <Text style={styles.uploadText}>Upload services here</Text>
           </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.inputContainer}
        >
          <View style={styles.inputs}>
            <TextInput style={styles.input} placeholder="Service type" />
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <Textarea
            containerStyle={styles.inputs}
            style={styles.input}
            maxLength={120}
            placeholder={'Service description'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
          <ImagePickerComponent/>
          <Button
          title={"Upload"}
          buttonContainer={styles.btnsContainer}
          buttonText={styles.buttonText}
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
  uploadTextContainer:{
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center"
  },
  border:{
    borderBottomWidth:1,
    flexDirection:"row",
    alignItems:"center",
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop:SIZES.height*0.05 
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
    paddingTop: SIZES.height*0.03,
    paddingBottom:SIZES.height*0.03
  },
});

export default AddService;
