import { View, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { useUserContext } from '../../../context/context'

export default function Slide5 () {
    const { setAthleteType, setExperienceLevel } = useUserContext()

    const athleteData = [
        { key: 1, value: 'bodybuilding' },
        { key: 2, value: 'strength' },
        { key: 3, value: 'crossfit' },
        { key: 4, value: 'calisthenics' },
        { key: 5, value: 'wellness' },
        { key: 6, value: 'endurance' }
    ]
    const expData = [
        { key: 1, value: '0-3 years' },
        { key: 2, value: '4-6 years' },
        { key: 3, value: '7+ years' }
    ]


    return (
        <View style={styles.container}>
            <View style={styles.inputMargin}>
                <SelectList
                setSelected={(key: number) => setExperienceLevel(key)}
                data={expData}
                save="key"
                search={false}
                placeholder='How long have you been training?'
                boxStyles={styles.selectBox}
                inputStyles={styles.selectInput}
                dropdownTextStyles={styles.inputText}
                dropdownStyles={styles.selectDropDownBox}
                />
            </View>

            <View style={styles.inputMargin}>
                <SelectList
                setSelected={(key: number) => setAthleteType(key)}
                data={athleteData}
                save="key"
                search={false}
                placeholder='What type of athlete are you?'
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
