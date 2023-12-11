import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { singleOrganizationData } from '../../../Data';
import OrgSingleListItem from '../../Components/OrgSingleListItem';



const SingleOrgScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={singleOrganizationData}
        renderItem={({ item }) => <OrgSingleListItem item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default SingleOrgScreen;
