import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../Components/Button';
import WithdrawModal from './WithdrawModal';
import { useSelector } from 'react-redux';
import { modalActions } from '../../store/modal';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';



const DashboardIncomeHeader = () => {
  const [income, setIncome] = useState('');

  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.incomeModal);

  const handleWithdrawalState = () => {
    dispatch(modalActions.handleIncomeModal());
  };

  useEffect(() => {
    const getBalance = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningservice.onrender.com/api/transaction/all/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200 && response.data.length > 0) {
            const balance = response.data[0].balance;
            setIncome(balance);
          } else {
            setIncome('0.00');
            Alert.alert('Error⚠️', 'Something went wrong!');
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };

    getBalance();
  }, [income]);

  return (
    <View>
      <View style={styles.incomeContainer}>
        <View style={Platform.OS==="android"?styles.referIncomeContainer: styles.referIncomeContainerIos}>
          <View style={styles.refer}>
            <FontAwesome5 name="users" size={24} color="#005B96" />
            <Text style={styles.referText}>Referals</Text>
          </View>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={Platform.OS==="android"?styles.referIncomeContainer: styles.referIncomeContainerIos}>
          <View style={styles.incomeInfo}>
            <FontAwesome5 name="users" size={24} color="#005B96" />
            <Text style={styles.incomeText}>Income</Text>
          </View>
          <Text style={styles.value}>{income}</Text>
        </View>
        <View style={styles.withdraw}>
          <Button
            title={'Withdraw'}
            buttonContainer={styles.buttonContainer}
            buttonText={styles.buttonText}
            press={handleWithdrawalState}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  incomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.width * 0.02,
  },
  referIncomeContainer: {
    height: SIZES.height * 0.15,
    margin: SIZES.width * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
  },
  referIncomeContainerIos:{
    height: SIZES.height * 0.15,
    margin: SIZES.width * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity:0.25,
    shadowRadius:3.84
  },
  refer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.width * 0.02,
  },
  referText: {
    margin: SIZES.width * 0.02,
  },
  incomeInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.width * 0.02,
  },
  incomeText: {
    margin: SIZES.width * 0.02,
  },
  value: {
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'mediumseagreen',
    width: SIZES.width * 0.23,
    padding: SIZES.height * 0.01,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  
});

export default DashboardIncomeHeader;
