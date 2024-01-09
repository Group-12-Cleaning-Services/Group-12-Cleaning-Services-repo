import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Feather  } from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';

const Search = () => {
  return (
    <View>
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
             <TextInput placeholder='Search here' style={styles.input}/>
              <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer:{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      inputContainer:{
        borderRadius: 6,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 1, 
        borderColor: 'rgba(144, 137, 137, 1)',
        padding:SIZES.width*0.0095,
        width:SIZES.width*0.7,
        margin:SIZES.width*0.03,
        flexDirection:"row",
        justifyContent:"space-between"
      },
      input:{
        padding:SIZES.width*0.003,
        width:SIZES.width*0.6,
      },
      searchIcon:{
        paddingTop:SIZES.height*0.0078
      },
})

export default Search