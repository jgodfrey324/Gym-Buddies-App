import { View, Text, Image, StyleSheet } from 'react-native'

export default function Slide1 () {
    return (
        <View style={styles.introTextHouse}>
            <View style={styles.introTextBox}>
                <Text style={styles.introText}>
                Congrats, you're all signed up!🥳
                </Text>
            </View>

            <View style={styles.tell}>
                <Text style={{fontSize: 15}}>Finish setting up your profile</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    introTextHouse: {
        // borderWidth: 2,
        // borderColor: 'red',
        marginTop: '70%'
    },
    introTextBox: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    introText: {
        fontSize: 22
    },
    tell: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        marginTop: 5
    }
})
