import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialIcons, EvilIcons, Fontisto } from "@expo/vector-icons";
import Button from "../../Components/Button";
import { SIZES } from "../../Constants/Theme";
import { useState } from "react";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const Booking = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user_type, setUserType] = useState("customer");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [bookingDate, setBookingDate] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bookingTime, setBookingTime] = useState();

  const handleChange = (key, value) => {
    if (key === "username") {
      setUsername(value);
    } else if (key === "password") {
      setPassword(value);
    } else if (key === "email") {
      setEmail(value);
    }
  };

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };
  const handleDateChange = ({ type }, selectedDate) => {
    handleShowPicker();
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setBookingDate(currentDate.toDateString());
    }
  };


  const handleShowTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  
  const handleTimeChange = ({ type }, selectedTime) => {
    handleShowTimePicker();
    if (type == "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      setBookingTime(currentTime.toTimeString());
    }
  };


  const handleBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://cleaningserve.pythonanywhere.com/api/accounts/create/",
        {
          email,
          password,
          user_type,
        },
      );
      if (response.status === 201) {
        await AsyncStorage.setItem("userRegistered", email);
        await AsyncStorage.setItem("user_type", user_type);
        Alert.alert("Success ✔️", "User created succesful");
        navigation.navigate("OTP");
      }
      if (response.status === 208) {
        Alert.alert("Warning ⚠️", "User already exist");
      }
    } catch (error) {
      Alert.alert("Warning ⚠️", "Something went wrong");
      setLoading(false);
      setEmail("");
      setPassword("");
      setUsername("");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  const {
    container,
    welcomeContainer,
    welcomeTitle,
    welcomeText,
    inputContainer,
    inputField,
    input,
    iconUser,
    scrollContainer,
    indicator,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView style={scrollContainer}>
        <View style={styles.gobackIcon}>
          <Feather
            name="log-out"
            size={24}
            color="black"
            style={styles.mirroredIcon}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={welcomeContainer}>
          <Text style={welcomeTitle}>Booking</Text>
          <Text style={welcomeText}>
            Proceed to provide us with your detail
          </Text>
        </View>
        <View style={inputContainer}>
          <View style={input}>
            <Feather name={"user"} size={20} color={"black"} style={iconUser} />
            <TextInput
              style={inputField}
              placeholder="Full Name"
              onChangeText={(value) => handleChange("username", value)}
              value={username}
            />
          </View>
          <View style={input}>
            <EvilIcons
              name="location"
              size={23}
              color="black"
              style={iconUser}
            />
            <TextInput
              style={inputField}
              placeholder="Address"
              onChangeText={(value) => handleChange("email", value)}
              value={email}
            />
          </View>
          <View style={input}>
            <Fontisto name="date" size={20} color="black" style={iconUser} />
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={handleDateChange}
                animation={""}
              />
            )}
            <Pressable onPress={handleShowPicker}>
              <TextInput
                style={inputField}
                placeholder="Choose a date"
                onChangeText={(value) => handleChange("date", value)}
                value={bookingDate}
                editable={false}
              />
            </Pressable>
          </View>
          <View style={input}>
          <MaterialIcons name="av-timer" size={20} color="black" style={iconUser}/>
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={time}
                onChange={handleTimeChange}
                animation={""}
              />
            )}
            <Pressable onPress={handleShowTimePicker}>
              <TextInput
                style={inputField}
                placeholder="Choose a time"
                onChangeText={(value) => handleChange("time", value)}
                value={bookingTime}
                editable={false}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <Button
            title={"Cancel"}
            buttonContainer={styles.saveCancelBtn}
            buttonText={styles.cancelText}
            press={() => navigation.navigate("Login")}
          />
          <Button
            title={"Proceed"}
            buttonContainer={styles.saveCancelBtn}
            buttonText={styles.proceedlText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    width: "100%",
  },
  image: {
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.3,
  },
  welcomeContainer: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25,
    paddingTop: SIZES.height * 0.05,
  },
  welcomeText: {
    color: "black",
    paddingTop: SIZES.height * 0.02,
    textAlign: "center",
    width: SIZES.width * 0.8,
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: SIZES.height * 0.02,
  },
  inputField: {
    width: SIZES.width * 0.64,
    padding: SIZES.height * 0.0007,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width * 0.8,
    padding: SIZES.height * 0.014,
    borderRadius: 10,
    margin: 7,
    backgroundColor: "white",
    color: "black",
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: "center",
    top: SIZES.height * 0.01,
  },
  buttonText: {
    color: "black",
    backgroundColor: "white",
    width: SIZES.width * 0.45,
    padding: SIZES.height * 0.02,
    textAlign: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  btnsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  saveCancelBtn: {
    alignItems: "center",
    margin: 12,
  },
  haveAccount: {
    alignItems: "center",
    paddingTop: SIZES.height * 0.035,
  },
  haveAccountText: {
    color: "white",
    backgroundColor: "#6497B1",
    width: SIZES.width * 0.6,
    padding: SIZES.height * 0.017,
    textAlign: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  iconUser: {
    margin: 2,
    paddingRight: 5,
    color: "#9CADF2",
    borderColor: "#DBE3FF",
    borderRightWidth: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#B3CDE0",
    flexGrow: 1,
    paddingBottom: 50,
  },
  indicator: {
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    top: SIZES.height * 0.765,
    left: SIZES.width * 0.45,
  },
  gobackIcon: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mirroredIcon: {
    transform: [{ scaleX: -1 }],
  },
  cancelText: {
    color: "white",
    backgroundColor: "#005B96",
    width: SIZES.width * 0.35,
    padding: SIZES.width * 0.03,
    textAlign: "center",
    borderRadius: 15,
    paddingTop: 10,
    overflow: "hidden",
  },
  proceedlText: {
    color: "white",
    backgroundColor: "#03396C",
    width: SIZES.width * 0.35,
    padding: SIZES.width * 0.03,
    textAlign: "center",
    borderRadius: 15,
    paddingTop: 10,
    overflow: "hidden",
  },
});

export default Booking;
