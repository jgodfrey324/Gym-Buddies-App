import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
// import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SignInProps } from '../../types';

export default function SignInIndex({ setModalState }: SignInProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message)
        else navigation.navigate('ProfilePage')
        setLoading(false);
    }

    // async function signUpWithEmail() {
    //     setLoading(true);
    //     const {
    //         data: { session },
    //         error,
    //     } = await supabase.auth.signUp({
    //         email: email,
    //         password: password,
    //     });

    //     if (error) Alert.alert(error.message);
    //     if (!session) Alert.alert('Please check your inbox for email verification!');
    //     setLoading(false);
    // }


    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <View style={[styles.inputStyle, styles.emailMargin]}>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={'#929292'}
                        autoCapitalize={'none'}
                        style={styles.inputText}
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
                        style={styles.inputText}
                    />
                </View>
                <TouchableOpacity
                    style={styles.customButton}
                    disabled={loading}
                    onPress={() => {
                        signInWithEmail()
                        // navigation.navigate("ProfilePage")
                    }}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <View style={styles.password}>
                    <Text
                        onPress={() => setModalState('forgot password')}
                        style={styles.smallText}
                    >
                        Forgot Password?
                    </Text>
                </View>
                <View style={styles.switchModalViewHouse}>
                    <Text style={styles.switchModalViewText}>Don't have an account? </Text>
                    <Text onPress={() => setModalState('sign up')} style={styles.signUpText}>
                        Sign up
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      height: '150%',
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
      height: 45
    },
    inputText: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center'
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
      width: '80%',
      marginTop: 40,
      height: 45
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    password: {
       marginLeft: 'auto',
       marginRight: 'auto',
       marginTop: 25,
    },
    smallText: {
        fontSize: 14,
        color: '#242424'
    },
    signUpText: {
      textDecorationStyle: 'solid',
      // textDecorationLine: 'underline',
      color: '#242424',
      alignSelf: 'baseline'
    },
    switchModalViewText: {
      color: '#929292',
      alignSelf: 'baseline'
    },
    switchModalViewHouse: {
      flexDirection: 'row',
      paddingTop: 20,
      // bottom: Platform.OS === 'ios' ? '90%' : '0%',
      alignSelf: 'center',
      zIndex: 2,
    },

  });
