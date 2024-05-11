import React from "react";
import {Text,View,SafeAreaView} from "react-native";
import { CreateDetails } from "../components/card";

export default function Detail({route,navigation}){      
    const {book} = route.params;
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1}}>
            <SafeAreaView>
                <CreateDetails book={book}/>                
            </SafeAreaView>
        </View>
        
    )
    // return <Text>Hello cat</Text>
}