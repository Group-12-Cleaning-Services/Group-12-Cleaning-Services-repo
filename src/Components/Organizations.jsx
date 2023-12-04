import React from 'react'
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView} from 'react-native'
import { COLORS, SIZES } from '../Constants/Theme';
import { FontAwesome } from '@expo/vector-icons';
import {OrganizationsData} from "../../Data"

const Organizations = ({navigation}) => {

    const{card, container, image, imageContainer, iconContainer, text, scrollContainer, icon} = styles
  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={"#B3CDE0"} barStyle={"dark-content"}/>
      <View style={icon}>
      <FontAwesome name="user-circle-o" size={24} color="black" onPress={()=>navigation.navigate("Profile")} />
      </View>
      <Text>ORGANIZATIONS</Text>
      <View></View>
       <ScrollView> 
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={scrollContainer}>
        {OrganizationsData.map((org)=>(
            <View style={card} key={org.id}>
            <View style={imageContainer}>
            <Image
             style={image}
             source={org.image}
             />
            </View>
            <View style={iconContainer}>
            <FontAwesome name="star" size={24} color="#FFBA49" />
            <FontAwesome name="star" size={24} color="#FFBA49" />
            <FontAwesome name="star" size={24} color="#FFBA49" />
            <FontAwesome name="star" size={24} color="#FFBA49" />
            <FontAwesome name="star" size={24} color="#FFBA49" />
            </View>
             <Text style={text}>{org.desc}</Text>
         </View> 
        ))}
        </ScrollView>
      </ScrollView>   
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
        margin:SIZES.width*0.05,
        display:"flex"
    },
    image:{
        height:SIZES.height*0.2,
        width:SIZES.width*0.4,
        
    },
    imageContainer:{
        alignItems:'center',
        paddingTop:SIZES.height*0.05
    },
    iconContainer:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:'center',
        paddingTop:5
    },
    text:{
        textAlign:"center",
        paddingTop:5
    }
})

export default Organizations