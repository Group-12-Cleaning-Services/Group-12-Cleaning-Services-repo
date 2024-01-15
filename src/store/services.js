import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";


export const addService = createAsyncThunk("insert/data", async(service)=>{
  try {
    const accessToken = await AsyncStorage.getItem('access');
    if (accessToken) {
      const formData = new FormData();
      formData.append('title', service.title);
      formData.append('description', service.description);
      formData.append('price', service.price);
      formData.append('category', service.category);
      formData.append('thumnail', {
        uri: service.thumnail,
        name: 'thumnail.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(
        'https://cleaningservice.onrender.com/api/service/create/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success✔️', 'Service created Successfully');
      } else if (response.status === 403) {
        Alert.alert('Warning⚠️', 'Not authorized');
      }
    }
  } catch (error) {
    console.error(error);
  }finally{
    return service
  }
})

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
    
export const updateService = createAsyncThunk("update/data", async(service)=>{
  try {
    const accessToken = await AsyncStorage.getItem('access');
    if (accessToken) {
      const formData = new FormData();
      formData.append('title', service.title);
      formData.append('description', service.description);
      formData.append('price', service.price);
      formData.append('category', service.category);
      formData.append('thumnail', {
        uri: service.thumnail,
        name: 'thumnail.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(
        `https://cleaningservice.onrender.com/api/service/update/${service.update_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        Alert.alert('Success✔️', 'Service Update Successfully');
        dispatch(modalActions.handleUpdateModal());
      } else if (response.status === 403) {
        Alert.alert('Warning⚠️', 'Not authorized');
      }
    }
  } catch (error) {
    console.error(error);
  }finally{
    return service
  }
})

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
        serviceStatus:[]
    },
    reducers:{
      handleServiceStatus:(state, action) =>{
        state.serviceStatus = action.payload
      }   
    },

    extraReducers:(builder)=>{
        builder
        .addCase(addService.fulfilled, (state, action)=>{
          console.log(action.payload)
          state.services.push(action.payload)
      })
        .addCase(fetchServices.fulfilled, (state, action)=>{
            state.services = action.payload;
        })
        .addCase(updateService.fulfilled, (state, action)=>{
          const updatedService = action.payload;
          const index = state.services.findIndex((post) => post.id === updatedService.id);
          if (index !== -1) {
            state.services[index] = updatedService;
          }
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