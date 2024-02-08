import { View, StyleSheet } from 'react-native'
import ImagePickerComp from '../ImagePickerComp'

export default function Slide3 () {

    return (
        <View style={styles.imagePickerButton}>
          <ImagePickerComp />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePickerButton: {
        alignItems: 'center',
        marginTop: '50%'
    }
})
