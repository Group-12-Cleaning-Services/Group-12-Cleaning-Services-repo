import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, Dimensions,TextInput, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native'
import { SIZES } from '../../Constants/Theme';


const Home = ({navigation}) => {
  const {
    container,
    logoContainer,
    logo,
    backgroundImage,
    textContainer,
    buttonContainer,
    buttonText,
    clickHereContainer,
    haveAccountText,
    clickHereText,
    btnText1,
    btnText2,
    title,
    description
  } = styles;

  return (
      <SafeAreaView style={container}>
        <ImageBackground
        style={backgroundImage}
        source={require("../../../assets/landing.png")}
        >
        <View style={logoContainer}>
          <Image
          source={require("../../../assets/logo.png")}
          style={logo}
          />
        </View>
        <View style={textContainer}>
          <Text style={title}>SPARK & SHINE</Text>
          <Text style={description}>We Clean You Relax</Text>
        </View>
          <Button title={'Sign Up as an Organization'}
          buttonText={[buttonText, btnText1]}
          buttonContainer={buttonContainer}
          press={()=>navigation.navigate("OrgRegister")}
          />
          <Button title={'Sign Up as a Customer'}
          buttonText={[buttonText, btnText2]}
          buttonContainer={buttonContainer}
          press={()=>navigation.navigate("Register")}
          />

          <Text style={haveAccountText}>Already have an account</Text>

          <Button title={'Click Here'}
          buttonText={clickHereText}
          buttonContainer={clickHereContainer}
          press={()=>navigation.navigate("Login")}
          />
        </ImageBackground>
      </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:"rgba(9, 10, 10, 1)",
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: SIZES.height*0.000,
    alignItems: 'center',
  },
  logo: {
    width: 230,
    height: 230,
  },
  textContainer: {
    paddingBottom:20,
    alignItems: 'center',
  },
  title:{
    color:'rgba(179, 205, 224, 1)',
    fontWeight:'700',
    fontSize:30,
    fontStyle:'italic'
  },
  description:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  },
  buttonContainer: {
    alignItems: 'center',
    padding:10
  },
  buttonText: {
    color: 'white',
    width: SIZES.width*0.6,
    height: SIZES.height*0.07,
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnText1:{
    backgroundColor: 'rgba(3, 57, 108, 1)',
  },
  btnText2:{
    backgroundColor:'white',
    color:'black'
  },
  btnText3:{
    backgroundColor:'rgba(3, 57, 108, 1)'
  },
  clickHereContainer: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom:13
  },
  haveAccountText: {
    color: 'white',
    paddingTop:15,
    fontSize:17
  },
  clickHereText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom:20
  },
});


export default Home;
