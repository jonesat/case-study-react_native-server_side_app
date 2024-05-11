import { useState } from 'react';
import { View, TextInput,ToastAndroid } from 'react-native';
import {Button} from 'react-native-paper'
import { useNavigation } from "@react-navigation/core";
import {style} from '../css/styles'

export function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navi = useNavigation();  

  const handleRegister = () => {
    const requestBody = {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName
    };

    fetch('http://172.22.30.84:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then(data => {
        console.log(data);
        navi.push('Root', { user: data });
      })
      .catch(error => {
        console.error(error);
        ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.SHORT);
      });
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
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <Button style={style.defaultButton} mode="contained" onPress={handleRegister}>Register </Button> 
    </View>
  );
};

export default Register;