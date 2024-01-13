import React from 'react'
import { View,  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '../../Constants/Theme';
import BookedServices from "./BookedServices"
import Search from '../../Components/Dashboard/Search';
import DashboardIncomeHeader from "../../Components/Dashboard/DashboardIncomeHeader"

const Bookings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
        <DashboardIncomeHeader/>
        <Search/>
        <BookedServices/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
},
 itemsContainer:{
    paddingTop:SIZES.height*0.01
},
})

export default Bookings