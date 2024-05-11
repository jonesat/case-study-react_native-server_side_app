import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import {style} from './css/styles';
import hero from "./assets/hero.jpg"
import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {BottomTabNavigator} from './navigation/BottomTabNavigator';
import Login from './screens/Login';
import Register from './screens/Register'
import Detail from './screens/BookDetail'
import Root from './screens/Root'
import {BodyText,Headline,HeadlineText,HeadlineImage,TestButton} from './components/week6';
import {createMyStackNavigator} from "./screens/SearchPage"

import { HeaderButtons,HeroImg } from './components/headerComponents';
// import {} from './components/week7';

import { LoggerProvider } from './contexts/loggerProvider';
import { ShelfProvider } from './contexts/shelfProvider';
import { UserProvider } from './contexts/userProvider';


const Stack = createStackNavigator();
 

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


export default function App() {

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });
  


  return (   
    <UserProvider>
      <ShelfProvider>
        <NavigationContainer>
          <Stack.Navigator>  
            <Stack.Screen 
                name="Root" 
                component={Root}                                     
                options={{
                  cardStyle:{justifyContent:'center'},
                  title:null,
                  headerBackground: () => HeroImg(dimensions),              
                  headerRight: () => HeaderButtons()
                }}
              />

            <Stack.Screen 
              name="Login" 
              component={Login}                                     
              options={{
                title:"Return",
                cardStyle:{justifyContent:'center'},
                headerStyles:style.newScreenHeader,
                headerTintColor:'#fff',
                headerTitleStyle:style.newScreenHeaderTitle,
                headerBackground: () => HeroImg(dimensions),              
                headerRight: () => HeaderButtons()
              }}
            />

          <Stack.Screen 
              name="Register" 
              component={Register}                                     
              options={{
                cardStyle:{justifyContent:'center'},
                title:"Return",
                cardStyle:{justifyContent:'center'},
                headerStyles:style.newScreenHeader,
                headerTintColor:'#fff',
                headerTitleStyle:style.newScreenHeaderTitle,
                headerBackground: () => HeroImg(dimensions),              
                headerRight: () => HeaderButtons()
              }}
            />

            <Stack.Screen 
              name="Main" 
              component={BottomTabNavigator}                                     
              options={{
                cardStyle:{justifyContent:'center'},
                title:null,
                headerBackground: () => HeroImg(dimensions),              
                headerRight: () => HeaderButtons()
              }}
            />


            <Stack.Screen 
              name="Detail" 
              component={Detail} 
              options={{
                title:"Return to list",
                cardStyle:{flex:1},
                headerStyles:style.newScreenHeader,
                headerTintColor:'#fff',
                headerTitleStyle:style.newScreenHeaderTitle,
                headerBackground: () => HeroImg(dimensions),              
                headerRight: () => HeaderButtons()
              }}
            />      

          </Stack.Navigator>
        </NavigationContainer>    
      </ShelfProvider>
  </UserProvider>
  );
}


