import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation()

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error)
      Alert.alert(error.message);
    }
    if (!error && !session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
    signInWithEmail()
  }

  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => {
    //   setModalVisible(!modalVisible)}}>
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView>
      <View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor={'#929292'}
            autoCapitalize={'none'}
          />
        </View>
        {/* <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor={'#929292'}
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor={'#929292'}
            autoCapitalize={'none'}
          />
        </View> */}
        <View style={[styles.inputStyle, styles.inputMargin]}>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor={'#929292'}
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.inputStyle]}>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={'#929292'}
            autoCapitalize={'none'}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            disabled={loading}
            onPress={function() {
              signUpWithEmail()
              setModalVisible(!modalVisible)
              // navigation.navigate('ProfilePage')
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%',
    paddingTop: 150,
    flex: 1
  },
  inputStyle: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'stretch',
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    paddingLeft: 50,
    width: '80%',
    height: 45,
  },
  inputText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMargin: {
    marginBottom: 20
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
    height: 45,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
