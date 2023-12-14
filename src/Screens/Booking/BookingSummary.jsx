import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../Components/Button';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';

const BookingSummary = ({ navigation }) => {

  const {
    container,
    linearGradientBackground,
    imageContainer,
    image,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    buttonText,
    buttonContainer,
  } = styles;

  return (
    <LinearGradient
      colors={['#040268', '#1410B4', '#040268']}
      locations={[0.36, 0.4889, 0.9948]}
      style={linearGradientBackground}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <SafeAreaView style={container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : '100%'}
          style={container}
        >
          <View style={imageContainer}>
            <Image source={require('../../../assets/logo.png')} style={image} />
          </View>
          <View style={welcomeContainer}>
            <Text style={welcomeTitle}>Thank you, Elizabeth</Text>
            <Text style={welcomeText}>
            You have successfully booked for our services , we  look  forward to working with you.
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.details}>
            <Text style={styles.detailHeader}>Here are your booking detials</Text>
            <Text style={styles.boldText}>Name: <Text style={styles.detail}>Elizabeth</Text></Text>
            <Text style={styles.boldText}>Date: <Text style={styles.detail}>20/11/2023</Text></Text>
            <Text style={styles.boldText}>Time: <Text style={styles.detail}>11am</Text></Text>
            <Text style={styles.boldText}>Amount: <Text style={styles.detail}>Ghc200</Text></Text>
            <Text style={styles.boldText}>Service: <Text style={styles.detail}>Deep Washing</Text></Text>
            <Text style={styles.boldText}>Agency: <Text style={styles.detail}>Xavier & Co</Text></Text>
            </View>
          </View>
          <Button
            title={'Back to home'}
            buttonContainer={buttonContainer}
            buttonText={buttonText}
            // press={navigation.navigate("Home")}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradientBackground: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  image: {
    width: SIZES.width * 0.4,
    height: SIZES.height * 0.34,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  welcomeText: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    width: 200,
  },
  detailContainer:{
    alignItems:'center',
    paddingTop:SIZES.height*0.05
  },
  details:{
    backgroundColor:"white",
    width:SIZES.width*0.76,
    height:SIZES.height*0.36,
    borderRadius:15,
    alignItems:"center",
    paddingTop:SIZES.height*0.02
  },
  boldText:{
    fontWeight:"bold",
  },
  detail:{
    fontWeight:"normal",
  },
  detailHeader:{
    color:"rgba(1, 31, 75, 1)"
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.03,
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
  scrollContainer: {
    flex: 1,
    // backgroundColor: "#B3CDE0",
    flexGrow: 1,
  },
});

export default BookingSummary;
