import * as React from 'react';
import { useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Services from '../../Components/Dashboard/Services';
import AddService from '../../Components/Dashboard/AddService';
import Bookings from '../../Components/Dashboard/Bookings';
import  DashboardNavIcons from "../../Components/Dashboard/DashboardNavIcons"
import { SIZES } from '../../Constants/Theme';
import ProfileModal from '../../Components/Dashboard/ProfileModal';



const renderScene = SceneMap({
  services: Services,
  upload: AddService,
  bookings: Bookings,
});

export default function Dashboard({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'services', title: 'Services' },
    { key: 'upload', title: 'Upload' },
    { key: 'bookings', title: 'Bookings' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ 
      backgroundColor: '#005B96',
      width: "10%",
    }}
      style={{ 
      backgroundColor: '#fff',
      borderWidth: 1.2, 
      borderColor: '#005B96', 
      borderRadius: 10, 
      padding: SIZES.height*0.01,
      margin:SIZES.width*0.04,
    }}
      labelStyle={{ color: '#000' }}
    />
  );

  return (
    <View style={styles.container}>
     <DashboardNavIcons/>
     <ProfileModal
     viewNav={()=> navigation.navigate('Profile')}
     logoutNav={()=> navigation.navigate('Home')}
     />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
})