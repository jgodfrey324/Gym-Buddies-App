import { useState, useEffect, SetStateAction } from 'react'
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
  ScrollView
} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Session } from '@supabase/supabase-js'

// components
import { useUserContext } from '../../context/context'
import LeftArrowSVG from '../../assets/leftArrow'
import Spinner from '../Spinner'
import ImagePickerComp from './ImagePickerComp'


export default function FinishSignUp({ session, reloadProfile }: { session: Session; reloadProfile: () => void }) {
  const { nickname, setNickname, firstName, setFirstName, lastName, setLastName, age, setAge, weight, setWeight } = useUserContext()
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState("");

  // trying to add this part into finish sign up and connect them with foreign keys
  const [experienceLevel, setExperienceLevel] = useState(0)
  const [sex, setSex] = useState(0)
  const [athleteType, setAthleteType] = useState(0)


  // setting up data interfaces
  // interface DataInterface {
  //   expData: any | null,
  //   setExpData: (value: any) => void,
  // }
  // const [expData, setExpData] = useState<DataInterface>()



  // data from tables
  const expData = [
    { key: 1, value: '0-3 years' },
    { key: 2, value: '4-6 years' },
    { key: 3, value: '7+ years' }
  ]
  const sexData = [
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' },
    { key: 3, value: 'Prefer not to say' }
  ]
  const athleteData = [
    { key: 1, value: 'bodybuilding' },
    { key: 2, value: 'strength' },
    { key: 3, value: 'crossfit' },
    { key: 4, value: 'calisthenics' },
    { key: 5, value: 'wellness' },
    { key: 6, value: 'endurance' }
  ]




  // const [age, setAge] = useState('')
  // const [weight, setWeight] = useState('')
  const [modalVisible, setModalVisible] = useState(false);




  // data for the select fields
  // const getExperienceLevelsData = async () => {
  //   const { data, error } = await supabase
  //     .from('experience_levels')
  //     .select('id, level')

  //   if (error) {
  //     console.log('error getting experience ---> ', error)
  //     throw error
  //   }

  //   if (data) {
  //     const selectExpData = data.map((item) => {
  //       return { key: item.id, value: item.level }
  //     })

  //     return selectExpData
  //   } else return []
  // }




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






  if (loading) {
    return (
      <View style={styles.spinner}>
        <Spinner />
      </View>
    )
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
      <View style={styles.container}>
      {/* <Pressable

            style={styles.goBackButton}
            onPress={() => setModalVisible(!modalVisible)}>
              <LeftArrowSVG width={20} height={20} />
          </Pressable> */}
        <View style={styles.introTextBox}>
            <Text style={styles.introText}>
              Congrats, you're all signed up!
            </Text>
        </View>

        <View style={styles.tell}>
          <Text style={{fontSize: 30,}}>Finish setting up your profile</Text>
        </View>

        <View style={styles.imagePickerButtonBox}>
          <ImagePickerComp />
        </View>

        <View style={styles.modalTextContentsBox} >


          <View style={styles.sideTextBox}>
            <Text style={styles.sideText}>
              What do you like to be called?
            </Text>
          </View>

          <View style={[styles.inputStyle, styles.inputMargin]}>
            <TextInput style={styles.inputText} placeholder="Nickname" placeholderTextColor="#929292" value={nickname || ''} onChangeText={(text) => setNickname(text)} />
          </View>

          <View style={[styles.inputStyle, styles.inputMargin]}>
            <TextInput style={styles.inputText} placeholder="First name" placeholderTextColor="#929292" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
          </View>

          <View style={[styles.inputStyle, styles.inputMargin]}>
            <TextInput style={styles.inputText} placeholder="Last name" placeholderTextColor="#929292" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
          </View>

          <View style={[styles.inputStyle, styles.inputMargin]}>
            <TextInput style={styles.inputText} placeholder="Age" placeholderTextColor="#929292" value={age || ''} onChangeText={(text) => setAge(text)} />
          </View>

          <View style={[styles.inputStyle, styles.inputMargin]}>
            <TextInput style={styles.inputText} placeholder="Weight (lbs)" placeholderTextColor="#929292" value={weight || ''} onChangeText={(text) => setWeight(text)} />
          </View>

          <View style={styles.inputMargin}>
            <SelectList
              setSelected={(key: SetStateAction<number>) => setSex(key)}
              data={sexData}
              save="key"
              search={false}
              placeholder='Sex'
              boxStyles={styles.selectBox}
              inputStyles={styles.selectInput}
              dropdownTextStyles={styles.inputText}
              dropdownStyles={styles.selectDropDownBox}
            />
          </View>

          <View style={styles.inputMargin}>
            <SelectList
              setSelected={(key: SetStateAction<number>) => setExperienceLevel(key)}
              data={expData}
              save="key"
              search={false}
              placeholder='How long have you been training?'
              boxStyles={styles.selectBox}
              inputStyles={styles.selectInput}
              dropdownTextStyles={styles.inputText}
              dropdownStyles={styles.selectDropDownBox}
            />
          </View>

          <View style={styles.inputMargin}>
            <SelectList
              setSelected={(key: SetStateAction<number>) => setAthleteType(key)}
              data={athleteData}
              save="key"
              search={false}
              placeholder='What type of athlete are you?'
              boxStyles={styles.selectBox}
              inputStyles={styles.selectInput}
              dropdownTextStyles={styles.inputText}
              dropdownStyles={styles.selectDropDownBox}
            />
          </View>



          <View>
            <TouchableOpacity
              style={styles.customButton}
              disabled={loading}
              onPress={() => {
                updateProfile({ nickname, first_name: firstName, last_name: lastName, age, weight, experience_level_id: experienceLevel, sex_id: sex, athlete_type_id: athleteType
                })
                setModalVisible(!modalVisible)
                reloadProfile()
            }
            }
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* <Pressable
            // style={styles.goBackButton}
            onPress={() => setModalVisible(!modalVisible)}>
              <LeftArrowSVG width={20} height={20} />
          </Pressable> */}
        </View>

        {/* <View>
          <TouchableOpacity
          style={styles.customButton}
          onPress={() => supabase.auth.signOut()}>
          <TextInput style={styles.buttonText}>Sign Out</TextInput>
          </TouchableOpacity>
        </View> */}
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}



