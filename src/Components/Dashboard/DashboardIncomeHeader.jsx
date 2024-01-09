import React from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { FontAwesome5} from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import Button from '../../Components/Button';

const DashboardIncomeHeader = () => {
  return (
<View>
    <View style={styles.incomeContainer}>
   <View style={styles.referIncomeContainer}>
    <View style={styles.refer}>
      <FontAwesome5 name="users" size={24} color="#005B96" />
      <Text style={styles.referText}>Referals</Text>
    </View>
    <Text style={styles.value}>0</Text>
  </View>
  <View style={styles.referIncomeContainer}>
    <View style={styles.incomeInfo}>
      <FontAwesome5 name="users" size={24} color="#005B96" />
      <Text style={styles.incomeText}>Income</Text>
    </View>
    <Text style={styles.value}>159.95</Text>
  </View>
  <View style={styles.withdraw}>
    <Button
      title={"Withdraw"}
      buttonContainer={styles.buttonContainer}
      buttonText={styles.buttonText}
    />
  </View>
</View>
</View>
  )
}
const styles = StyleSheet.create({
    incomeContainer:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        margin:SIZES.width*0.02
    },     

    referIncomeContainer: {
        height:SIZES.height*0.15,
        margin:SIZES.width*0.015,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#ffffff',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 2, 
        backgroundColor: '#fff', 
      },
      refer:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        margin:SIZES.width*0.02
    },
    referText:{
        margin:SIZES.width*0.02
    },
    
    incomeInfo:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        margin:SIZES.width*0.02
    },
    incomeText:{
        margin:SIZES.width*0.02
    },
    value:{
        textAlign:"center"
    },
    buttonText: {
        color: "white",
        backgroundColor: "mediumseagreen",
        width: SIZES.width * 0.23,
        padding: SIZES.height * 0.010,
        textAlign: "center",
        borderRadius: 10,
        overflow: "hidden",
      },
      btnsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      },
})

export default DashboardIncomeHeader