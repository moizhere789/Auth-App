import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';


const CustomHeader = ({title,onPress,goBack}) => {
  return (
    <>
    {onPress && (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
        <Feather name="menu" size={28} color="black" />
        </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
    </View>
    )}

    {goBack && (
            <View style={styles.headerView}>
                <TouchableOpacity onPress={goBack}>
                <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
            <Text style={styles.backHeaderText}>{title}</Text>
        </View>
    )}

    {!goBack && !onPress && (
            <View style={styles.headerView}>
            <Text style={styles.BottomHeaderText}>{title}</Text>
        </View>
    )}
    
    </>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    headerText:{
        width:'93%',
        textAlign:'center',
        fontSize:25,
        fontWeight:'600',
        paddingRight:20
    },
    headerView:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
    },
    BottomHeaderText:{
        width:'100%',
        fontSize:25,
        fontWeight:'600',
        textAlign:'center'
    },
    backHeaderText:{
        width:'85%',
        fontSize:25,
        fontWeight:'600',
        textAlign:'center'
    }
})