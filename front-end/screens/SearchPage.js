import React from "react";
import {useState, useEffect} from 'react';
import {TextInput,SafeAreaView, FlatList,Text,Button,View,ScrollView} from "react-native";
import {style} from '../css/styles';
import { useNavigation } from "@react-navigation/core";
import {CreateCardList } from "../components/card";
import {useBooks,getAuthorWorks} from '../api'
import {SearchBar} from "../components/search";
import { TestButton } from "../components/week6";

export default function SearchPage({route,navigation}){   
    const navi = useNavigation();    
    const [searchText, onChangeSearch] = useState("");    
    const [clicked, setClicked] = useState(false);
    const { loading, books, error } = useBooks(searchText);   

    if (loading){
        return (<Text>Loading... </Text>);
    }        
    if (error){
        return <Text>Error: {error.message}</Text>;
    }

    return(
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1 }}>                    
            <SearchBar searchText={searchText} onChangeSearch={onChangeSearch} clicked={clicked} setClicked={setClicked}/>
                <TestButton/>
                {typeof books!==null && ( <CreateCardList books={books} navigation={navi} searching={true}/>)}
        </View>
             
    )
}