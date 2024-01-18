import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Modal, Pressable, StyleSheet, Alert } from 'react-native'
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
        <Text>
            This is profile page.
            {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}> */}

                {/* <Pressable
                    style={styles.goBackButton}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <LeftArrowSVG width={20} height={20} />
                </Pressable> */}


            {/* </Modal> */}
            <FinishSignUp session={session} />
        </Text>
    )
}

const styles = StyleSheet.create({
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
