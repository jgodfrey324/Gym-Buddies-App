import { useState, useEffect } from 'react'
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
import RenderModal from './Modal'
import GroupModal from './GroupModal'
import { useUserContext } from '../../context/context'
import { colors } from '../../colors'
import { supabase } from '../../lib/supabase'


export default function Groups({ session }) {
  const { height: windowHeight } = useWindowDimensions();
  const { groups, setGroups } = useUserContext();
  const [groupName, setGroupName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [closeGroupModal, setCloseGroupModal] = useState(true);
  const [currentGroup, setCurrentGroup] = useState({});

  useEffect(() => {
    fetchGroupsProfiles()
  }, [])

  const fetchGroups = async (groupId) => {
    const { data, error } = await supabase
    .from('groups')
    .select('*')
    .in('id', groupId)

    if (error) console.log('error', error)
    else {
      setGroups(data)
    }
  }

  const fetchGroupsProfiles = async () => {
    const { data, error } = await supabase
    .from('groups_profiles')
    .select('group_id')
    .eq('user_id', session.user.id)

    if (error) console.log('error', error)
    else {
      const groupIds = data.map(group => group.group_id)
      fetchGroups(groupIds)
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
      addGroupProfile(data[0].id)
      setShowModal(false)
      setGroupName('')
    }
  }


  const addGroupProfile = async (groupId) => {
     const { data, error } = await supabase
      .from('groups_profiles')
      .insert([
        { group_id: groupId, user_id: session.user.id }
      ])

      if (error) console.log('group association error', error)
  }

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
          <GroupCard
            key={index}
            group={group}
            setCloseGroupModal={setCloseGroupModal}
            setCurrentGroup={setCurrentGroup}
          />
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

      <RenderModal
        showModal={showModal}
        addGroup={addGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        setShowModal={setShowModal}
      />

      <GroupModal
        closeGroupModal={closeGroupModal}
        setCloseGroupModal={setCloseGroupModal}
        currentGroup={currentGroup}
        setCurrentGroup={setCurrentGroup}
      />
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
