import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen'
import BottomNavigator from './BottomNavigator';
import DrawerNavigator from './DrawerNavigator';
import MyAccount from '../screens/MyAccount';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
    <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='SignupScreen' component={SignupScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator}/>
        <Stack.Screen name='MyAccount' component={MyAccount}/>
    </Stack.Navigator>
    </>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})