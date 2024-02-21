import { useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  TextInput
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import GroupCard from './GroupCard'
import { useUserContext } from '../../context/context'
import { colors } from '../../colors'
import { supabase } from '../../lib/supabase'


export default function Groups() {
  const { height: windowHeight } = useWindowDimensions();
  const { groups, setGroups } = useUserContext();
  const [groupName, setGroupName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const renderModal = () => {
    if (showModal) {
      return (
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%'}}>
            <Text style={{width: 15, position: 'absolute', right: 15, top: 5, fontSize: 20}} onPress={() => setShowModal(false)}>X</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Create a Group</Text>
            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 10}}>Group Name</Text>
              <TextInput
                style={{borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5}}
                onChangeText={text => setGroupName(text)}
                value={groupName}
              />
            </View>
            <TouchableOpacity
              onPress={addGroup}
              style={{backgroundColor: 'black', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'white'}}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  const addGroup = async () => {
    const { data, error } = await supabase
    .from('groups')
    .insert([
      { group_name: groupName}
    ])
    .select()

    if (error) console.log('error', error)
    else {
      setGroups([...groups, data[0]])
      setShowModal(false)
    }
  }

  // need to style modal

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
        {groups.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))}
      </View>
      <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={{
        position: 'absolute',
        bottom: windowHeight * 0.15,
        right: 20,
        backgroundColor: "#c7c588",
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}>
        <Text>+</Text>
      </TouchableOpacity>
      {renderModal()}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  // account for the devices status bar depending on the platform
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  createGroup: {
    position: 'absolute',
    // bottom: height * 0.1,
    right: 20,
    backgroundColor: "#c7c588",
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
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
