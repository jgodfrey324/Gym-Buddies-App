import 'react-native-url-polyfill/auto'
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { View } from 'react-native';
import HomeScreen from './components/HomeScreen'
import Account from './components/Signup/Account';
import { Session } from '@supabase/supabase-js'
import Auth from './components/Signup/Auth';
import ProfilePage from './components/ProfilePage';
import { UserProvider } from './context/context';
import NavBar from './components/Navbar';
import FinishSignUp from './components/ProfilePage/FinishSignUp';
import Groups from './components/Groups';
import Workouts from './components/Workouts';

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

  console.log(session)

  // if (session) return (
  //   <UserProvider>
  //     <View>
  //       <ProfilePage key={session.user.id} session={session} />
  //       <NavBar />
  //     </View>
  //   </UserProvider>
  // )

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: '#c7c588',
          height: "8%",
          paddingBottom: 10,
        },
        tabBarActiveTintColor: 'white',
      }}>
        <Tab.Screen name="Groups" component={Groups} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={"white"} size={size} />
          ),
          // change button text color
          }
        }
        />
        <Tab.Screen name="Workouts" component={Workouts} options={{ headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="weight-lifter" color={"white"} size={size} />
        )}} />
        <Tab.Screen name="Profile" options={{ headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={"white"} size={size} />
        )
        }}>
          { () => <ProfilePage session={session} /> }
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={`${session ? 'ProfilePage' : 'HomeScreen'}`}
          >
            {session ? (
              <>
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{headerShown: false}} />
              </>
            ) : (
              <>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
              </>
            )}
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />   */}



            {/* <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}
            {/* couldn't tell you why it's still red here, something about session but i don't understand */}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
  )
}
