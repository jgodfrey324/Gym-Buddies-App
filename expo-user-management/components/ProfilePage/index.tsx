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
        // console.log('data from profile', data)

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
        <View>
          <View style={styles.container}>
            <View>
                <FinishSignUp session={session} />
            </View>
            <View style={styles.profileNameBox}>
                <Text style={styles.profileName}>{firstName}</Text>
                <Text style={styles.profileName}>{lastName}</Text>
            </View>

            <View style={styles.nicknameBox}>
              <Text style={styles.nickname}>Nickname :  {nickname}</Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => supabase.auth.signOut()}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

            <View style={styles.whiteScrollContainer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  // top: 100,
  paddingTop: '20%',
  backgroundColor: '#3C3C3C'
},
profileNameBox: {
  width: '55%',
  // borderWidth: 2,
  // borderColor: 'red',
  left: '27%',
},
profileName: {
  fontSize: 30,
  // left: 120,
  color: '#C7C588'
},
nicknameBox: {

  // alignItems: 'center',
  marginTop: 20
},
nickname: {
  fontSize: 17,
  fontStyle: 'italic',
  left: '27%',
  color: 'white'
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
  marginTop: 60,
  marginBottom: 50
},
buttonText: {
  color: 'white',
  fontSize: 16,
},
whiteScrollContainer: {
  borderWidth: 2,
  borderColor: 'red',
  height: '56%',
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  top: -20,
  backgroundColor: 'white'
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
