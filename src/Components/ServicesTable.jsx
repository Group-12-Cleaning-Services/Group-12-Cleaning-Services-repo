import React, { useState } from "react";
import { View, ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { Table, Row } from "react-native-table-component";
import { services } from "../../Data";
import { SIZES } from "../Constants/Theme";

const FixedHeaderTable = () => {
  const [state, setState] = useState({
    tableHead: ["Service type", "Date", "Amount", "Update", "Delete"],
    widthArr: [100, 100, 100, 100, 100],
  });


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
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
                    <Pressable style={styles.updateDeleteContainer}>
                      <Text style={styles.updateText}>{item.update}</Text>
                    </Pressable>,
                    <Pressable style={styles.updateDeleteContainer}>
                    <Text style={styles.deleteText}>{item.delete}</Text>
                  </Pressable>,
                  ]}
                  widthArr={state.widthArr}
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

export default FixedHeaderTable;
