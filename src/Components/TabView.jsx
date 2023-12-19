import * as React from 'react';
import { useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Dashboard from '../Screens/Organization/Dashboard';
import AddService from '../Screens/Organization/AddService';
import Bookings from '../Screens/Organization/Bookings';
import DashboardNavbar from './DashboardNavIcons';
import { SIZES } from '../Constants/Theme';



const renderScene = SceneMap({
  services: Dashboard,
  upload: AddService,
  bookings: Bookings,
});

export default function TabViewComponent({navigation}) {
  const layout = useWindowDimensions();
  const [isActiveButton, setIsActiveButton] = useState("view")

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
     <DashboardNavbar/>
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