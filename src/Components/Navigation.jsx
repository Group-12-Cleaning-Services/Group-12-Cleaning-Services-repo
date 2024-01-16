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
import Notification from "../Components/Notification"

const Tabs = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{statusBarColor:"#756F69"}}/>
            <Stack.Screen name='onboard' component={OnBoarding} options={{statusBarColor:"#171717", statusBarStyle:"#FFFFF"}}/>
            <Stack.Screen name='Home' component={Home} options={{statusBarColor:"#42322E"}}/>
            <Stack.Screen name='Register' component={Register} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='Login' component={Login} options={{statusBarColor:"#040268" }}/>
            <Stack.Screen name='OrgRegister' component={OrgRegister} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='Bookings' component={BookingsScreen} options={{ statusBarColor: '#FF5733' }}/>
            <Stack.Screen name='OTP' component={OTPVerification} options={{ statusBarColor: 'black', statusBarStyle:"white" }}/>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='MyBookings' component={MyBookings} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='Organizations' component={LandingScreen} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='CreateProfile' component={CreateProfile} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='OTPMail' component={OTPMailReq} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='ResetPasswordOTP' component={ResetPasswordOTP} options={{ statusBarColor: '#171717', }}/>
            <Stack.Screen name='SingleOrg' component={SingleOrgScreen} options={{ statusBarStyle:"dark" }}/>
            <Stack.Screen name='OrgSigleListItem' component={OrgSingleListItem} options={{ statusBarColor: '#fff', statusBarStyle:"dark" }}/>
            <Stack.Screen name='Booking' component={Booking} options={{  statusBarColor: '#B3CDE0', statusBarStyle:"dark"  }}/>
            <Stack.Screen name='PaymentMethods' component={paymentMethod} options={{ statusBarColor: '#B3CDE0', statusBarStyle:"dark" }}/>
            <Stack.Screen name='BookingSummary' component={BookingSummary} options={{ statusBarColor:"#040268"  }}/>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ statusBarStyle:"dark"  }}/>
            <Stack.Screen name='ModalProfile' component={ProfileModal} />
            <Stack.Screen name='Notification' component={Notification} options={{ statusBarStyle:"dark"  }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Tabs