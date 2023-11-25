import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import OrgRegister from './src/Screens/OrgRegister';
import Home from './src/Screens/Home';
import Navigation from './src/Components/Navigation'



export default function App() {
  return (
   <Navigation/>
  );
}

const styles = StyleSheet.create({

});
