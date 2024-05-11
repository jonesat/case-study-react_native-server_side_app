import React from "react";
import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import {BodyText,Headline,HeadlineText,HeadlineImage,TestButton} from '../components/week6';
import {Event,EventList} from '../components/week7';
import { useShelfContext } from "../contexts/shelfProvider";
import {style} from '../css/styles';
import { useNavigation } from "@react-navigation/core";

import { CreateCardList } from "../components/card";


export default function RecordScreen(){
    const [books,setBooks]=useShelfContext();
    const navi = useNavigation(); 
    return (
        <View style={style.container}>                 
        {typeof books!==null && ( <CreateCardList books={books} navigation={navi}/>)}
         <TestButton/>
      </View>
    )
}