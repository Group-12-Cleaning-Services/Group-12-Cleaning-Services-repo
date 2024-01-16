import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { SIZES } from '../Constants/Theme';

const Notification = (value) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.headerText}>Notifications</Text>
        <Text>44</Text>
      </View>
    </SafeAreaView>
  ) 
}

export default Notification


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  itemContainer:{
    paddingTop:SIZES.height*0.08,
    alignItems:'center',
    justifyContent:'center'
  },
  headerText:{},
})
