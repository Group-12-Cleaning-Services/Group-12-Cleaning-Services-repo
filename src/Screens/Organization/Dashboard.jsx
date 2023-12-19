import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome,FontAwesome5,Feather  } from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import Button from '../../Components/Button';
import ServicesTable from "../../Components/ServicesTable"
import DashboardNavbar from '../../Components/DashboardNavIcons';
import Search from '../../Components/Search';
import DashboardIncomeHeader from "../../Components/DashboardIncomeHeader"

const Dashboard = () => {
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
        flex:1,
    },
    itemsContainer:{
        paddingTop:SIZES.height*0.01,
    },
})
export default Dashboard