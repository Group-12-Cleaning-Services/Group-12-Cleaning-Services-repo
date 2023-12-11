import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./src/Components/Navigation"
import LandingScreen from './src/Screens/Organization/LandingScreen';
import ProfileScreen from './src/Screens/Profile/Profile';
import BookingsScreen from './src/Screens/Profile/MyBookings';
import SingleOrgScreen from "./src/Screens/Organization/SingleOrgScreen"

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <SingleOrgScreen/>
  )
}

export default App