import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import colors from './assets/styles/colors';
import PagerView from 'react-native-pager-view';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import IntroScreen from './src/screens/onboarding/IntroScreen';
import OnBoardingScreen from './src/screens/onboarding/OnBoardingScreen';
import SignUpScreen from './src/screens/onboarding/SignUpScreen';
import { ImageBackground } from 'react-native';
const Tab = createBottomTabNavigator();

/*
To add the welcome screens
- create two new components
1. the first component will house the main app component
2. the second component will house the onboarding screens

- the app will check in local storage to see if the user has already been onboarded, if not the app will render the onboarding screens, after onboarding the app will render the main app
- if the user has already been onboarded, the app will render the main app
*/

export default function App() {
  const [onBoarded, setOnBoarded] = useState(false);
  const [gettingOnBoardingStatus, setGettingOnBoardingStatus] = useState(true);

  useEffect(() => {
    getOnBoardingStatus();
  }, []);

  const getOnBoardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('onBoardingStatus');
      if (value !== null) {
        setOnBoarded(value);
      }
      else {
        setOnBoarded(false);
      }
      setGettingOnBoardingStatus(false);
    } catch (e) {
      console.log(e);
    }
    console.log(onBoarded);
  }
  const handleFinishOnBoarding = () => {
    console.log('finished onboarding');
    setOnBoarded(true);
  }
  return (
    <>
      {gettingOnBoardingStatus && <Text>Loading</Text>}
      {
        onBoarded ? <MainApp /> : <OnBoarding onFinishOnBoarding={handleFinishOnBoarding} />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.primary
  }
});



function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Discover" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const MainApp = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
const OnBoarding = ({ onFinishOnBoarding }) => {
  const pagerRef = useRef(null);
  const [curPage, setCurPage] = useState(0);

  const onNextClicked = () => {
    if (pagerRef.current) {
      // const nextPage = pagerRef.current.props.initialPage + 1;
      setCurPage(curPage + 1);
      pagerRef.current.setPage(curPage);
      console.log(curPage);
    }
  }
  return (
    <>
      <PagerView ref={pagerRef} initialPage={0} style={{ flex: 1 }}>
        <View key={0}>
          <IntroScreen onNextClicked={onNextClicked} />
        </View>
        <View key={1}>
          <OnBoardingScreen onNextClicked={onNextClicked} />
        </View>
        <View key={2}>
          <SignUpScreen onNextClicked={onNextClicked} />
        </View>
        <View key={3} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <ImageBackground source={require('./assets/images/Haliaeetus_vocifer_-Cape_Maclear_Malawi_-fishing-8b.jpg')} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>Congratulations on signing up!</Text>
              <TouchableOpacity onPress={onFinishOnBoarding} style={{ backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Finish Onboarding</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

      </PagerView>
    </>
  );
}

