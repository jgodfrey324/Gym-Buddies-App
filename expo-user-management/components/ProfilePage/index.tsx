import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Modal, Pressable, StyleSheet, Alert, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'
import FinishSignUp from './FinishSignUp'
import LeftArrowSVG from '../../assets/leftArrow'
import { Session } from '@supabase/supabase-js'
import { useUserContext } from '../../context/context'
import NavBar from '../Navbar'
import ImagePickerComp from './ImagePickerComp'


export default function ProfilePage ({ session }: { session: Session }) {
  const { nickname, setNickname, firstName, setFirstName, lastName, setLastName, age, setAge, weight, setWeight } = useUserContext()
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(true)
  // const [nickname, setNickname] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [age, setAge] = useState('')
  // const [weight, setWeight] = useState('')

  useEffect(() => {
    if (session) {
      console.log('get profile was triggered in use effect')
      getProfile()
    }
  }, [session])

  const reloadProfile = () => {
    console.log('reload profile called get profile')
    setTimeout(() => getProfile(), 2000)
  }

  async function getProfile() {
    console.log('get profile function running')
    try {
      setLoading(true)
      if (!session?.user) {
        // console.log('there isn\'t a session user')
        throw new Error('No user on the session!')
      }

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`nickname, first_name, last_name, age, weight`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        console.log('error', error)
        throw error
      }

      console.log('data', data)
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
        <View>
          <View style={styles.container}>
            <View>
                <FinishSignUp session={session} reloadProfile={reloadProfile} />
            </View>
            <View style={styles.profileNameBox}>
                <Text style={styles.profileName}>{firstName}</Text>
                <Text style={styles.profileName}>{lastName}</Text>
            </View>

            <View style={styles.imagePicker}>
              <ImagePickerComp />
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
          {/* <View>
            <NavBar />
          </View> */}
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
  height: '54%',
  // height: '53%', w navbar
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
  imagePicker: {
    borderWidth: 2,
    borderColor: 'red',
    height: 50
  }
})
