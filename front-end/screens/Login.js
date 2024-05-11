import { useState } from 'react';
import { View, TextInput,ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import {style} from '../css/styles'
import { useUserContext } from '../contexts/userProvider';



export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { user, updateUser, removeUser } = useUserContext();

  const handleLogin = async () => {
    const requestBody = {
      username: username,
      password: password,
    };    

    fetch('http://172.22.30.84:3000/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');          
        }
      })
      .then(data => {
        console.log(data);   
        updateUserData(data);    
        navigation.navigate('Main');
      })
      .catch(error => {
        console.error(error);
        ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
      });
  };

  const updateUserData = (data) => {    
    updateUser({ data: data, username: username });
    navigation.navigate('Main');
  };

  return (
    <View style={style.defaultContainer}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button style={style.defaultButton} mode="contained" onPress={handleLogin}>Login </Button> 
    </View>
  );
}

export default Login;