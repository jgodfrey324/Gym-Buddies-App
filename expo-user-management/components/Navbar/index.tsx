import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NavBar() {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navText}>Group</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navText}>Workouts</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        paddingVertical: 30,
        position: 'absolute',
        bottom: 0,
        borderWidth: 1,
        borderColor: 'black',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        fontSize: 16,
    },
    divider: {
        height: '200%',
        width: 1,
        backgroundColor: '#929292',
    },
});
