import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

interface GroupCardProps {
  group: object,
  setCloseGroupModal: Function,
  setCurrentGroup: Function
}

export default function GroupCard({ group, setCloseGroupModal, setCurrentGroup }: GroupCardProps) {
  const { group_name } = group

  const handleGroupClick = () => {
    setCurrentGroup(group)
    setCloseGroupModal(false)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleGroupClick}>
      <Image style={styles.groupImage} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} />
        <Text style={styles.groupName}>{group_name}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    width: '70%',
  },
  groupImage: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  groupName: {
    display: 'flex',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  }
})
