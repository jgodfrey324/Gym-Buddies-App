import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Touchable, TouchableOpacity, View, Modal, Pressable, Image, Platform, ScrollView } from 'react-native'
// import { supabase } from '../lib/supabase'
import { Button, Input, Text } from 'react-native-elements'
// import { useNavigation } from '@react-navigation/native'
import SignInIndex from './SignIn'
import Auth from './Signup/Auth'
import ForgotPassword from './ForgotPassword'
// import LeftArrow from '../assets/left-arrow.svg'
import LeftArrowSVG from '../assets/leftArrow'
// import { SvgUri } from 'react-native-svg'
// import { ModalStateProps } from '../types'

export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState('');
  // const navigation = useNavigation()


  const getModalState = (modalState) => {
    if (modalState === 'sign in') {
      return <SignInIndex setModalState={setModalState} />
    } else if (modalState === 'sign up') {
      return <Auth />
    } else if (modalState === 'forgot password') {
      return <ForgotPassword />
    }
  }

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

        {/* <View>
        {modalState === 'sign up' ? <Auth /> : null}

        </View> */}

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

            {getModalState(modalState)}

            {/* {modalState === 'sign in' ?
            <View style={styles.password}>
            <Text onPress={() => setModalState('forgot password')} style={styles.smallText}>Forgot Password?</Text>
            </View>
            :
            null} */}

            {/* {modalState === 'sign in' ?
            <View style={styles.switchModalViewHouse}>
              <Text style={styles.switchModalViewText}>Don't have an account? </Text><Text onPress={() => setModalState('sign up')} style={styles.signUpText}> Sign up</Text>
            </View>
             :
            null} */}

        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '18%',
    padding: 12,
    backgroundColor: '#242424'
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
    marginLeft: 20,
    color: '#FFFFfF'
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
    fontSize: 18
  },
  buttonsTextTwo: {
    color: '#242424'
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
  arrow: {
    height: 50,
    width: 50,
  },
  // signUpText: {
  //   textDecorationStyle: 'solid',
  //   // textDecorationLine: 'underline',
  //   color: '#242424',
  //   alignSelf: 'baseline'
  // },
  // switchModalViewText: {
  //   color: '#929292',
  //   alignSelf: 'baseline'
  // },
  // switchModalViewHouse: {
  //   flexDirection: 'row',
  //   bottom: Platform.OS === 'ios' ? '90%' : '72%',
  //   alignSelf: 'center',
  //   zIndex: 2,
  // },
  password: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: 'red',
    zIndex: 2,
    bottom: Platform.OS === 'ios' ? '60%' : '52%'
    // alignSelf: 'flex-end'
  },
  // smallText: {
  //     fontSize: 14,
  //     color: '#242424'
  // },
})
