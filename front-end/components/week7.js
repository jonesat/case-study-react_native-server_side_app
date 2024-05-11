import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {style} from '../css/styles';
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import { useLoggercontext } from "../contexts/loggerProvider";
import { useShelfContext } from "../contexts/shelfProvider";



export function TabBarIcon(props){

    return(
        <Ionicons
            name={props.name}
            size={30}
            style={{marginBottom:-3}}
            color={props.focused?'#2f95dc':'#ccc'}
        />
    )
}




export function Event(props){
    const [,,addEvent]=useLoggercontext();
    return <Text style={style.event} onPress={()=>addEvent(props.event)}>{props.event}</Text>
}



export function EventList(props){
    
    return(
        <View style={style.container}> 
            {props.events.map(x=><Event event={x.event} key={x.event}/>)}            
        </View>
    )
}


export function EventLog(props){
    return(
        <View>
            <View style={style.eventTitle}>
                <Text>{props.event}</Text>
            </View>

            <View style={style.eventData}>
                {props.data.map((x)=>(
                    <Text key={x}> {new Date(x).toDateString()} </Text>
                ))}
            </View>
        </View>
    )
}

export function EventLogList(){
    const [log,setLog]=useLoggercontext()
    return (
        <ScrollView>
            {log.map((x)=>(                
                <EventLog {...x} key={x.event}/>
            ))}
        </ScrollView>
    )
}