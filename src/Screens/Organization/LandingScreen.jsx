import React, { useEffect, useState } from 'react';
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar, SectionList, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Constants/Theme';
import { organizations } from '../../../Data';
import ListItem from '../../Components/ListItems';


const LandingScreen = ({ navigation }) => {

  const[organizationss, setOrganizations] = useState([]);
  const[horizontal, setHorizontal] = useState(4) 

  useEffect(() => {
    const getServices = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            `https://cleaningservice.onrender.com/api/service/providers/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            const responseData = response.data;
            if (responseData && Array.isArray(responseData.data)) {
              const sections = [
                {
                  data: responseData.data,
                },
              ];
  
              setOrganizations(sections);
            } else {
              console.error('Invalid response format:', responseData);
            }
          } else {
            Alert.alert('Error⚠️', 'Something went wrong!');
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };
  
    getServices();
  }, []);
  
  

  const {  
    container, 
    header, 
    headerText, 
    slideContainer, 
    slideImage, 
    headerIcon 
  } = styles;

  const handleNavigate = (itemId) => {
    navigation.navigate('SingleOrg', { itemId });
  };

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <View style={headerIcon}>
        <FontAwesome name="user-circle-o" size={24} color="black" onPress={() => navigation.navigate('Profile')} />
      </View>
        <View style={header}>
          <Text style={headerText} onPress={()=>navigation.navigate('Login')}>ORGANIZATIONS</Text>
        </View>
        <View style={styles.container}>
        <View style={slideContainer}>
          <Image style={slideImage} source={require('../../../assets/elements.png')} />
        </View>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={organizationss}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>Available Organization</Text>
              {horizontal ? (
                <FlatList
                 key={section.data.user_id}
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} key={item.user_id} nav={() => handleNavigate(item.user_id)}/>}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (horizontal) {
              return null;
            }
            if(horizontal === 4){
              return <ListItem item={item} nav={()=> navigation.navigate('SingleOrg')} />
            };
          }}
        />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#B3CDE0',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: SIZES.width * 0.02,
  },
  header: {
    paddingLeft: SIZES.width * 0.053,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerIcon: {
    alignItems: 'flex-end',
    paddingRight: SIZES.width * 0.078,
    paddingTop: SIZES.width * 0.070,
    paddingBottom: SIZES.height * 0.04,
  },
  slideContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  slideImage: {
    width: SIZES.width * 1,
    borderRadius: 25,
    resizeMode:"contain"
  },
  sectionHeader:{
    paddingLeft:SIZES.width*0.05,
    fontSize:18
  }
});

export default LandingScreen;
