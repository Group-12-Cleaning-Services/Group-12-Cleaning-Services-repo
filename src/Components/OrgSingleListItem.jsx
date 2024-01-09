import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SIZES } from '../Constants/Theme';


const OrgSingleListItem = ({ item, nav }) => {
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.itemInfo}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={item.image} />
          </View>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        </View>
        <View style={styles.arrowIcon}>
        <Pressable
        onPress={nav}
        >
        <Feather name="arrow-right-circle" size={24} color="black" />
        </Pressable>
        </View>
      </View>
      )
    };

    const styles = StyleSheet.create({
        itemsContainer: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: SIZES.width*0.03,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor:"#fff"
          },
          itemInfo:{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          imageContainer: {
            width: SIZES.width*0.17,
            height: SIZES.height*0.095,
            marginRight: 10,
          },
          image: {
            width: '100%',
            height: '100%',
            borderRadius: 25,
          },
          title: {
            fontSize: 16,
            fontWeight:"bold"
          },
          arrowIcon: {
            marginLeft: 'auto',
          },
          amount:{
            color:'#31BB00'
          }
    })

    export default OrgSingleListItem;