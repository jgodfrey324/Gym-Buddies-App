import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, } from 'react-native'
import { Icon } from 'react-native-elements'
import { supabase } from '../../lib/supabase'

export default function UserSearch({ showModal, setShowModal}) {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('first_name', `%${input}%`)

    if (error) console.log('error', error)
    else {
      setUsers(data)
    }
  }

  useEffect(() => {
    if (input.length > 0) fetchUsers()
  }, [input])

  console.log(users)

  if (!showModal) {
    return null
  }

  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', width: '100%', height: '105%', zIndex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%'}}>
        <TouchableOpacity style={styles.closeModal} onPress={() => setShowModal(false)}>
          <Icon name="close" type="ionicon" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Search for a user</Text>
        <View style={{marginBottom: 20}}>
          <Text style={{marginBottom: 10}}>Group Name</Text>
          <TextInput
            style={{borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5}}
            onChangeText={text => setInput(text)}
          />
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  closeModal: {
    display: 'flex',
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 50,
    borderColor: 'grey',
    alignItems: 'center',
  }
})
