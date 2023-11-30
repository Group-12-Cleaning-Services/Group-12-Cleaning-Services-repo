import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'

const Laundry = () => {
    const {
        container,
        imageContainer, 
        textContainer, 
        image, 
        pagination,
        textHeader,
        textDescription
    } = styles

  return (
    <SafeAreaView style={container}>
        <View style={imageContainer}>
            <Image 
            style={image}
            source={require("../../../assets/laundry.png")}/>
         <View style={textContainer}>
            <Text style={textHeader}>Laundry Services</Text>
            <Text style={textDescription}>Get dependable and affordable services from organizations on this app</Text>
         </View>
        </View>
        <View style={pagination}>
            <TouchableOpacity style={{backgroundColor:"blue"}}>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#171717",
    },
    imageContainer:{
    },
    image:{
        height:"65%",
        width:"100%"
    },
    textContainer:{
        paddingTop:20,
        textAlign:"justify",
        paddingLeft:30
    },
    textHeader:{
        color:"white",
        paddingBottom:10,
        fontSize:30,
        fontWeight:"bold"
    },
    textDescription:{
        color:"white",
        width:200,
        fontSize:16
    }
})

export default Laundry