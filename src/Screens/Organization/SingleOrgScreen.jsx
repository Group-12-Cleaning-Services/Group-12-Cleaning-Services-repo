import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { singleOrganizationData } from '../../../Data';
import OrgSingleListItem from '../../Components/OrgSingleListItem';
import { SIZES } from '../../Constants/Theme';



const SingleOrgScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Pacific Cleaners</Text>
        </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={singleOrganizationData}
        renderItem={({ item }) => <OrgSingleListItem item={item} nav={()=> navigation.navigate('Booking')}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header:{
    paddingLeft:SIZES.width*0.07,
    paddingTop:SIZES.height*0.03,
    paddingBottom:SIZES.height*0.02
  },
  headerText:{
    fontSize:SIZES.width*0.06
  }
});

export default SingleOrgScreen;
