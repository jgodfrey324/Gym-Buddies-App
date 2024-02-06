import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function Settings () {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => supabase.auth.signOut()}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 50,
        height: '50%',
        borderRadius: 20,
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
        marginTop: 60,
        marginBottom: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})
