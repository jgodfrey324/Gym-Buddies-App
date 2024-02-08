import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from "base64-arraybuffer";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserContext } from '../../context/context'




export default function ImagePickerComp() {
  const [image, setImage] = useState('');
  const { firstName, lastName } = useUserContext()
  console.log('first!!!!', firstName, 'last!!!!', lastName)

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

    // TODO: add if check to result to remove error
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

  const getInitials = (firstName: string, lastName: string) => {
    let initials = firstName[0] + lastName[0]
    return initials
  }

  // console.log(getInitials(firstName, lastName))

  return (
    <View style={styles.buttonContainer}>
      {image ? (
        <Image source={{ uri: image }} style={styles.tempProfilePic} />
      ) : (
        <>
          <TouchableOpacity onPress={pickImage}>
            {/* profile pic placeholder */}
            <View style={styles.tempProfilePic}>
              {/* <MaterialCommunityIcons name='image-plus' size={80} style={{marginLeft:'auto', marginRight:'auto'}}/> */}
              {/* <Text style={styles.buttonText}>Upload profile picture</Text> */}

              <Text>
                {getInitials(firstName, lastName)}</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.buttonText}>Upload profile picture</Text>
          </View>
        </>
      )}
    </View>
  );


}

const styles = StyleSheet.create({
  buttonContainer: {
    // marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#272727',
    fontSize: 16,
    textAlign: 'center',
    width: 150,
    alignSelf: 'center',
    // marginTop: 'auto',
    // marginBottom: 'auto'
  },
  tempProfilePic: {
    height: 180,
    width: 180,
    borderWidth: 3,
    borderRadius: 90,
    margin: 10,
    padding: 20,
    gap: 10
  },
})
