import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import useAuth from '../../hooks/useAuth';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export const Router = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
