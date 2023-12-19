import React from 'react';
import Navigation from "./src/Components/Navigation"
import {Provider} from "react-redux"
import store from './src/store';
import TabView from "./src/Components/TabView"

const App = () => {
  return (
    <Provider store={store}>
    <Navigation/>
    </Provider>
  )
}

export default App