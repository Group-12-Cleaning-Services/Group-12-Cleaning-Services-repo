import React from 'react';
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Constants/Theme';
import { OrganizationsData } from '../../../Data';

const LandingScreen = ({ navigation }) => {
  const { card, container, header, headerText, slideContainer, slideImage, image, imageContainer, iconContainer, text, icon } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <View style={icon}>
        <FontAwesome name="user-circle-o" size={24} color="black" onPress={() => navigation.navigate('Profile')} />
      </View>
        <View style={header}>
          <Text style={headerText}>ORGANIZATIONS</Text>
        </View>
        <View style={slideContainer}>
          <Image style={slideImage} source={require('../../../assets/elements.png')} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        {OrganizationsData.map((org) => (
          <View style={card} key={org.id}>
            <View style={imageContainer}>
              <Image style={image} source={org.image} />
            </View>
            <View style={iconContainer}>
              <FontAwesome name="star" size={24} color="#FFBA49" />
              <FontAwesome name="star" size={24} color="#FFBA49" />
              <FontAwesome name="star" size={24} color="#FFBA49" />
              <FontAwesome name="star" size={24} color="#FFBA49" />
              <FontAwesome name="star" size={24} color="#FFBA49" />
            </View>
            <Text style={text}>{org.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#B3CDE0',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: SIZES.width * 0.02,
  },
  card: {
    backgroundColor: COLORS.white,
    width: SIZES.width * 0.45, // Adjusted to leave space between cards
    height: SIZES.height * 0.3,
    borderRadius: 5,
    marginBottom: SIZES.width * 0.02, // Adjusted for spacing between rows
    display: 'flex',
  },
  image: {
    height: SIZES.height * 0.15,
    width: SIZES.width * 0.3,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: SIZES.height * 0.03,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  text: {
    textAlign: 'center',
    paddingTop: 5,
  },
  icon: {
    alignItems: 'flex-end',
    paddingRight: SIZES.width * 0.078,
    paddingTop: SIZES.width * 0.070,
    paddingBottom: SIZES.height * 0.04,
  },
  slideContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  slideImage: {
    width: SIZES.width * 1,
    borderRadius: 25,
    resizeMode:"contain"
  },  
  header: {
    paddingLeft: SIZES.width * 0.053,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LandingScreen;
