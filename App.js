import React from 'react';
import Navigation from "./src/Components/Navigation"
import {Provider} from "react-redux"
import store from './src/store';
import Dashboard from './src/Screens/Organization/Dashboard';
import AddService from './src/Components/Dashboard/AddService';
import Services from './src/Components/Dashboard/Services';
import PaymentMethod from './src/Screens/Booking/PaymentMethod';


const App = () => {
  return (
    <Provider store={store}>
    <PaymentMethod/>
    </Provider>
  )
}

export default App