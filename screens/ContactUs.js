import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader'

const ContactUs = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.headerView}>
      <CustomHeader title={'Contact Us'}  onPress={()=>navigation?.toggleDrawer()}/>
    </View>
    </View>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  headerView:{
    width:'90%',
    paddingTop:20,
  }
})