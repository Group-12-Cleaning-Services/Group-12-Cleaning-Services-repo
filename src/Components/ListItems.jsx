import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../Constants/Theme';

const ListItem = ({ item, nav }) => {

  const ratings = [1, 2, 3, 4, 5];

  const handleCardPress = () => {
    navigation.navigate('Login');
  };

  return (
    <Pressable style={styles.card}
    onPress={nav}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item?.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.cardText}>{item?.organization_name}</Text>
      <View style={styles.ratings}>
        {ratings.map((value, index) => (
          <FontAwesome
            name="star"
            size={20}
            color="#FFBA49"
            key={index}
            style={styles.rating}
          />
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        width: SIZES.width * 0.41, 
        height: SIZES.height * 0.3,
        borderRadius: 5,
        marginBottom: SIZES.width * 0.02,
        display: 'flex',
        margin:10
      },
      imageContainer: {
        alignItems: 'center',
        paddingTop: SIZES.height * 0.03,
      },
      image: {
        height: SIZES.height * 0.15,
        width: SIZES.width * 0.3,
      },
      iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
      },
      cardText: {
        textAlign: 'center',
        paddingTop: 5,
      },
      rating:{
        margin:SIZES.width*0.001
      },
      ratings:{
        alignItems:'center',
        paddingTop:SIZES.height*0.007,
        flexDirection:'row',
        justifyContent:'center',
        margin:SIZES.width*0.015
      },
})

export default ListItem;
