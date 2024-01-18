import React from 'react';
import Navigation from "./src/Components/Navigation"
import {Provider} from "react-redux"
import store from './src/store';
import Dashboard from './src/Screens/Organization/Dashboard';
import AddService from './src/Components/Dashboard/AddService';
import Services from './src/Components/Dashboard/Services';
import PaymentMethod from './src/Screens/Booking/PaymentMethod';
import BookingSummary from './src/Screens/Booking/BookingSummary';
import UpdateModal from "./src/Components/Dashboard/UpdateModal"
import MyBookings from './src/Screens/Profile/MyBookings';
import Booking from './src/Screens/Booking/Booking';
import OTPVerification from './src/Screens/Authentication/OTPVerification';
import BookedModal from "./src/Components/Dashboard/BookedModal"
import WithdrawModal from "./src/Components/Dashboard/WithdrawModal";
import Notification from "./src/Components/Notification"
import Login from "./src/Screens/Authentication/Login"
import { LoadingModal } from "react-native-loading-modal";
import ResetPassOTP from "./src/Screens/Authentication/ResetPassOTP";
import OTPMailReq from "./src/Screens/Authentication/OTPMailReq";
import ShadowView from 'react-native-shadow-view';
import { View, StyleSheet, Text } from 'react-native';
import DashboardIncomeHeader from './src/Components/Dashboard/DashboardIncomeHeader';




const App = () => {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  ) 
}

export default App
