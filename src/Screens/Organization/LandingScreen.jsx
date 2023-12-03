import React from 'react'
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Constants/Theme';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Organizations } from '../../../Data';

const LandingScreen = () => {

    const{card, container, image, imageContainer, iconContainer, text, scrollContainer} = styles
  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={"#B3CDE0"} barStyle={"dark-content"}/>
      <View style={icon}>
      <FontAwesome name="user-circle-o" size={24} color="black" />
      </View>
      <Text>ORGANIZATIONS</Text>
      <View></View>
       <ScrollView> 
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={scrollContainer}>
        {Organizations.map((org)=>(
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
        margin:10,
        display:"flex"
    },
    image:{
        height:SIZES.height*0.2,
        width:SIZES.width*0.4,
        
    },
    imageContainer:{
        alignItems:'center',
        paddingTop:10
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

export default LandingScreen