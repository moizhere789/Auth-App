import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer';
import ContactUs from '../screens/ContactUs'
import Faq from '../screens/Faq'
import Help from '../screens/Help'
import BottomNavigator from './BottomNavigator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false,drawerActiveBackgroundColor:'rgba(39, 80, 225, 0.16)',
    drawerActiveTintColor:'#2750E1',drawerItemStyle:{borderRadius:10,}}}drawerContent={(props)=> <CustomDrawer{...props}/>}>

        <Drawer.Screen name='HOME' component={BottomNavigator} options={{drawerIcon:({size,color})=>(
            <FontAwesome name="home" size={size} color={color} />
        )}}/>
        <Drawer.Screen name='FAQ' component={Faq} options={{drawerIcon:({size,color})=>(
           <AntDesign name="infocirlce" size={size} color={color} />
        )}}/>
        <Drawer.Screen name='HELP' component={Help} options={{drawerIcon:({size,color})=>(
            <AntDesign name="questioncircle" size={size} color={color} />
        )}}/>
        <Drawer.Screen name='CONTACT US' component={ContactUs} options={{drawerIcon:({size,color})=>(
            <AntDesign name="customerservice" size={size} color={color} />
        )}}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator