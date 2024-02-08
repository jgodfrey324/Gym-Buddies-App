import { View, TextInput, StyleSheet, Text } from 'react-native'
import { useUserContext } from '../../../context/context'
import { SelectList } from 'react-native-dropdown-select-list'


export default function Slide4 () {
    const { age, setAge, weight, setWeight, sex, setSex } = useUserContext()

    const sexData = [
        { key: 1, value: 'Male' },
        { key: 2, value: 'Female' },
        { key: 3, value: 'Prefer not to say' }
      ]

    return (
        <View style={styles.container}>
            <View style={styles.sideTextBox}>
                <Text style={styles.sideText}>
                    What are your demographics?
                </Text>
            </View>

            <View style={[styles.inputStyle, styles.inputMargin]}>
                <TextInput style={styles.inputText} placeholder="Age" placeholderTextColor="#929292" value={age || ''} onChangeText={(text) => setAge(text)} />
            </View>

            <View style={[styles.inputStyle, styles.inputMargin]}>
                <TextInput style={styles.inputText} placeholder="Weight (lbs)" placeholderTextColor="#929292" value={weight || ''} onChangeText={(text) => setWeight(text)} />
            </View>

            <View style={styles.inputMargin}>
                <SelectList
                setSelected={(key: number) => setSex(key)}
                data={sexData}
                save="key"
                search={false}
                placeholder='Sex'
                boxStyles={styles.selectBox}
                inputStyles={styles.selectInput}
                dropdownTextStyles={styles.inputText}
                dropdownStyles={styles.selectDropDownBox}
                />
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
    },
    selectBox: {
        borderRadius: 30,
        // padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'flex-start',
        backgroundColor: '#E1E1E1',
        width: '80%',
        fontSize: 18,
        borderColor: '#E1E1E1',
        // borderWidth: 0,
        // color: '#929292'
      },
      selectDropDownBox: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 25,
        borderColor: '#E1E1E1'
      },
      selectInput: {
        // backgroundColor: '#E1E1E1',
        fontSize: 18,
        color: '#242424',
        padding: 2,
        // paddingLeft: 5,
        // maxWidth: '90%'
      },
})
