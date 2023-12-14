import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./src/Components/Navigation"
import LandingScreen from './src/Screens/Organization/LandingScreen';
import ProfileScreen from './src/Screens/Profile/Profile';
import BookingsScreen from './src/Screens/Profile/MyBookings';
import SingleOrgScreen from "./src/Screens/Organization/SingleOrgScreen";
import Booking from './src/Screens/Booking/Booking';
import PaymentMethod from "./src/Screens/Booking/PaymentMethod";
import ModalScreen from './src/Screens/Booking/Modal';
import BookingSummary from './src/Screens/Booking/BookingSummary';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
    <Navigation />
    </Provider>
  )
}

export default App