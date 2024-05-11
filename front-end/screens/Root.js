import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Button } from 'react-native-paper';
import {style} from '../css/styles'
export function Root() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={style.defaultContainer}>
      <Button style={style.defaultButton}mode="contained" title="Login" onPress={handleLogin}> Login </Button>
      <Button style={style.defaultButton}mode="contained" title="Register" onPress={handleRegister}> Register</Button>
    </View>
  );
}

export default Root;