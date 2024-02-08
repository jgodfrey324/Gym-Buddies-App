import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useUserContext } from '../../../context/context'


export default function Slide2 () {
    const { nickname, setNickname, firstName, setFirstName, lastName, setLastName } = useUserContext()

    return (
        <View style={styles.container}>
            <View style={styles.sideTextBox}>
                <Text style={styles.sideText}>
                    What do you like to be called?
                </Text>
            </View>

            <View style={[styles.inputStyle, styles.inputMargin]}>
                <TextInput style={styles.inputText} placeholder="Nickname" placeholderTextColor="#929292" value={nickname || ''} onChangeText={(text) => setNickname(text)} />
            </View>

            <View style={[styles.inputStyle, styles.inputMargin]}>
                <TextInput style={styles.inputText} placeholder="First name" placeholderTextColor="#929292" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
            </View>

            <View style={[styles.inputStyle, styles.inputMargin]}>
                <TextInput style={styles.inputText} placeholder="Last name" placeholderTextColor="#929292" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50%'
    },
    sideTextBox: {
        marginBottom: 10,
        marginLeft: 50,
    },
    sideText: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    inputStyle: {
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'stretch',
        backgroundColor: '#E1E1E1',
        borderRadius: 50,
        paddingLeft: 22,
        width: '80%',
    },
    inputMargin: {
        marginBottom: 10
    },
    inputText: {
        fontSize: 18,
        color: '#242424'
    }
})
