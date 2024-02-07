import { View, Text, StyleSheet } from "react-native"

export default function RecentWorkouts () {

    return (
        <View>
            <Text style={styles.header}>
                Recent Workouts
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: '400',
        padding: 20
    }
})
