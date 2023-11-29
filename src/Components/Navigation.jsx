import React from 'react';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';
import OrgRegister from '../Screens/Authentication/OrgRegister';
import ResetPassword from "../Screens/Authentication/ResetPassword"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsScreen from '../Screens/Profile/SeeBookings';
import OTPVerification from "../Screens/Authentication/OTPVerification"


const Tabs = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Register' component={Register}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='OrgRegister' component={OrgRegister}/>
            <Stack.Screen name='ResetPassword' component={ResetPassword}/>
            <Stack.Screen name='Bookings' component={BookingsScreen}/>
            <Stack.Screen name='OTP' component={OTPVerification}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Tabs