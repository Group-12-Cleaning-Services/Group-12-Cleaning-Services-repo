import React from 'react';
import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';
import OrgRegister from '../Screens/Authentication/OrgRegister';
import ResetPassword from "../Screens/Authentication/ResetPassword"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsScreen from '../Screens/Profile/MyBookings';
import OTPVerification from "../Screens/Authentication/OTPVerification"
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from '../Screens/Home/WelcomeScreen';
import OnBoarding from '../Screens/Home/OnBoarding';
import Home from '../Screens/Home/Home';
import MyBookings from "../Screens/Profile/MyBookings";
import ProfileScreen from '../Screens/Profile/Profile';
import LandingScreen from "../Screens/Organization/LandingScreen"
import EditProfile from "../Screens/Profile/EditProfile";
import CreateProfile from '../Screens/Profile/CreateProfile';
import OTPMailReq from "../Screens/Authentication/OTPMailReq";
import ResetPasswordOTP from "../Screens/Authentication/ResetPassOTP";
import SingleOrgScreen from '../Screens/Organization/SingleOrgScreen';
import OrgSingleListItem from './OrgSingleListItem';
import Booking from "../Screens/Booking/Booking";
import paymentMethod  from '../Screens/Booking/PaymentMethod';
import BookingSummary from "../Screens/Booking/BookingSummary";
import Dashboard from '../Screens/Organization/Dashboard';
import ProfileModal from './Dashboard/ProfileModal';
import Notification from "./Notification"


const Tabs = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='onboard' component={OnBoarding}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='OrgRegister' component={OrgRegister} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='Bookings' component={BookingsScreen} />
            <Stack.Screen name='OTP' component={OTPVerification}/>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='MyBookings' component={MyBookings} />
            <Stack.Screen name='Organizations' component={LandingScreen} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='CreateProfile' component={CreateProfile} />
            <Stack.Screen name='OTPMail' component={OTPMailReq} />
            <Stack.Screen name='ResetPasswordOTP' component={ResetPasswordOTP}/>
            <Stack.Screen name='SingleOrg' component={SingleOrgScreen}/>
            <Stack.Screen name='OrgSigleListItem' component={OrgSingleListItem}/>
            <Stack.Screen name='Booking' component={Booking}/>
            <Stack.Screen name='PaymentMethods' component={paymentMethod} />
            <Stack.Screen name='BookingSummary' component={BookingSummary}/>
            <Stack.Screen name='Dashboard' component={Dashboard}/>
            <Stack.Screen name='ModalProfile' component={ProfileModal} />
            <Stack.Screen name='Notifications' component={Notification} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Tabs