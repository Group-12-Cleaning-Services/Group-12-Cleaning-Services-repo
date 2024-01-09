import React, { useState, useEffect,  } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={StyleSheet.container}>
      <Button title="Pick an image " onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
})