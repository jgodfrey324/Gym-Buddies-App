import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Modal, Pressable, StyleSheet, Alert, View, TouchableOpacity, TextInput } from 'react-native'
import { Text } from 'react-native-elements'
import FinishSignUp from './FinishSignUp'
import LeftArrowSVG from '../../assets/leftArrow'
import { Session } from '@supabase/supabase-js'


export default function ProfilePage ({ session }: { session: Session }) {
  const [modalVisible, setModalVisible] = useState(true);
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
        console.log('data from profile', data)

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


    return (
        <View style={styles.container}>
            <View>
                <FinishSignUp session={session} />
            </View>
            <View style={styles.profileNameBox}>
                <Text style={styles.profileName}>{firstName} {lastName}</Text>
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

},
profileNameBox: {

},
profileName: {
    fontSize: 20
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
goBackButton: {
    margin: 20,
    top: 85,
    zIndex: 2,
    borderColor: 'black',
    borderWidth: 2,
    // width: '10%',
    alignSelf: 'baseline',
    padding: 12,
    // paddingHorizontal: 12,
    borderRadius: 30,

  },
})
