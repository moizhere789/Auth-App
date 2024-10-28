import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PrimaryButton = ({onPress,title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    btn:{
        width:'90%',
        borderRadius:10,
        height:55,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0459E0'
    },
    btnText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'600'
    }
})