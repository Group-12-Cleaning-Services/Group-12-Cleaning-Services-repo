import React, { useState } from 'react'
import { View, StyleSheet, Text,  Pressable } from 'react-native'
import { FontAwesome,Ionicons   } from '@expo/vector-icons';
import { SIZES } from '../Constants/Theme';



const DashboardNavbar = ({servicesNav, uploadNav, bookingsNav}) => {;

return (
<View>
<View style={styles.headerItems}>
  <View style={styles.headerTextContainer}>
    <Text>Xavier&Co.</Text>
  </View>
  <View style={styles.headerIconsContainer}>
    <Ionicons style={styles.notfiIcon} name="notifications" size={24} color="black" />
    <FontAwesome style={styles.userIcon} name="user-circle" size={24} color="black" />
  </View>
</View>
 </View>
  )
}

const styles = StyleSheet.create({
    headerItems:{
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
    },
    headerIconsContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        paddingRight:SIZES.width*0.05
    },
    headerTextContainer:{
      paddingLeft:SIZES.width*0.05
    },
    notfiIcon:{
      paddingRight:SIZES.width*0.07
    },
    userIcon:{
      paddingRight:SIZES.width*0.01
    },
    navContainer:{
        borderWidth: 1.2, 
        borderColor: '#005B96', 
        borderRadius: 10, 
        padding: 10,
        margin:SIZES.width*0.04
    },
    navItems:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
    },
      activeBtn:{
        backgroundColor:"#005B96",
        padding:SIZES.width*0.015,
        borderRadius:7,
      },
      activeText:{
        color:"white"
      }
})
export default DashboardNavbar