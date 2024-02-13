import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function GroupCard() {
  return (
    <View style={styles.container}>
      <Image style={styles.groupImage} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} />
      <Text style={styles.groupName}>Group Name</Text>
    </View>
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
    fontSize: 18,
    marginLeft: 40
  }
})
