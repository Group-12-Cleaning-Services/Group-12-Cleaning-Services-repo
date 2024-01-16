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
import WithdrawModal from "./src/Components/Dashboard/WithdrawModal"

const App = () => {
  return (
    <Provider store={store}>
    <Navigation/>
    </Provider>
  ) 
}

export default App
