import React from "react";
import {useState, useEffect} from 'react';
import {TextInput, TouchableHighlight,SafeAreaView, FlatList,Text,Button,View,ScrollView,Keyboard} from "react-native";
import {Card,Divider, List, Title ,Paragraph } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import { TabBarIcon } from "../components/week7";


import {style} from '../css/styles';
import {EventLog,EventLogList} from '../components/week7';
import { useLoggercontext } from "../contexts/loggerProvider";
import {useBooks,getAuthorWorks} from '../api.js'
// import { TouchableHighlight } from "react-native-gesture-handler";

export function SearchBar({searchText, onChangeSearch,clicked, setClicked}){
    const [startText,setStartText] = useState('')
    return (
      <View style={style.searchContainer}>
        <View style={clicked?style.searchBar__clicked:style.searchBar__unclicked}>          
          <TabBarIcon clearButtonMode="always" name="md-search-circle-sharp"/>          
          <TextInput
            style={style.input}
            // placeholder="Search for a book..."
            value={startText}
            onChangeText={(text)=>setStartText(text)}
            onSubmitEditing={(event) => onChangeSearch(event.nativeEvent.text)}
            onFocus={() => {
                setClicked(true);
            }}
          />                    
          {clicked && (
            <TouchableHighlight onPress={() => {Keyboard.dismiss(); onChangeSearch(""); setStartText(''); setClicked(false);}} underlayColor='blue'>
                <View>
                    <TabBarIcon name="md-close-circle-outline"/>            
                </View>
            </TouchableHighlight>
          )}
        </View>        
      </View>
    );
  };
  
  