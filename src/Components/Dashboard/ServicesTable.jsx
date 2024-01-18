import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row } from "react-native-table-component";
import { SIZES } from "../../Constants/Theme";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal";
import { useSelector } from "react-redux";
import { fetchServices, removeService } from "../../store/services";
import UpdateModal from "./UpdateModal";
import { serviceActions } from "../../store/services";
import WithdrawModal from './WithdrawModal';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tableHeader, setTableHeader] = useState({
    tableHead: ["Service type", "Date", "Amount", "Update", "Delete"],
    widthArr: [100, 100, 100, 100, 100],
  });

  const dispatch = useDispatch();
  const modalVisibleW = useSelector((state) => state.modal.incomeModal);
  const modalVisible = useSelector((state) => state.modal.updateModal);

  const handleShowUpdate = async (id) => {
    dispatch(modalActions.handleUpdateModal());
    dispatch(modalActions.handleUpdateId(id));
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access");
        if (accessToken) {
          const response = await axios.get(
            "https://cleaningservice.onrender.com/api/service/list-provider-services",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            setServices(response.data.services);
          } else {
            Alert.alert("Error⚠️", "Something went wrong!");
          }
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, [services]);

  // useEffect(() => {
  //   dispatch(fetchServices());
  //   setLoading(false)
  // }, [dispatch]);

//   const services = useSelector((state) => state.service.services);
//  console.log(services)
 

  const handleDelete = async (id) => {
    try {
      console.log(id)
      const accessToken = await AsyncStorage.getItem("access");
      if (accessToken) {
        const response = await axios.delete(
          `https://cleaningservice.onrender.com/api/service/delete/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          Alert.alert("Success✔️", "Successfully Deleted");
        } else {
          Alert.alert("Error⚠️", "Not authorized!");
        }
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };
  
  // const handleDelete = (id) =>{
  //   dispatch(removeService(id))
  // }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                {services?.map((item, index) => (
                  <Row
                    key={index}
                    data={[
                      item?.title,
                      item?.created_at,
                      item?.price,
                      <Pressable
                        style={styles.updateDeleteContainer}
                        onPress={() => handleShowUpdate(item.service_id)}
                      >
                        <Text style={styles.updateText}>Update</Text>
                      </Pressable>,
                      <Pressable
                        style={styles.updateDeleteContainer}
                        onPress={() => handleDelete(item.service_id)}
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
      )}
      {modalVisible && <UpdateModal/>}
      {modalVisibleW && <WithdrawModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.width * 0.05,
    paddingTop: SIZES.height * 0.005,
  },
  head: {
    height: SIZES.height * 0.07,
    backgroundColor: "#f1f8ff",
  },
  text: {
    textAlign: "center",
  },
  dataWrapper: {
    flexGrow: 1,
    height: SIZES.height * 0.38,
  },
  row: {
    height: SIZES.height * 0.08,
  },
  updateDeleteContainer: {
    alignItems: "center",
  },
  updateText: {
    backgroundColor: "mediumseagreen",
    padding: SIZES.height * 0.005,
    width: SIZES.width * 0.23,
    borderRadius: 7,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  deleteText: {
    backgroundColor: "tomato",
    padding: SIZES.height * 0.005,
    width: SIZES.width * 0.23,
    borderRadius: 7,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

export default Services;
