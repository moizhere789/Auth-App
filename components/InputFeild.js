import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const InputFeild = ({ email, placeholder, value, onChangeText, keyboardType, lock, eyewithline, eye, error }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <>
            {keyboardType && keyboardType === 'email' &&
            <>
                <View style={styles.container}>
                    <MaterialIcons name={email} size={24} color="#747474" />
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        style={styles.input}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.errorView}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
                </>
            }

            {keyboardType && keyboardType === 'password' &&
            <>
                <View style={styles.container}>
                    <MaterialIcons name={lock} size={24} color="#747474" />
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        style={styles.passwordinput}
                        autoCapitalize='none'
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={() => { setIsVisible(!isVisible); setIsPasswordVisible(!isPasswordVisible); }}>
                        <Entypo name={!isVisible ? eye : eyewithline} size={24} color="#747474" />
                    </TouchableOpacity>
                </View>
                <View style={styles.errorView}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
                </>
            }

            {keyboardType && keyboardType === 'default' &&
             <>
             <View style={{width:'60%',gap:10}}>
                <View style={styles.defaultcontainer}>
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        style={styles.defaultinput}
                    />
                </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
           </>
            }
        </>
    );
};

export default InputFeild;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 10,
        borderWidth: 0.7,
        borderColor: '#747474',
    },
    input: {
        width: '90%',
        height: 55,
        fontSize: 17,
    },
    passwordinput: {
        width: '75%',
        height: 55,
        fontSize: 17,
    },
    defaultcontainer: {
        width: '100%', // Changed to 90% for consistency
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 10,
        borderWidth: 0.7,
        borderColor: '#747474',
    },
    defaultinput: {
        width: '90%',
        height: 55,
        fontSize: 17,
    },

    errorText:{
      color:'red',
      paddingHorizontal:5
    },
    errorView:{
      width:'90%'
    }

});
