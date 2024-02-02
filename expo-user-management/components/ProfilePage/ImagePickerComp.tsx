import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from "base64-arraybuffer";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';




export default function ImagePickerComp() {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    const filePath = userId + '/' + uuidv4()
    // const filePath = userId + '/profile-pic'


    const imageURI = result.assets[0].uri
    const base64Image = await FileSystem.readAsStringAsync(imageURI, { encoding: FileSystem?.EncodingType?.Base64 })
    const arrayBuffer = decode(base64Image);





    try {
      const { data, error } = await supabase
        .storage
        .from('Images')
        .upload(filePath, arrayBuffer, {
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
    <View style={styles.buttonContainer}>
      {image ? (
        <Image source={{ uri: image }} style={styles.tempProfilePic} />
      ) :
      (
        <View style={styles.tempProfilePic} >
          {/* profile pic placeholder */}
          <Text>

          </Text>
        </View>
      )}
      <TouchableOpacity onPress={pickImage}>
        {!image ? (
          <Text style={styles.buttonText}>Upload profile picture</Text>
        ) :
        (
          <Text style={styles.buttonText}>Change profile picture</Text>
        )}
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#C7C588',
    fontSize: 18,
    textAlign: 'center',
    // borderWidth: 1,
    // borderColor: 'orange',
    width: 150,
  },
  tempProfilePic: {
    height: 130,
    width: 130,
    borderWidth: 2,
    borderColor: '##242424',
    borderRadius: 70,
    marginBottom: 10
  }
})
