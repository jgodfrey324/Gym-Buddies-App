import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')


  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`nickname, first_name, last_name, age, weight`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setNickname(data.nickname)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setAge(data.age)
        setWeight(data.weight)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    nickname,
    first_name,
    last_name,
    age,
    weight
  }: {
    nickname: string
    first_name: string
    last_name: string
    age: string
    weight: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        nickname,
        first_name,
        last_name,
        age,
        weight,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View> */}
      <View style={styles.verticallySpaced}>
        <Input label="Nickname" value={nickname || ''} onChangeText={(text) => setNickname(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="First name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Last name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Age" value={age || ''} onChangeText={(text) => setAge(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Weight" value={weight || ''} onChangeText={(text) => setWeight(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
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
})
