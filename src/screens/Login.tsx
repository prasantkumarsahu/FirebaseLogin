import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// React Native Styling Elements

// Context API

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {AuthStackParamList} from '../routes/AuthStack';

import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

GoogleSignin.configure({
  webClientId:
    '115883804429-9n59qaq0f4qc0as9m7d83402rpitgfv2.apps.googleusercontent.com',
});

export const Login = ({navigation}: LoginScreenProps) => {
  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const idToken = (await GoogleSignin.signIn()).data?.idToken;
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      return signInWithCredential(auth, googleCredentials);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Firebase Auth 🔥</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={handleGoogleLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png',
            }}
            style={styles.googleLogo}
          />
          <Text style={styles.btnText}>Login with Google</Text>
        </Pressable>

        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    color: '#000000',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,
    flexDirection: 'row', // Added for horizontal layout of logo and text
    alignItems: 'center', // Center content vertically
    justifyContent: 'center', // Center content horizontally
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10, // Space between the logo and text
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});
