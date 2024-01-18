import React, { useState, useEffect } from "react";
import { View, ScrollView, Pressable, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from "react-native-table-component";
import { BookedService } from "../../../Data";
import { SIZES } from "../../Constants/Theme";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { modalActions } from "../../store/modal";
import { useSelector } from 'react-redux';
import BookedModal from "./BookedModal";


const BookedServices = () => {

  const dispatch = useDispatch()
  const modalVisible = useSelector((state) => state.modal.serviceStatusModal)
  const statusValue = useSelector((state) => state.service.statusValue)
  
  const [services, setServices] = useState()
  const [tableHeader, setTableHeader] = useState({
    tableHead: ["Service type", "Date", "Amount", "Status", "Delete"],
    widthArr: [100, 100, 100, 100, 100],
  });

  
  const handleStatus = async(id) => {
    await AsyncStorage.setItem("status_id",id)
    const updatedServices = services.map(service => {
      if (service.id === id) {
        return {
          ...service,
          statusValue: statusValue, 
        };
      }
      return service;
    });
    setServices(updatedServices);
    dispatch(modalActions.handleServiceStatusModal());
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        if (accessToken) {
          const response = await axios.get(
            'https://cleaningservice.onrender.com/api/service/list-service-provider-booked-services/',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            }
          );
          if(response.status === 200){
            setServices(response.data.services)
          } else {
            Alert.alert("Error⚠️", 'Something went wrong!')
          }
        }
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };
  
    getServices();
  }, [services]);
  
 

  const handleDelete = async (id) => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      console.log(id)
      if (accessToken) {
        const response = await axios.delete(
          `https://cleaningservice.onrender.com/api/service/delete-booked-service/${id}/`,
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
              {services?.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    item?.title,
                    item?.date,
                    item?.price,
                    <Pressable 
                     style={styles.updateDeleteContainer}
                     onPress={()=>handleStatus(item?.id)}
                     >
                      <Text style={styles.updateText}>{item?.status}</Text>
                    </Pressable>,
                    <Pressable 
                     style={styles.updateDeleteContainer}
                     onPress={()=>handleDelete(item?.id)}
                     >
                    <Text style={styles.deleteText}>Delete</Text>
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
      {modalVisible && <BookedModal/>}
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
    justifyContent:"center",
  },
  updateText:{
    backgroundColor:"mediumseagreen",
    padding:SIZES.height*0.005,
    width:SIZES.width*0.24,
    borderRadius:7,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    color:"white"
  },
  deleteText:{
    backgroundColor:"tomato",
    padding:SIZES.height*0.005,
    width:SIZES.width*0.24,
    borderRadius:7,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    color:"white"
  }
})

export default BookedServices;
