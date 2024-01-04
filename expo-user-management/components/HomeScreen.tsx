import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, styles.container]}>IronBonds</Text>
      <Text style={styles.motto}>Motivation through community</Text>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => navigation.navigate('Auth')} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => navigation.navigate('Auth')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  heading: {
    // marginTop: 20,
    fontSize: 60,
    color: '#C7C588',
    marginLeft: 20,
    paddingBottom: 0
  },
  motto: {
    fontSize: 17,
    paddingLeft: 12,
    marginBottom: 40,
    marginLeft: 20
  }
})
