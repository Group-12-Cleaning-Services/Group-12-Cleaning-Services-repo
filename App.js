import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./src/Components/Navigation"

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
 <Navigation/>
  )
}

export default App