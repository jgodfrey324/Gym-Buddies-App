import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, TouchableOpacity, Text, TextInput, Modal} from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'

export default function FinishSignUp({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [modalVisible, setModalVisible] = useState(true);


  // useEffect(() => {
  //   if (session) getProfile()
  // }, [session])

  // async function getProfile() {
  //   try {
  //     setLoading(true)
  //     if (!session?.user) throw new Error('No user on the session!')

  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`nickname, first_name, last_name, age, weight`)
  //       .eq('id', session?.user.id)
  //       .single()
  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setNickname(data.nickname)
  //       setFirstName(data.first_name)
  //       setLastName(data.last_name)
  //       setAge(data.age)
  //       setWeight(data.weight)
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message)
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

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
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
    >



      <View style={styles.container}>
        <View style={styles.tell}>
          <Text style={{fontSize: 30,}}>Tell us about yourself</Text>
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput style={styles.inputText} placeholder="Nickname" value={nickname || ''} onChangeText={(text) => setNickname(text)} />
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput style={styles.inputText} placeholder="First name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput style={styles.inputText} placeholder="Last name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput style={styles.inputText} placeholder="Age" value={age || ''} onChangeText={(text) => setAge(text)} />
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput style={styles.inputText} placeholder="Weight (lbs)" value={weight || ''} onChangeText={(text) => setWeight(text)} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={function() {
              updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight
              })
              setModalVisible(!modalVisible)
            }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => supabase.auth.signOut()}>
            <TextInput style={styles.buttonText}>Sign Out</TextInput>
          </TouchableOpacity>
        </View> */}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%',
    borderColor: 'black',
    borderWidth: 2,
    // paddingTop: 100
    // padding: 20
  },
  customButton: {
    backgroundColor: '#242424',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    // width: 100
  },
  inputStyle: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'stretch',
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    paddingLeft: 50,
    width: '80%',
  },
  inputMargin: {
    marginBottom: 20
  },
  tell: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40
  },
  inputText: {
    fontSize: 18
  }
})
