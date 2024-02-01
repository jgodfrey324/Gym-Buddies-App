import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, TouchableOpacity, Text, TextInput} from 'react-native'
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
      <View style={styles.tell}>
        <Text style={{fontSize: 25}}>Tell us about yourself</Text>
      </View>
      <View style={[styles.inputStyle, styles.inputMargin]}>
        <TextInput placeholder="Nickname" value={nickname || ''} onChangeText={(text) => setNickname(text)} />
      </View>
      <View style={[styles.inputStyle, styles.inputMargin]}>
        <TextInput placeholder="First name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
      </View>
      <View style={[styles.inputStyle, styles.inputMargin]}>
        <TextInput placeholder="Last name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
      </View>
      <View style={[styles.inputStyle, styles.inputMargin]}>
        <TextInput placeholder="Age" value={age || ''} onChangeText={(text) => setAge(text)} />
      </View>
      <View style={[styles.inputStyle, styles.inputMargin]}>
        <TextInput placeholder="Weight (lbs)" value={weight || ''} onChangeText={(text) => setWeight(text)} />
      </View>
      <View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight })}
          disabled={loading}
        >
          <TextInput style={styles.buttonText}>Update</TextInput>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => supabase.auth.signOut()}>
          <TextInput style={styles.buttonText}>Sign Out</TextInput>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    paddingTop: 150,
  },
  customButton: {
    backgroundColor: '#242424',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '85%',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  inputStyle: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'stretch',
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    paddingLeft: 50,
    width: '85%',
  },
  inputMargin: {
    marginBottom: 20
  },
  tell: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40
  }
})
