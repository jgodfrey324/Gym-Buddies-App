import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Modal, Pressable, StyleSheet, Alert, View, TouchableOpacity, TextInput, ActivityIndicator, Image, Animated, Easing, useWindowDimensions } from 'react-native'
import { Text } from 'react-native-elements'
import FinishSignUp from './FinishSignUp'
import LeftArrowSVG from '../../assets/leftArrow'
import Spinner from '../Spinner'
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
  const { nickname, setNickname, firstName, setFirstName, lastName, setLastName, age, setAge, weight, setWeight, imageUrl, setImageUrl } = useUserContext()
  const Tab = createBottomTabNavigator()
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  // const [image, setImage] = useState('')
  const [ animationStarted, setAnimationStarted ] = useState(false)


  const { height: windowHeight } = useWindowDimensions()
  const { width: windowWidth } = useWindowDimensions()


  // animation settings for workout View
  const workoutTabHeight = windowHeight * .60
  const start = new Animated.Value(-workoutTabHeight);
  const end = new Animated.Value(0)
  const decayValue = new Animated.Value(0)


  useEffect(() => {
    if (session) {
      getProfile()
      getProfilePic()
    }

    setTimeout(() => {
      setLoading(!loading)
      setAnimationStarted(!animationStarted)
    }, 1000)

  }, [session])



  if (animationStarted) {
    Animated.sequence([
      Animated.spring(
        end,
        {
          toValue: start,
          useNativeDriver: true,
          friction: 8
        }
      ),
      Animated.timing(
        end,
        {
          toValue: start,
          useNativeDriver: true,
          // delay: delay,
          duration: 300
        }
      ),
      // Animated.decay(
      //   decayValue, {
      //     useNativeDriver: true,
      //     velocity: 100,
      //     deceleration: 1
      //   }
      // )
    ])
    .start();
  }




  const reloadProfile = () => {
    setTimeout(() => getProfile(), 1500)
  }




  const getProfilePic = async () => {

    try {
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
        const imageName = data[0]?.name ? data[0].name : ''
        setImageUrl(CDNUrl + userId + '/' + imageName)
      } else {
        if (error) {
          console.log('error --> ', error)
        }
        console.log('data was null')
      }
    } catch(error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }




  async function getProfile() {
    try {
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
    }
  }




  const getInitials = (firstName: string, lastName: string) => {
    let initials = firstName[0] + lastName[0]

    return initials
  }


  const noCapitalLetters = (nickname: string) => {
    let lowerNickname = nickname[0].toLowerCase() + nickname.slice(1, nickname.length)

    return lowerNickname
  }




  if (loading) {
    return (
      <View style={styles.spinner}>
        <Spinner />
      </View>
    )
  }




  return (
    <View>
      <View style={[styles.container, { height: windowHeight }]}>

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

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Pressable
            style={styles.goBackButton}
            onPress={() => setModalVisible(!modalVisible)}>
              <LeftArrowSVG width={20} height={20} />
            </Pressable>
            <Settings />
          </Modal>
        </View>

        <View style={[styles.profileNameAndPic]}>
          <View style={[styles.profileNameBox, {width: windowWidth * .65}]}>

            <View style={styles.nameAndRankBox}>

              <View style={styles.profileFirstAndLast}>
                <Text style={styles.profileName}>@{noCapitalLetters(nickname)}</Text>
                <View style={styles.nicknameBox}>
                    <Text style={styles.nickname}>{firstName}</Text>
                    <Text style={styles.nickname}>{lastName}</Text>
                </View>
              </View>

              <View style={styles.rankBox}>
                <Image style={styles.rankImage} source={{uri: 'https://i.imgur.com/XsQY0h4.png'}}></Image>
                <Text style={styles.rankText}>Scarlett Rank</Text>
              </View>
              {/* https://i.imgur.com/cnr5b2T.png?1 */}
            </View>

          </View>

          {imageUrl ? (
            <Image style={styles.profilePic} source={{ uri: imageUrl }}></Image>
          )
        :
          (
            <View style={styles.profilePic}>
              <Text style={styles.initials}>
                {getInitials(firstName, lastName)}</Text>
            </View>
          )}

        </View>
      </View>

      {/* <Animated.View style={[{transform: [{translateY: animated}]}]}> */}
        <Animated.View style={[{transform: [{translateY: end}]}, styles.whiteScrollContainer]}>
          <RecentWorkouts />
        </Animated.View>
      {/* </Animated.View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: 10,
  },
  container: {
    padding: 20,
    paddingTop: '10%',
    backgroundColor: '#242424',
    paddingBottom: '27%'
  },
  rankImage: {
    height: 40,
    width: 40,
    // borderWidth: 2,
    // borderColor: 'blue',
    // marginLeft: 25,
    shadowColor: 'white',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  rankText: {
    fontSize: 14,
    color: '#C7C588',
    marginTop: 2,
    opacity: .6
    // maxWidth: '50%'
  },
  rankBox: {
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'pink',
    // marginTop: 20
  },
  nameAndRankBox: {
    // borderWidth: 1,
    // borderColor: 'pink',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileFirstAndLast: {
    flexDirection: 'column'
  },
  settings: {
    alignItems: 'flex-end',
    marginTop: 5
  },
  profileNameBox: {
    // width: '80%',
    // borderWidth: 1,
    // borderColor: 'orange',
    alignItems: 'flex-start',
    // marginTop: 10
  },
  profileName: {
    fontSize: 25,
    color: '#C7C588',
    // borderWidth: 1,
    // borderColor: 'red',
    maxWidth: '100%',
    fontWeight: 600,
  },
  initials: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 100,
    alignContent: 'center',
    fontWeight: '200',
    color: '#272727'
  },
  nicknameBox: {
    maxWidth: '100%',
    alignItems: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'orange',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
  },
  nickname: {
    color: '#C7C588',
    opacity: .6,
    fontSize: 14,
    // fontStyle: 'italic',
    // color: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
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
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    top: -25,
    backgroundColor: 'white'
  },
  goBackButton: {
    margin: 20,
    top: '18%',
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 25
    // borderWidth: 1,
    // borderColor: 'green'
  },
  profilePic: {
    // zIndex: 5,
    height: 100,
    width: 100,
    borderRadius: 70,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'black',
    // shadowOpacity: 1,
    // shadowColor: 'orange',
    shadowRadius: 20,
    // objectFit: 'contain'
  },
})
