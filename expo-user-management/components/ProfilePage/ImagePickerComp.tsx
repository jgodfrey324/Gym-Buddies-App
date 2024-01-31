import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';




export default function ImagePickerComp() {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id


    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    const filePath = userId + '/' + uuidv4()

    const imageURI = result.assets[0].uri


    try {
      const { data, error } = await supabase
        .storage
        .from('Images')
        .upload(filePath, imageURI, {
          contentType: 'image/png'
        })

      if (error) console.log('error --> ', error)
    } catch (error) {
      console.log('error --> ', error)
    }


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
