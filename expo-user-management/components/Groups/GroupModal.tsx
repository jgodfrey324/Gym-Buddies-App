import { useState, useEffect} from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';

interface GroupModalProps {
  currentGroup: object,
  closeGroupModal: boolean,
  setCloseGroupModal: Function,
  setCurrentGroup: Function
}

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export default function GroupModal({ currentGroup, closeGroupModal, setCloseGroupModal, setCurrentGroup }: GroupModalProps) {
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
        <Text style={{ fontSize: 20 }}>X</Text>
      </TouchableOpacity>
      <Text>GroupModal</Text>
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
})
