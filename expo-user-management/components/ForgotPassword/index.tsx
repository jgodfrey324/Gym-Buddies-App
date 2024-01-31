import React, { useState } from 'react';
import { Text } from 'react-native-elements'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container} >
            <Text style={styles.headingText}>
                Forgot password?
            </Text>
            <Text style={styles.pText}>
                Enter your email, and we'll send you a link to reset your password
            </Text>
            <View style={styles.inputStyle} >
                <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={'#929292'}
                        autoCapitalize={'none'}
                        style={styles.inputText}
                />
            </View>
            <TouchableOpacity
                    style={styles.customButton}
                    disabled={loading}
                    // onPress={() => signInWithEmail()}
            >
                <Text style={styles.buttonText}>Send Link</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: '100%',
        paddingTop: 150,
    },
    headingText: {
        fontSize: 35,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 15
    },
    pText: {
        fontSize: 18,
        width: '75%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 55
    },
    inputText: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 30,
        height: 45

      },
      buttonText: {
        color: 'white',
        fontSize: 18,
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
})
