import { useState, useEffect} from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements'
interface GroupModalProps {
  currentGroup: object,
  closeGroupModal: boolean,
  setCloseGroupModal: Function,
  setCurrentGroup: Function
}

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export default function GroupModal({ currentGroup, closeGroupModal, setCloseGroupModal, setCurrentGroup }: GroupModalProps) {
  const { group_name } = currentGroup

  const handleCloseModal = () => {
    setCloseGroupModal(true)
    setCurrentGroup({})
  }

  if (closeGroupModal) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleCloseModal}>
        <Icon name='close' type='ionicon' style={styles.closeModal}/>
      </TouchableOpacity>
      <Text style={styles.groupName}>{group_name}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '110%',
    marginTop: statusBarHeight,
    zIndex: 1,
    flex: 1
  },
  closeModal: {
    display: 'flex',
    alignSelf: 'flex-end',
    fontSize: 20,
    marginRight: 20,
    marginTop: 5
  },
  groupName: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  }
})
