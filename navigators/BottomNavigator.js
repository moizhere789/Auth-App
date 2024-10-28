import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Bottom = createBottomTabNavigator();
console.log(Bottom)

const BottomNavigator = () => {
  return (
    <Bottom.Navigator screenOptions={{headerShown:false, tabBarStyle:{height:60,borderTopLeftRadius:20,borderTopRightRadius:20},
     tabBarShowLabel:false,tabBarItemStyle:{borderRadius: 20, margin:10},
     tabBarActiveBackgroundColor:'rgba(39, 80, 225, 0.16)',tabBarActiveTintColor:'#2750E1'}}>

        <Bottom.Screen name='HomeScreen' component={HomeScreen} options={{tabBarIcon:({color})=>(
            <FontAwesome name="home" size={30} color={color} />
        )}}/>

        <Bottom.Screen name='NotificationScreen' component={NotificationScreen} options={{tabBarIcon:({color})=>(
            <Ionicons name="notifications" size={30} color={color} />
        )}}/>

        <Bottom.Screen name='ProfileScreen' component={ProfileScreen} options={{tabBarIcon:({color})=>(
            <FontAwesome5 name="user-circle" size={30} color={color} />
        )}}/>

    </Bottom.Navigator>
  )
}

export default BottomNavigator