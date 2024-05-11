import React from "react";
import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import {BodyText,Headline,HeadlineText,HeadlineImage,TestButton} from '../components/week6';
import {Event,EventList} from '../components/week7';
import { useShelfContext } from "../contexts/shelfProvider";
import {style} from '../css/styles';
import { useNavigation } from "@react-navigation/core";

import { CreateCardList } from "../components/card";


export default function ShelfScreen({route,navigation}){
    const [books,setBooks]=useShelfContext();
    
    
    const navi = useNavigation(); 
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1 }}>                 
        {typeof books!==null && ( <CreateCardList books={books} navigation={navi} searching={false}/>)}
         
      </View>
    )
}