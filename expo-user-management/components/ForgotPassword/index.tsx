import { Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'


export default function ForgotPassword() {
    return (
        <View style={styles.container} >
            <Text>
                This is forgot password page
            </Text>
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
})
