import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Modal, Pressable, StyleSheet, Alert, View, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'
import { Text } from 'react-native-elements'
import FinishSignUp from './FinishSignUp'
import LeftArrowSVG from '../../assets/leftArrow'
import { Session } from '@supabase/supabase-js'
import { useUserContext } from '../../context/context'
import Groups from '../Groups'
import ImagePickerComp from './ImagePickerComp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from '../Settings'
import RecentWorkouts from '../Workouts/RecentWorkouts'


export default function ProfilePage({ session }: { session: Session }) {
  const { nickname, setNickname, firstName, setFirstName, lastName, setLastName, age, setAge, weight, setWeight } = useUserContext()
  const Tab = createBottomTabNavigator()
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState('')
  // const [nickname, setNickname] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [age, setAge] = useState('')
  // const [weight, setWeight] = useState('')



  useEffect(() => {
    if (session) {
      getProfile()
      getProfilePic()
    }
  }, [session])

  const reloadProfile = () => {
    setTimeout(() => getProfile(), 2000)
  }

  const getProfilePic = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id
    const CDNUrl = "https://qmuznbxetqnzninllxde.supabase.co/storage/v1/object/public/Images/"

    const { data, error } = await supabase
      .storage
      .from("Images")
      .list(userId + '/', {
        limit: 1,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" }
      });

    if (data != null) {
      console.log('data --> ', data)
      const imageName = data[0].name

      // console.log('userId --> ', userId)
      // console.log('imageName --> ', imageName)

      setImage(CDNUrl + userId + '/' + imageName)

      console.log('image url --> ', image)
    } else {
      if (error) {
        console.log('error --> ', error)
      }
      console.log('data was null')
    }
  }


  async function getProfile() {
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



  return (
    <View>
      <View style={styles.container}>
        <View>
          <FinishSignUp session={session} reloadProfile={reloadProfile} />
        </View>

        <View style={styles.settings}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons
              name='account-cog'
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsComponent}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Settings />
            <Pressable
              style={styles.goBackButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <LeftArrowSVG width={20} height={20} />
            </Pressable>
          </Modal>
        </View>

        <View style={styles.profileNameAndPic}>
          <View style={styles.profileNameBox}>
            <Text style={styles.profileName}>{firstName}</Text>
            <Text style={styles.profileName}>{lastName}</Text>

            <View style={styles.nicknameBox}>
              <Text style={styles.nickname}>Nickname :  {nickname}</Text>
            </View>
          </View>

          <Image style={styles.profilePic} source={{ uri: image }}></Image>
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
            <RecentWorkouts />
          </View>
          {/* <View>
            <NavBar />
          </View> */}
        </View>
    )
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => supabase.auth.signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: '10%',
    backgroundColor: '#3C3C3C',
  },
  settings: {
    alignItems: 'flex-end',
    paddingBottom: '5%'
  },
  profileNameBox: {
    width: '55%',
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 30,
    color: '#C7C588',
    borderWidth: 1,
    borderColor: 'red',
    maxWidth: '100%'
  },
  nicknameBox: {
    maxWidth: '100%',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'orange',
    marginTop: 15
  },
  nickname: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
    borderWidth: 1,
    borderColor: 'red',
    maxWidth: 'auto'
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
    alignSelf: 'baseline',
    padding: 12,
    borderRadius: 30,

  },
  imagePicker: {
    borderWidth: 2,
    borderColor: 'red',
    height: 50
  },
  profileNameAndPic: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'green'
  },
  profilePicBox: {
    borderWidth: 2,
    borderColor: 'red',
    height: 120,
    width: 120
  },
  profilePic: {
    zIndex: 5,
    borderWidth: 3,
    borderColor: '#242424',
    height: 135,
    width: 135,
    borderRadius: 70,
    marginRight: 12,
    objectFit: 'contain'
  },
})
