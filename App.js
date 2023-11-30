import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./src/Components/Navigation"
import { useState } from 'react';
import ProfileScreen from './src/Screens/Profile/Profile';
import BookingsScreen from './src/Screens/Profile/SeeBookings';
import EditProfile from './src/Screens/Profile/EditProfile';
import SaveSuccess from './src/Screens/Profile/SaveSuccess';
import ErrorPage from './src/Screens/Profile/ErrorPage';
import WelcomeSreen from './src/Screens/Home/WelcomeSreen';
import Laundry from './src/Screens/Home/Laundry';
import OTPVerification from './src/Screens/Authentication/OTPVerification';


export default function App() {
  return (
    <Navigation/>
  );
}

