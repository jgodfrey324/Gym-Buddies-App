import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, TouchableOpacity, Text, TextInput, Modal, Pressable } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import LeftArrowSVG from '../../assets/leftArrow'


export default function FinishSignUp({ session, reloadProfile }: { session: Session; reloadProfile: () => void }) {
  const [loading, setLoading] = useState(true)
  const [nickname, setNickname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFirstName(data.first_name)

        if (!data.first_name) {
          setTimeout(() => {
            setModalVisible(!modalVisible)
          }, 100)
        }
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
    first_name,
    last_name,
    nickname,
    weight,
    age
  }: {
    first_name: string
    last_name: string
    nickname: string
    weight: string
    age: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        // id: session?.user.id,
        first_name,
        last_name,
        nickname,
        weight,
        age,
        updated_at: new Date(),
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updates)

      if (error) {
        throw error
      } else {
        Alert.alert('db was updated')
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
            disabled={loading}
            onPress={() => {
              updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight
              })
              setModalVisible(!modalVisible)
              reloadProfile()
          }
          }
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <Pressable
          // style={styles.goBackButton}
          onPress={() => setModalVisible(!modalVisible)}>
            <LeftArrowSVG width={20} height={20} />
        </Pressable>

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
    // padding: 20,
    top: '10%',
    padding: 20,
    paddingTop: 50
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
    // borderWidth: 1,
    // borderColor: 'blue'
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
