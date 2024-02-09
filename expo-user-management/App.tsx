import 'react-native-url-polyfill/auto'
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react'


import HomeScreen from './components/HomeScreen'
import Auth from './components/Signup/Auth';
import ProfilePage from './components/ProfilePage';
import Groups from './components/Groups';
import Workouts from './components/Workouts';
import { UserProvider } from './context/context';


import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'


import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions // optional
} from 'react-native-animated-nav-tab-bar';






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





  const Stack = createNativeStackNavigator();
  const Tabs = AnimatedTabBarNavigator();




  const BottomTabs = () => {
    return (
      <Tabs.Navigator
      appearance={{
        whenInactiveShow: "icon-only",
        whenActiveShow: 'label-only',
        dotCornerRadius: 25,
        floating: true,
        // dotSize: 'large'
        shadow: true,
        tabBarBackground: '#242424',
        // #3C3C3C
        // activeColors: '#242424'
        activeTabBackgrounds: '#c7c588',
        activeColors: '#242424'
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#c7c588',
          height: "10%",
          paddingBottom: 20,
          shadowColor: "#242424",
          shadowOpacity: 0.8,
          shadowRadius: 10,
          shadowOffset: {
            height: 1,
            width: 1
          }
        },
        tabBarActiveTintColor: 'white',
        // #242424
        tabBarLabelStyle: {
          fontSize: 18,
        },
        tabBarItemStyle: {
          borderLeftWidth: 1,
          // borderRightWidth: 1,
          // borderRightColor: 'blue',
          borderLeftColor: '#D9D9D9',
          marginTop: 6,
          height: '100%',
        }
      }}>
        <Tabs.Screen name="Groups" component={Groups} options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
            name="account-group" color={'#c7c588'} size={35} />
          ),
          // change button text color
          }
        }
        />
        <Tabs.Screen name="Workouts" component={Workouts} options={{ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
          name="weight-lifter" color={'#c7c588'} size={35} />
        )}} />
        <Tabs.Screen name="Profile" options={{ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
          name="account" color={'#c7c588'} size={35} />
        )
        }}>
          { () => <ProfilePage session={session} /> }
        </Tabs.Screen>
      </Tabs.Navigator>
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
