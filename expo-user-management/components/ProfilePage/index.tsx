import { useState } from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import FinishSignUp from './FinishSignUp'
import LeftArrowSVG from '../../assets/leftArrow'
import { Session } from '@supabase/supabase-js'


// import { Session } from '@supabase/supabase-js'

export default function ProfilePage () {
  const [modalVisible, setModalVisible] = useState(true);
//   const session =

    return (
        <Text>
            This is profile page.
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>

                <Pressable
                    style={styles.goBackButton}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <LeftArrowSVG width={20} height={20} />
                </Pressable>

                <FinishSignUp />

            </Modal>
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
