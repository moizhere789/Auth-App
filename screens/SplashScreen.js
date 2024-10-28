import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({navigation}) => {
    useEffect(() => {
    
      setTimeout(() => {
        navigation?.replace('LoginScreen')
      },1000)
    }, [])
    
  return (
    <>
    <StatusBar backgroundColor={'lightcyan'}/>
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpg')} style={styles.image}/>
      <View style={styles.textView}>
      <Text style={styles.text}>Welcome!</Text>
      </View>
    </View>
    </>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightcyan'
    },
    image:{
        width:'80%',
        height:260,
        borderRadius:200
    },
    textView:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:80
    },
    text:{
        fontSize:30,
        fontWeight:'600'
    }
})