import React from 'react'
import { ImageBackground, View, SafeAreaView, StyleSheet, Image, Text } from 'react-native'
import Button from '../../Components/Button'
import { COLORS, SIZES } from '../../Constants/Theme'
import { Feather } from '@expo/vector-icons'



const WelcomeScreen = ({navigation}) => {
    const arrowIcon = <Feather name='arrow-right' color={COLORS.black} size={25}/>
    const{
        background, 
        image, 
        imageContainer,
        infoContainer,
        title,
        desc,
        buttonContainer,
        buttonText,
        container
    } = styles
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
        <Button
        title={"Lets Get Started"}
        icon={arrowIcon}
        buttonContainer={buttonContainer}
        buttonText={buttonText}
        press={()=>navigation.navigate("onboard")}
        />
    </ImageBackground>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    background:{
        flex:1,
        width:SIZES.width,
        height:SIZES.height,
        justifyContent:"space-around",
        flexDirection:"column"
    },
    imageContainer:{
        alignItems:'center',
    },
    image:{
        width:SIZES.width*0.35,
        height:SIZES.width*0.35
    },
    infoContainer:{
        alignItems:'center',
    },
    title:{
        color:"white"
    },
    desc:{
        color:"white"
    },
    buttonContainer:{
        alignItems:'center',
    },
    buttonText:{
        backgroundColor:COLORS.white,
        width:SIZES.width*0.5,
        height:SIZES.width*0.15,
        textAlign:'center',
        paddingTop:SIZES.height*0.01,
        borderRadius:15,
        overflow:"hidden",
        fontWeight:"bold"
    }
})
export default WelcomeScreen