const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10
  },
  sideText: {
    fontSize: 13,
    fontStyle: 'italic'
  },
  sideTextBox: {
    marginBottom: 10,
    marginLeft: 50,
    // alignContent: 'flex-start',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // height: '100%',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: '20%',
  },
  introTextBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  introText: {
    fontSize: 16
  },
  selectBox: {
    borderRadius: 30,
    // padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    width: '80%',
    fontSize: 18,
    borderColor: '#E1E1E1',
    // borderWidth: 0,
    // color: '#929292'
  },
  selectDropDownBox: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    borderColor: '#E1E1E1'
  },
  selectInput: {
    // backgroundColor: '#E1E1E1',
    fontSize: 18,
    color: '#242424',
    padding: 2,
    // paddingLeft: 5,
    // maxWidth: '90%'
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
  goBackButton: {
    marginTop: 20,
    marginLeft: 20,
    top: 5,
    zIndex: 2,
    borderColor: 'black',
    borderWidth: 2,
    // width: '10%',
    alignSelf: 'baseline',
    padding: 12,
    // paddingHorizontal: 12,
    borderRadius: 30,

  },
  inputStyle: {
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'stretch',
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    paddingLeft: 22,
    width: '80%',
    // color: 'black',
  },
  inputMargin: {
    marginBottom: 10
  },
  tell: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
    marginTop: 5
  },
  inputText: {
    fontSize: 18,
    color: '#242424'
  },
  imagePickerButtonBox: {
    alignItems: 'center'
  },
  modalTextContentsBox: {
    // borderWidth: 1,
    // borderColor: 'orange',
    top: '-2%'
  }
})
