import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Input } from 'react-native-elements';

export default function SignInIndex() {

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
        <View style={styles.container}>
            <View style={[styles.inputStyle, styles.emailMargin]}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor={'#929292'}
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.inputStyle]}>
                <TextInput

                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor={'#929292'}
                    autoCapitalize={'none'}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.customButton}
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.password}>
                <Text>Forgot Password?</Text>
            </View>
            <View style={styles.signup}>
                <Text>Don't have an account? Sign Up</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: '100%',
      paddingTop: 150,
    },
    inputStyle: {
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignSelf: 'stretch',
      backgroundColor: '#E1E1E1',
      borderRadius: 50,
      paddingLeft: 50,
      width: '85%',
    },
    emailMargin: {
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
      width: '85%',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    password: {
       marginLeft: 'auto',
       marginRight: 'auto',
       marginTop: 20
    },
    signup: {
       marginLeft: 'auto',
       marginRight: 'auto',
       marginTop: 150
    }
  });
