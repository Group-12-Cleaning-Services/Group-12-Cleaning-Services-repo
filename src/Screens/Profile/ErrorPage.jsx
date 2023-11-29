import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'


const ErrorPage = () => {
    const {iconContainer,
         textContainer, 
         container,
         errorMessage,
        } = styles
  return (
    <SafeAreaView style={container}>
        <View style={iconContainer}>
            <Feather name={'alert-triangle'} color={'red'} size={120}/>
        </View>
        <View style={textContainer}>
            <Text style={errorMessage}>
            Oops!! Something went wrong, try again later
            </Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#B3CDE0",
        alignItems:'center',
        justifyContent:'center'
    },
    iconContainer:{
        alignItems:'center',
        paddingBottom:20
    },
    textContainer:{
        alignItems:'center'
    },
    errorMessage:{
        fontSize:24,
        fontWeight:'bold',
        paddingBottom:10,
    },
})
export default ErrorPage