import React, { useState, useEffect } from "react";
import { View, ScrollView, Pressable, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from "react-native-table-component";
import { services } from "../../../Data";
import { SIZES } from "../../Constants/Theme";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { modalActions } from "../../store/modal";
import { useSelector } from 'react-redux';


const Services = () => {
  
  const [service, setServices] = useState('');
  const [tableHeader, setTableHeader] = useState({
    tableHead: ["Service type", "Date", "Amount", "Update", "Delete"],
    widthArr: [100, 100, 100, 100, 100],
  });

  const modalVisible = useSelector((state)=>state.modal.modal);
  const dispatch = useDispatch()

  useEffect(() => {
    const getServices = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningserve.pythonanywhere.com/api/service/all/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }
          );
          if(response.status === 200){
            setServices(response.data.services)
          }
          else{
            Alert.alert("Error⚠️", 'Something went wrong!')
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };
    getServices();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken) {
        const response = await axios.delete(
          `https://cleaningserve.pythonanywhere.com/api/service/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        if(response.status === 200){
          Alert.alert("Success✔️", "Successfully Deleted")
        }
        else{
          Alert.alert("Error⚠️", 'Not authorized!')
        }
      }
    } catch (error) {
      console.error('Something went wrong!', error);
    }
  };

  const handleShowUpdate = async () => {
    dispatch(modalActions.handleUpdateModal())
  };


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={tableHeader.tableHead}
              widthArr={tableHeader.widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView 
           style={styles.dataWrapper}
          >
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              {services.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    item.service,
                    item.date,
                    item.amount,
                    <Pressable 
                     style={styles.updateDeleteContainer}
                     onPress={handleShowUpdate}
                     >
                      <Text style={styles.updateText}>{item.update}</Text>
                    </Pressable>,
                    <Pressable 
                     style={styles.updateDeleteContainer}
                     onPress={()=>handleDelete(item.id)}
                     >
                    <Text style={styles.deleteText}>{item.delete}</Text>
                   </Pressable>,
                  ]}
                  widthArr={tableHeader.widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#ffffff" },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { 
    padding: SIZES.width*0.05, 
    paddingTop: SIZES.height*0.005, 
  },
  head: { 
    height: SIZES.height*0.07, 
    backgroundColor: "#f1f8ff" 
  },
  text: { 
    textAlign: "center", 
  },
  dataWrapper: { 
    flexGrow: 1,
    height:SIZES.height*0.38
  },
  row: { 
    height: SIZES.height*0.08
  },
  updateDeleteContainer:{
    alignItems:"center",
  },
  updateText:{
    backgroundColor:"mediumseagreen",
    padding:SIZES.height*0.005,
    borderRadius:7,
    color:"white"
  },
  deleteText:{
    backgroundColor:"tomato",
    padding:SIZES.height*0.005,
    borderRadius:7,
    color:"white"
  }
})

export default Services;
