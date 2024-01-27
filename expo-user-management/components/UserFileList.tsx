import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
// import { useAuth } from '../../provider/AuthProvider'
import * as FileSystem from 'expo-file-system'
// import { decode } from 'base64-arraybuffer'
import { supabase } from '../lib/supabase'
import { FileObject } from '@supabase/storage-js'

const list = () => {
  const [files, setFiles] = useState<FileObject[]>([])
  const [userId, setUserId] = useState('')



  const getUserId = async() => {
    const { data } = await supabase.auth.getUser()

    setUserId(data.user.id)

    return userId
  }


  useEffect(() => {
    if (!getUserId()) return
    // if (!user) return

    // Load user images
    loadImages()
  }, [])

  const loadImages = async () => {
    const { data } = await supabase.storage.from('files').list(userId)
    if (data) {
      setFiles(data)
    }
  }

  const onSelectImage = async () => {
    // TODO
  }

  return (
    <View style={styles.container}>
      {/* FAB to add images */}
      <TouchableOpacity onPress={onSelectImage} style={styles.fab}>
        <Ionicons name="camera-outline" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
  },
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 40,
    right: 30,
    height: 70,
    backgroundColor: '#2b825b',
    borderRadius: 100,
  },
})

export default list
