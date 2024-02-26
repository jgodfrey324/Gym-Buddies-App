import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function GroupCard({ group }: { group: object }) {
  const { group_name } = group

  return (
    <View style={styles.container}>
      <Image style={styles.groupImage} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} />
        <Text style={styles.groupName}>{group_name}</Text>
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
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  }
})
