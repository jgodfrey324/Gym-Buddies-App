import { useState, useEffect, SetStateAction, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  useWindowDimensions
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { SelectList } from 'react-native-dropdown-select-list'
import { Session } from '@supabase/supabase-js'

// components
import { useUserContext } from '../../context/context'
import LeftArrowSVG from '../../assets/leftArrow'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from '../Spinner'
import ImagePickerComp from './ImagePickerComp'
import Slide1 from './FinishSignUpWindows/Slide1'
import Slide2 from './FinishSignUpWindows/Slide2'
import Slide3 from './FinishSignUpWindows/Slide3';
import Slide4 from './FinishSignUpWindows/Slide4';
import Slide5 from './FinishSignUpWindows/Slide5';


export default function FinishSignUp({ session, reloadProfile }: { session: Session; reloadProfile: () => void }) {
  const { nickname, firstName, lastName, age, weight, experienceLevel, sex, athleteType } = useUserContext()

  const { width: windowWidth } = useWindowDimensions();
  const { height: windowHeight } = useWindowDimensions();

  const [loading, setLoading] = useState(true)
  const [slideCount, setSlideCount] = useState(1)

  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    if (session) {
      getProfile()
    }
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
    age,
    experience_level_id,
    sex_id,
    athlete_type_id
  }: {
    first_name: string
    last_name: string
    nickname: string
    weight: number
    age: number
    experience_level_id: number
    sex_id: number
    athlete_type_id: number
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
        experience_level_id,
        sex_id,
        athlete_type_id,
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
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={[styles.container, { width: windowWidth, height: windowHeight }]}>

            {slideCount === 1 && (
              <Animatable.View animation='bounceInRight' delay={1200}>
                <Slide1 />
              </Animatable.View>
            )}

            {slideCount === 2 && (
              <Animatable.View animation='bounceInRight' delay={200}>
                <Slide2 />
              </Animatable.View>
            )}

            {slideCount === 3 && (
              <Animatable.View animation='bounceInRight' delay={200}>
                <Slide3 />
              </Animatable.View>
            )}

            {slideCount === 4 && (
              <Animatable.View animation='bounceInRight' delay={200}>
                <Slide4 />
              </Animatable.View>
            )}

            {slideCount >= 5 && (
              <Animatable.View animation='bounceInRight' delay={200}>
                <Slide5 />
              </Animatable.View>
            )}

            {slideCount <= 4 && (<Animatable.View animation='bounceInRight' delay={1200}>
              <Pressable
                style={styles.nextButton}
                onPress={() => { setSlideCount(slideCount + 1) }}>
                <MaterialCommunityIcons name='arrow-right' size={25} />
              </Pressable>
            </Animatable.View>)}

            {slideCount > 4 && (
              <Animatable.View animation='bounceInRight' delay={200}>
                <TouchableOpacity
                  style={styles.customButton}
                  disabled={loading}
                  onPress={() => {
                    updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight, experience_level_id: experienceLevel, sex_id: sex, athlete_type_id: athleteType
                    })
                    setModalVisible(!modalVisible)
                    reloadProfile()
                  }}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // height: '100%',
    borderColor: 'black',
    borderWidth: 2,
    //figure out different screen sizes for modal size thing
    marginTop: '20%',
    height: '100%'
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
  nextButton: {
    marginTop: 20,
    marginRight: 20,
    top: 5,
    zIndex: 2,
    // borderColor: 'black',
    // borderWidth: 2,
    // width: '10%',
    alignSelf: 'flex-end',
    padding: 12,
    // paddingHorizontal: 12,
    borderRadius: 30,

  },
  modalTextContentsBox: {
    // borderWidth: 1,
    // borderColor: 'orange',
    top: '-2%'
  }
})
