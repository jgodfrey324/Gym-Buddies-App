import React from 'react'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import GroupCard from './GroupCard'
import { useUserContext } from '../../context/context'
import { colors } from '../../colors'


export default function Groups() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperNav}>
        <View style={[styles.groups]}>
          <TouchableOpacity style={[styles.upperNavBtn]}>
            <Text style={styles.upperNavText}>Groups</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.leaderboard]}>
          <TouchableOpacity style={[styles.upperNavBtn]}>
            <Text style={styles.upperNavText}>Global Leaderboard</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <SearchBar
          placeholder="Search for a group"
          lightTheme
          round
          // inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: colors.background, borderBottomWidth: 0, padding: 20}}
        />
      </View>
      <View style={styles.groupsList}>
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  // account for the devices status bar depending on the platform
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  upperNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3C3C3C',
    // margin: 20,
  },
  groups: {
    backgroundColor: '#3C3C3C',
    borderRightColor: 'white',
    width: '50%',
    borderRightWidth: 1

  },
  leaderboard: {
    backgroundColor: '#3C3C3C',
    borderLeftColor: 'white',
    width: '50%'
  },
  upperNavBtn: {
    color: 'white',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperNavText: {
    color: 'white',
    fontSize: 18,
  },
  groupsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})
