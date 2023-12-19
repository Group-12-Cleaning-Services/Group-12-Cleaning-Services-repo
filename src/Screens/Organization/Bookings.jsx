import React from 'react'
import { View,  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '../../Constants/Theme';
import ServicesTable from "../../Components/ServicesTable"
import DashboardNavbar from '../../Components/DashboardNavIcons';
import Search from '../../Components/Search';
import DashboardIncomeHeader from "../../Components/DashboardIncomeHeader"

const Bookings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
        <DashboardIncomeHeader/>
        <Search/>
        <ServicesTable/>
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