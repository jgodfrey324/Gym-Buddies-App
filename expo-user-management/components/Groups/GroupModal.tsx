import { useState, useEffect} from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements'
import UserSearch from '../UserSearch';
import { supabase } from '../../lib/supabase';
interface GroupModalProps {
  currentGroup: object,
  closeGroupModal: boolean,
  setCloseGroupModal: Function,
  setCurrentGroup: Function
}

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export default function GroupModal({ currentGroup, closeGroupModal, setCloseGroupModal, setCurrentGroup }: GroupModalProps) {
  const [showModal, setShowModal] = useState(false)
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const { data, error } = await supabase
    .from('groups_profiles')
    .select('user_id')
    .eq('group_id', currentGroup.id)

    if (error) console.log('error', error)
    else {
      const userIds = data.map(user => user.user_id)
      fetchUsers(userIds)
    }
  }

  const fetchUsers = async (userIds: readonly unknown[]) => {
    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .in('id', userIds)

    if (error) console.log('error', error)
    else {
      console.log('users', data)
      setMembers(data)
    }
  }

  const { group_name } = currentGroup

  const handleCloseModal = () => {
    setCloseGroupModal(true)
    setCurrentGroup({})
  }

  if (closeGroupModal) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleCloseModal}>
        <Icon name='close' type='ionicon' style={styles.closeModal}/>
      </TouchableOpacity>
      <Text style={styles.groupName}>{group_name}</Text>
      <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={{
        width: 100,
        backgroundColor: "#c7c588",
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}>
        <Text>invite</Text>
      </TouchableOpacity>
      <UserSearch
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '110%',
    marginTop: statusBarHeight,
    zIndex: 1,
    flex: 1
  },
  closeModal: {
    display: 'flex',
    alignSelf: 'flex-end',
    fontSize: 20,
    marginRight: 20,
    marginTop: 5
  },
  groupName: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  }
})
