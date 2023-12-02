import React from 'react'
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Constants/Theme';


const LandingScreen = () => {
    const{card, container, image, imageContainer} = styles
  return (
    <SafeAreaView style={container}>
        <StatusBar backgroundColor={"#B3CDE0"} barStyle={"dark-content"}/>
        <View style={card}>
           <View style={imageContainer}>
           <Image
            style={image}
            source={require("../../../assets/org1.png")}
            />
           </View>
            <Feather name='star' color={"yellow"} size={25}/>
            <Text>Pacific Cleaners</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:SIZES.width,
        height:SIZES.height,
        backgroundColor:"#B3CDE0"
    },
    card:{
        backgroundColor:COLORS.white,
        width:SIZES.width*0.5,
        height:SIZES.height*0.33,
        borderRadius:5,
        margin:10
    },
    image:{
        height:SIZES.height*0.2,
        width:SIZES.width*0.4,
        
    },
    imageContainer:{
        alignItems:'center',
        paddingTop:10
    }
})

export default LandingScreen