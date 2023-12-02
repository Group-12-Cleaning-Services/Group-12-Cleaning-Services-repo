import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'


const ResetSuccess = () => {
    const {iconContainer,
         textContainer, 
         container,
         saveMessage,
         loginLink
        } = styles
  return (
    <SafeAreaView style={container}>
        <View style={iconContainer}>
            <Feather name={'check'} color={'green'} size={120}/>
        </View>
        <View style={textContainer}>
            <Text style={saveMessage}>Saved Successfully</Text>
            <Text style={loginLink}>Login Again!!</Text>
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
    saveMessage:{
        fontSize:25,
        fontWeight:'bold',
        paddingBottom:10
    },
    loginLink:{
        fontSize:15
    }
})
export default ResetSuccess