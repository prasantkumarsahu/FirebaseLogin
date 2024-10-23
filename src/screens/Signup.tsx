import React, {useState} from 'react';
import {
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
  createUserWithEmailAndPassword,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {AuthStackParamList} from '../routes/AuthStack';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const Signup = ({navigation}: SignupScreenProps) => {
  const [error, setError] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSignup = async () => {
    if (name && email && password && repeatPassword) {
      if (password === repeatPassword) {
        try {
          const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email.toLowerCase(),
            password,
          );
          await updateProfile(userCredentials.user, {displayName: name});
          await userCredentials.user.reload();
          console.log('User profile updated with name:', name);
        } catch (error: any) {
          console.log('Signup Error:', error.message);
        }
      } else {
        setError('Passwords do not match');
      }
    } else {
      setError('All fields are required');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Name */}
        <TextInput
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        />

        {/* Email */}
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Repeat password */}
        <TextInput
          secureTextEntry
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repeat Password"
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Signup button */}
        <Pressable
          onPress={handleSignup}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Login</Text>
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
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});
