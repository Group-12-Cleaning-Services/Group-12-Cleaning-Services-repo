import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import { services } from "../../Data";

const FixedHeaderTable = () => {
  const [state, setState] = useState({
    tableHead: ["Service", "Date", "Amount", "Update", "Delete"],
    widthArr: [100, 100, 100, 100, 100],
  });


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              {services.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    item.service,
                    item.date,
                    item.amount,
                    item.update,
                    item.delete,
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

const styles = {
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { textAlign: "center", },
  dataWrapper: { marginTop: -1 },
  row: { height: 30 },
};

export default FixedHeaderTable;
