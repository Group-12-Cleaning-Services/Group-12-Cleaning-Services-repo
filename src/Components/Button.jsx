import React from 'react'
import { TouchableOpacity, Text, StyleSheet} from 'react-native'

const Button = ({title, buttonContainer, buttonText, press}) => {
  return (
    <TouchableOpacity 
    style={buttonContainer}
    onPress={press}
    >
       <Text style={buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
})

export default Button