import React from 'react';
import { Image, View, SafeAreaView, Text, StyleSheet, StatusBar, SectionList, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Constants/Theme';
import { organizations } from '../../../Data';
import ListItem from '../../Components/ListItems';


const LandingScreen = ({ navigation }) => {
  const {  
    container, 
    header, 
    headerText, 
    slideContainer, 
    slideImage, 
    headerIcon 
  } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor={'#B3CDE0'} barStyle={'dark-content'} />
      <View style={headerIcon}>
        <FontAwesome name="user-circle-o" size={24} color="black" onPress={() => navigation.navigate('Profile')} />
      </View>
        <View style={header}>
          <Text style={headerText}>ORGANIZATIONS</Text>
        </View>
        <View style={styles.container}>
        <View style={slideContainer}>
          <Image style={slideImage} source={require('../../../assets/elements.png')} />
        </View>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={organizations}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
    </View>
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
  header: {
    paddingLeft: SIZES.width * 0.053,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerIcon: {
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
  rate:{
    margin:SIZES.width*0.005
  },
  sectionHeader:{
    paddingLeft:SIZES.width*0.05,
    fontSize:18
  }
});

export default LandingScreen;
