import React from 'react';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import OrgRegister from '../Screens/OrgRegister';
import ResetPassword from "../Screens/ResetPassword"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



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
            <Stack.Screen name='Reset' component={ResetPassword}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Tabs