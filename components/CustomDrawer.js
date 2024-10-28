import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../firebase.config'; 
import { firestore } from '../firebase.config'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const CustomDrawer = (props) => {
    const [userData, setUserData] = useState(null);
    const [imageUri, setImageUri] = useState(null); // Store image URI

    // Realtime listener to fetch user data
    const fetchUserData = () => {
        const user = auth.currentUser;

        if (!user) {
            console.log('User is not authenticated');
            return;
        }

        const q = query(collection(firestore, 'users'), where('email', '==', user.email));

        // Realtime listener for changes in Firestore
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setUserData(data);
                    setImageUri(data.profileImage || null); // Set the profile image if available
                });
            }
        });

        return unsubscribe; // Return unsubscribe function to clean up the listener
    };

    useEffect(() => {
        const unsubscribe = fetchUserData(); // Initialize listener on mount
        return unsubscribe; // Clean up listener on unmount
    }, []);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.nameText} numberOfLines={1}>
                    {userData?.firstname} {userData?.lastname}
                </Text>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <FontAwesome5 name="user" size={40} style={styles.placeholderImage} />
                        )}
                        </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    userInfoContainer: {
        paddingHorizontal: 20,
        paddingTop:10,
        paddingBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        // backgroundColor:'lightcyan'
    },
    nameText: {
        fontSize: 20,
        fontWeight: '600',
    },
    image: {
        width: '34%',
        height: 80,
        borderRadius: 50,
    },
    placeholderImage: {
        width: '33%',
        height: 80,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        lineHeight: 80,
        color: '#aaa',
    },
});
