import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Input } from 'react-native-elements';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={{ borderTopLeftRadius: 20 }}>
      {/* <View>
        <AuthBanner />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '85%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    backgroundColor: 'green',
    borderTopLeftRadius: 50
  },
  verticallySpaced: {
    marginTop: 50,
    padding: 10,
    // paddingBottom: 4,
    alignSelf: 'stretch',
    borderWidth: 5,
    borderColor: 'red',
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
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
    marginTop: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
