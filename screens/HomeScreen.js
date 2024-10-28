import {StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.config'; // Adjust the import path as necessary
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { firestore } from '../firebase.config'; // Import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';
import CustomHeader from '../components/CustomHeader';

const HomeScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

   // Function to fetch user data from Firestore
   const fetchUserData = async () => {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User is not authenticated');
        }

        const q = query(collection(firestore, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            showError('No user data found.');
            return;
        }

        // Set user data from Firestore
        querySnapshot.forEach((doc) => {
            setUserData(doc.data());
        });
    } catch (error) {
        showError(error.message);
    }
};

// Call fetchUserData when the component mounts
useEffect(() => {
    fetchUserData();
}, []);

    const showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: message || 'Please try again',
        });
    };


    return (
        <View style={styles.container}>
          <View style={styles.headerView}>
          <CustomHeader onPress={()=>navigation?.toggleDrawer()} title={'Home'}/>
          </View>
          <View style={styles.nameView}>
                <Text style={styles.nameText}>Hello, {userData?.firstname}!</Text>
                </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: 'skyblue',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    nameView:{
      width:'90%',
      paddingTop:30,
    //   backgroundColor:'red'
    },
    headerView:{
      width:'90%',
      alignItems:'center',
      paddingTop:20
    },
    nameText:{
        fontSize:16,
        color:'#706E6E',
        fontWeight:'500'
    }
});
