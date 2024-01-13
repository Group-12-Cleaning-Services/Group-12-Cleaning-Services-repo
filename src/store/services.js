import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';




export const fetchServices = createAsyncThunk("services", async () => {
    try {
        const accessToken = await AsyncStorage.getItem("access");
        if (accessToken) {
          const response = await axios.get(
            `https://cleaningservice.onrender.com/api/service/list-provider-services`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            return response.data.services
          } else {
            Alert.alert("Error⚠️", "Something went wrong!");
          }
        }
      } catch (error) {
        console.error("Something went wrong!", error);
      }
});

export const removeService = createAsyncThunk("remove", async(id)=>{
    try {
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
});



export const serviceSlice = createSlice({
    name: "service",
    statuse:"idle",
    initialState:{
        services:[],
    },
    reducers:{   
    },

    extraReducers:(builder)=>{
        builder
        .addCase(fetchServices.fulfilled, (state, action)=>{
            state.services = action.payload;
        })              
        .addCase(removeService.fulfilled, (state, action)=>{
            const {id} = action.payload
            const existingServices = state.services.find((item)=>item.id === id);

            if(existingServices){
                state.services = state.services.filter((item)=> item.id !== id);
            }
        })
    }
})


export const serviceActions = serviceSlice.actions;