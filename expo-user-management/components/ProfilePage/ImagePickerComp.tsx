import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import { decode } from 'base64-arraybuffer'
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComp() {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // const imageURI = result.assets[0].uri
    // const { data, error } = await supabase
    //   .storage
    //   .from('Images')
    //   .upload( imageURI, decode(result.assets[0].uri), {
    //     contentType: 'image/png'
    //   })

    // if (error) {
    //   console.log('error: ', error)
    // } else {
    //   console.log('data: ', data)
    // }


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
