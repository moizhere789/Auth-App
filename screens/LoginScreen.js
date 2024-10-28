import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ActivityIndicator, Keyboard,TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useState } from 'react';
import InputFeild from '../components/InputFeild';
import PrimaryButton from '../components/PrimaryButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters').nonempty('Password is required'),
});

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Clear error when typing in email
    const handleEmailChange = (value) => {
        setEmail(value);
        if (errors.email) {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
    };

    // Clear error when typing in password
    const handlePasswordChange = (value) => {
        setPassword(value);
        if (errors.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        setLoading(true);
        setErrors({});

        const validationResult = loginSchema.safeParse({ email, password });

        if (!validationResult.success) {
            const fieldErrors = {};
            validationResult.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showSuccess();
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigation?.replace('DrawerNavigator');
            }, 500);
        } catch (error) {
            setLoading(false);
            handleError(error);
        }
        finally{
            setLoading(false)
        }
    };

    const handleError = (error) => {
        if (error.code === 'auth/wrong-password') {
            showError('Incorrect password');
        } else if (error.code === 'auth/user-not-found') {
            showError('User not found');
        } else {
            showError(error.message);
        }
    };

    const showSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Yay!',
            text2: 'Signed in successfully',
        });
    };

    const showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: message || 'Please try again',
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flex:1}}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image source={require('../assets/images/logo.jpg')} style={styles.image} />
                </View>
                <View style={styles.formView}>
                    <Text style={styles.loginText}>Log In</Text>
                    <InputFeild
                        email={'email'}
                        placeholder={'Enter Your Email'}
                        keyboardType={'email'}
                        value={email}
                        onChangeText={handleEmailChange} // Use handleEmailChange to clear error
                        error={errors.email}
                    />
                    <InputFeild
                        lock={'lock'}
                        placeholder={'Enter Your Password'}
                        keyboardType={'password'}
                        eye={'eye'}
                        eyewithline={'eye-with-line'}
                        value={password}
                        onChangeText={handlePasswordChange} // Use handlePasswordChange to clear error
                        error={errors.password}
                    />
                    <PrimaryButton title={'Login'} onPress={handleLogin} />

                    <View style={styles.donthaveView}>
                        <Text style={styles.dontText}>Don't Have An Account?</Text>
                        <TouchableOpacity onPress={() => navigation?.navigate('SignupScreen')}>
                            <Text style={styles.signupText}>Sign Up</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 100,
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
        gap: 10,
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
        fontSize: 16,
    },
    dontText: {
        fontSize: 15,
        fontWeight: '450',
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
