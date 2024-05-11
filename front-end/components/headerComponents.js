import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions} from 'react-native';
import {Button} from 'react-native-paper'
import {NavigationContainer,DefaultTheme, useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


import {style} from '../css/styles';
import {BottomTabNavigator} from '../navigation/BottomTabNavigator';
import NewScreen from '../screens/NewScreen'
import {BodyText,Headline,HeadlineText,HeadlineImage,TestButton} from '../components/week6';
import {createMyStackNavigator} from "../screens/SearchPage"
import { useUserContext } from '../contexts/userProvider';



export const HeroImg = (props)=>{    
    return(
        <View style={style.container} >                
            <Image style={{width: props.window.width, height:props.window.height*0.07, marginRight:10}} source={require('../assets/hero.jpg')}/>              
        </View>
    )
  }

export const HeaderButtons = ()=>{
    const navi = useNavigation()
    const { user, updateUser, removeUser } = useUserContext();

    
    const handleLogout=()=>{
        removeUser();
        navi.navigate('Root')
    }

    return(
    <View style={style.headerRight} >        
        <Button mode="contained" style={{marginLeft:10}} onPress={handleLogout}> Log Out </Button>
    </View>
)}