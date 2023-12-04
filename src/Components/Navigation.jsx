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
import EditProfile from "../Screens/Profile/EditProfile"

const Tabs = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{statusBarColor:"#42322E"}}/>
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
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Tabs