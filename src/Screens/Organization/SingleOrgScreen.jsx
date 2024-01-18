import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { singleOrganizationData } from '../../../Data';
import OrgSingleListItem from '../../Components/OrgSingleListItem';
import { SIZES } from '../../Constants/Theme';
import { useRoute } from '@react-navigation/native';



const SingleOrgScreen = ({navigation}) => {

  const[services, setServices] = useState()

  const route = useRoute();
  const { itemId } = route.params;
  console.log(itemId)

  const handleNavigate = (service_id) => {
    navigation.navigate('Booking', { service_id });
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            `https://cleaningservice.onrender.com/api/service/provider-services/${itemId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }
          );
          if(response.status === 200){
            setServices(response.data.services)
          }
          else{
            Alert.alert("Error⚠️", 'Something went wrong!')
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };
    getServices();
  }, []); 
console.log(services)

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={styles.header}>
            <Text style={styles.headerText}>Pacific Cleaners</Text>
        </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={services}
        renderItem={({ item }) => <OrgSingleListItem item={item} nav={()=> handleNavigate(item.service_id)}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#fff"
  },
  header:{
    paddingLeft:SIZES.width*0.07,
    paddingTop:SIZES.height*0.03,
    paddingBottom:SIZES.height*0.02
  },
  headerText:{
    fontSize:SIZES.width*0.06
  }
});

export default SingleOrgScreen;
