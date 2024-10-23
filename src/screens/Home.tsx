import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

// React Native Styling Elements
import {FAB} from '@rneui/themed';

// Context API
import {signOut} from 'firebase/auth';
import {auth} from '../../config/firebase';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const {user} = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
      setUserEmail(user.email);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {userName && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userName}</Text>
            <Text style={styles.userDetails}>Email: {userEmail}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
