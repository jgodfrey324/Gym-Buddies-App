import 'react-native-url-polyfill/auto'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { View } from 'react-native';
import HomeScreen from './components/HomeScreen'
import Account from './components/Signup/Account';
import { Session } from '@supabase/supabase-js'
import Auth from './components/Signup/Auth';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])



  if (session && session.user) {
    return (
      <View>
        <Account key={session.user.id} session={session} />
      </View>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
