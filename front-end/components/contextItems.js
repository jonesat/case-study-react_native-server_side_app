import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {style} from '../css/styles';
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from "react-native-paper";

import { useShelfContext } from "../contexts/shelfProvider";
import { useUserContext } from '../contexts/userProvider';


export function AddToShelf(props){
    const [,,addBook,]=useShelfContext();
    const { user, updateUser, removeUser } = useUserContext();

    return (<Button title="Add" onPress={()=>addBook(props.book,user)}>Add to Shelf</Button>)
}

export function RemoveFromShelf(props){
    const [,,,removeBook]=useShelfContext();
    const { user, updateUser, removeUser } = useUserContext();
    return (<Button title="Remove" onPress={()=>removeBook(props.book,user)}>Remove from Shelf</Button>)
}
