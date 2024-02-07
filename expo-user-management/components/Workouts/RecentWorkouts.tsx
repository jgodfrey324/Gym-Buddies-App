import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"

export default function RecentWorkouts () {
    const [loading, setLoading] = useState(true)


    async function getUserWorkouts() {
        // try {
        //     setLoading(true)
        //     if (!session?.user) {
        //     // console.log('there isn\'t a session user')
        //         throw new Error('No user on the session!')
        //     }

        //     const { data, error, status } = await supabase
        //     .from('profiles')
        //     .select(`nickname, first_name, last_name, age, weight`)
        //     .eq('id', session?.user.id)
        //     .single()
        //     if (error && status !== 406) {
        //         console.log('error', error)
        //         throw error
        //     }

        //     if (data) {
        //         setNickname(data.nickname)
        //         setFirstName(data.first_name)
        //         setLastName(data.last_name)
        //         setAge(data.age)
        //         setWeight(data.weight)
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         Alert.alert(error.message)
        //     }
        // } finally {
        //     setLoading(false)
        // }
    }


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
