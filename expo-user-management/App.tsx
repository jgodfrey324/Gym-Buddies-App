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
import ProfilePage from './components/ProfilePage';
import { UserProvider } from './context/context';

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


  if (session) return (
    <UserProvider>
      <View>
        <ProfilePage key={session.user.id} session={session} />
      </View>
    </UserProvider>
  )

  const Stack = createNativeStackNavigator();

  return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Auth" component={Auth} />


            {/* <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}
            {/* couldn't tell you why it's still red here, something about session but i don't understand */}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
  )
}
