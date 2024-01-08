import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Touchable, TouchableOpacity, View, Modal, Pressable, Image } from 'react-native'
// import { supabase } from '../lib/supabase'
import { Button, Input, Text } from 'react-native-elements'
// import { useNavigation } from '@react-navigation/native'
import SignInIndex from './SignIn'
import Auth from './Signup/Auth'
import LeftArrow from '../assets/arrow.svg'
import { SvgUri } from 'react-native-svg'

export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState('');
  // const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <Text style={[styles.heading, styles.container]}>IronBonds</Text>
        <Text style={styles.motto}>Motivation through community</Text>

        <View style={styles.buttonContainer}>
              <View style={[styles.verticallySpaced, styles.mt20]}>
              <TouchableOpacity style={styles.buttons} disabled={loading} onPress={function() {
                // navigation.navigate('Auth');
                setModalState('sign in')
                setModalVisible(true)
                }} >
                  <Text style={styles.buttonsText} >Sign In</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.verticallySpaced}>
              <TouchableOpacity style={[styles.buttons, styles.buttonTwo]} disabled={loading} onPress={function () {
                //  navigation.navigate('Auth');
                setModalState('sign up')
                setModalVisible(true)
                 }} >
                  <Text style={[styles.buttonsText, styles.buttonsTextTwo]} >Sign Up</Text>
              </TouchableOpacity>
              </View>
        </View>

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
              <Text>Back</Text>
            </Pressable>
          {modalState === 'sign in' ? <SignInIndex /> : <Auth />}
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '18%',
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  heading: {
    // marginTop: 20,
    fontSize: 60,
    color: '#C7C588',
    marginLeft: 20,
    paddingBottom: 0,
  },
  motto: {
    fontSize: 17,
    paddingLeft: 12,
    marginBottom: 40,
    marginLeft: 20
  },
  buttonContainer: {
    alignSelf: 'center',
    bottom: '-75%',
    width: '75%'
  },
  buttons: {
    marginTop: 8,
    // overflow: 'hidden',
    borderRadius: 20,
    width: '100%',
    backgroundColor: '#242424',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTwo: {
    backgroundColor: 'white'
  },
  buttonsText: {
    color: 'white',
    fontSize: 16
  },
  buttonsTextTwo: {
    color: '#242424'
  },
  goBackButton: {
    margin: 20,
    top: 60,
    zIndex: 2,
    borderColor: 'black',
    borderWidth: 2,
    // width: '10%',
    alignSelf: 'baseline',
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 30
  },
  arrow: {
    height: 50,
    width: 50,
  }
})
