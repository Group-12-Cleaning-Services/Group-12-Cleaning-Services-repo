import React from 'react';
import { ImageBackground, View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../Constants/Theme';
import { Feather } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  const arrowIcon = <Feather name='arrow-right' color={COLORS.black} size={20}/>;
  const {
    background,
    image,
    imageContainer,
    infoContainer,
    title,
    desc,
    buttonContainer,
    buttonText,
    container,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ImageBackground
        style={background}
        source={require("../../../assets/landing.png")}
      >
        <View style={imageContainer}>
          <Image
            style={image}
            source={require("../../../assets/icon.png")}
          />
        </View>
        <View style={infoContainer}>
          <Text style={title}>WELCOME</Text>
          <Text style={desc}>We are glad to have you</Text>
        </View>
        <TouchableOpacity style={buttonContainer} onPress={()=>navigation.navigate("onboard")}>
           <Text style={buttonText}>Lets Get Started {arrowIcon}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: "space-around",
    flexDirection: "column",
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: SIZES.width * 0.35,
    height: SIZES.width * 0.35,
  },
  infoContainer: {
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 35, 
    fontWeight: "bold",
  },
  desc: {
    color: "white",
    fontSize: SIZES.h2, 
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor:COLORS.white,
    width: SIZES.width * 0.53,
    padding:SIZES.height*0.021,
    textAlign: 'center',
    paddingTop: SIZES.height * 0.02,
    borderRadius: 15,
    overflow: "hidden",
    fontWeight: "bold",
    fontSize: SIZES.h4,
  },
});

export default WelcomeScreen;
