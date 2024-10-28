import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet,
     Text, TouchableOpacity, View,Keyboard,TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputFeild from '../components/InputFeild';
import PrimaryButton from '../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { z } from 'zod';
import { doc, setDoc, collection } from 'firebase/firestore'; // Import necessary Firestore functions
import { firestore } from '../firebase.config'; // Ensure you're importing your Firestore instance
  

// Define the Zod schema for signup
const signupSchema = z.object({
    firstname: z.string().nonempty('First name is required*'),
    lastname: z.string().nonempty('Last name is required*'),
    email: z.string().email('Invalid email address').nonempty('Email is required*'),
    password: z.string().min(8, 'Password must be at least 8 characters*').nonempty('Password is required*'),
    cpassword: z.string().min(8, 'Confirm password must be at least 8 characters*').nonempty('Confirm password is required*'),
}).refine((data) => data.password === data.cpassword, {
    message: "Passwords does not match",
    path: ['cpassword'],
});

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // State for holding validation errors

    const handleSignup = async () => {
        Keyboard.dismiss();
        setLoading(true); // Start loading
        setErrors({}); // Clear previous errors

        const validationResult = signupSchema.safeParse({ firstname, lastname, email, password, cpassword });

        if (!validationResult.success) {
            const fieldErrors = {};
            validationResult.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message; // Set error message for corresponding field
            });
            setErrors(fieldErrors); // Set errors to state
            setLoading(false); // Stop loading
            return;
        }

        try {
           const userCredential = await  createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(collection(firestore, 'users'), user.uid), {
                firstname,
                lastname,
                email,
                createdAt: new Date(), // You can store additional info if needed
            });
            showSuccess();
            // Reset form fields
            setEmail('');
            setPassword('');
            setCpassword('');
            setFirstname('');
            setLastname('');
            // Optionally delay navigation to show success message
            setTimeout(() => {
                navigation?.replace('DrawerNavigator');
            }, 500);
        } catch (error) {
            // showError(getErrorMessage(error));
            console.log(getErrorMessage(error))
        } finally {
            setLoading(false); // Stop loading at the end
        }
    };

    const getErrorMessage = (error) => {
        if (error.code === 'auth/email-already-in-use') {
            return 'This email address is already registered.';
        }
        return error.message; // General error message
    };

    const showSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'User Created Successfully',
            text2: 'You Can Now Login',
        });
    };

    const showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: message || 'Please Try Again',
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
                <View style={styles.container}>
                    <View style={styles.imageView}>
                        <Image source={require('../assets/images/logo.jpg')} style={styles.image} />
                    </View>
                    <View style={styles.formView}>
                        <Text style={styles.loginText}>Sign Up</Text>
                        <View style={styles.nameView}>
                        <InputFeild
                        placeholder={'First Name'}
                         keyboardType={'default'}
                        value={firstname}
                         onChangeText={setFirstname}
                         error={errors.firstname} // Pass error message
                        />
                        <InputFeild
                            placeholder={'Last Name'}
                            keyboardType={'default'}
                            value={lastname}
                            onChangeText={setLastname}
                            error={errors.lastname} // Pass error message
                        />
                         </View>
                        <InputFeild
                            email={'email'}
                            placeholder={'Enter Your Email'}
                            keyboardType={'email'}
                            value={email}
                            onChangeText={setEmail}
                            error={errors.email} // Pass error message
                        />
                        <InputFeild
                            lock={'lock'}
                            placeholder={'Enter Your Password'}
                            keyboardType={'password'}
                            eye={'eye'}
                            eyewithline={'eye-with-line'}
                            value={password}
                            onChangeText={setPassword}
                            error={errors.password} // Pass error message
                        />
                        <InputFeild
                            lock={'lock'}
                            placeholder={'Confirm Password'}
                            keyboardType={'password'}
                            eye={'eye'}
                            eyewithline={'eye-with-line'}
                            value={cpassword}
                            onChangeText={setCpassword}
                            error={errors.cpassword} // Pass error message
                        />
                        <PrimaryButton title={'Sign Up'} onPress={handleSignup} />

                        <View style={styles.donthaveView}>
                            <Text style={styles.dontText}>Already Have An Account?</Text>
                            <TouchableOpacity onPress={() => navigation?.navigate('LoginScreen')}>
                                <Text style={styles.signupText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loading && (
                        <View style={styles.indicatorView}>
                            <ActivityIndicator size={'large'} color={'green'} />
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 70,
    },
    imageView: {
        width: '90%',
        paddingTop: 20,
    },
    image: {
        width: '30%',
        height: 95,
        borderRadius: 100,
    },
    loginText: {
        fontSize: 25,
        fontWeight: '600',
        paddingBottom:20
    },
    formView: {
        width: '90%',
        backgroundColor: 'lightgrey',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        alignItems: 'center',
        paddingVertical: 50,
        gap: 10
    },
    donthaveView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '90%',
        gap: 5,
    },
    signupText: {
        color: '#0459E0',
        fontWeight: '600',
        fontSize: 15,
    },
    dontText: {
        fontSize: 15,
        fontWeight: '450',
    },
    nameView: {
        flexDirection: 'row',
        width: '73%',
        gap: 10,
        alignItems:'center',
        justifyContent:'center'
    },

    indicatorView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
});
