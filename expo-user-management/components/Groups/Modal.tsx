import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

interface RenderModalProps {
  showModal: boolean
  addGroup: () => void
  groupName: string
  setGroupName: Function
  setShowModal: Function
}

const RenderModal = ({showModal, addGroup, groupName, setGroupName, setShowModal}: RenderModalProps) => {
  if (showModal) {
    return (
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%'}}>
          <Text style={{width: 15, position: 'absolute', right: 15, top: 5, fontSize: 20}} onPress={() => setShowModal(false)}>X</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Create a Group</Text>
          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 10}}>Group Name</Text>
            <TextInput
              style={{borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5}}
              onChangeText={text => setGroupName(text)}
              value={groupName}
            />
          </View>
          <TouchableOpacity
            onPress={addGroup}
            style={{backgroundColor: 'black', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>Create Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default RenderModal
