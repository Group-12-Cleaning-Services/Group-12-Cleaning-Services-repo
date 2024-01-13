import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react';
import { useState,useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from "../../Constants/Theme";
import { Feather, MaterialIcons, EvilIcons, Fontisto } from "@expo/vector-icons";
import RadioGroup from 'react-native-radio-buttons-group';
import { paymentMethods } from '../../../Data';
import CheckBox from 'react-native-check-box';
import Button from '../../Components/Button';


const PaymentMethod = ({navigation}) =>{
    const [isChecked, setIsChecked] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const handleCheck = () =>{
        setIsChecked(!isChecked)
      }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            value: 'option1'
        },
    ]), []);


    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
           <View style={styles.gobackIcon}>
            <Feather
             name="log-out"
             size={24}
             color="black"
             style={styles.mirroredIcon}
             onPress={() => navigation.goBack()}
            />
           </View>
           <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Payment Method</Text>
           </View>
           {paymentMethods.map((pay)=>(
            <View style={styles.paymentContainer} key={pay.id}>
            <View style={styles.payment}>
                <Image
                source={pay.image}
                style={styles.paymentImage}
                />
                <Text style={styles.paymentText}>{pay.name}</Text>
            </View>
            <View>
            <RadioGroup 
             radioButtons={radioButtons} 
             onPress={setSelectedId}
             selectedId={selectedId}
             />
            </View>
           </View>
           ))}
        <View style={styles.checkboxContainer}>
        <CheckBox
         onClick={handleCheck}
         isChecked={isChecked}
         rightText="I agree to all terms and conditions"
        />
        </View>
        <View style={styles.btnsContainer}>
          <Button
            title={"Proceed"}
            buttonContainer={styles.saveCancelBtn}
            buttonText={styles.proceedlText}
            press={()=>navigation.navigate("BookingSummary")}
          />
        </View>
         </ScrollView>
        </SafeAreaView>
       )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B3CDE0",
        width: "100%",
      },
      image: {
        width: SIZES.width * 0.7,
        height: SIZES.height * 0.3,
      },
      titleContainer: {
        alignItems: "center",
      },
      titleText: {
        fontWeight: "bold",
        color: "black",
        fontSize: 25,
      },
      gobackIcon: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      mirroredIcon: {
        transform: [{ scaleX: -1 }],
      },
      paymentContainer:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        borderWidth: 1.2, 
        borderColor: 'rgba(156, 173, 242, 1)', 
        borderRadius: 10, 
        padding: 10,
        margin:SIZES.width*0.04
      },
      payment:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
      },
      paymentImage:{

      },
      paymentText:{
        paddingLeft:SIZES.width*0.03
      },
      checkboxContainer:{
        paddingLeft:SIZES.width*0.1,
        paddingTop:SIZES.height*0.01
      },
      saveCancelBtn: {
        alignItems: "center",
        margin: 12,
      },
      proceedlText: {
        color: "white",
        backgroundColor: "#03396C",
        width: SIZES.width * 0.35,
        padding: SIZES.width * 0.03,
        textAlign: "center",
        borderRadius: 15,
        paddingTop: SIZES.height*0.018,
        overflow: "hidden",
      },
      scrollContainer: {
        flex: 1,
        backgroundColor: "#B3CDE0",
        flexGrow: 1,
      },
})

export default PaymentMethod