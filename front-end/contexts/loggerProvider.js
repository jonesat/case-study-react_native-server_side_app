import {useState,useEffect,createContext,useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"


export const LoggerContext = createContext();
export const useLoggercontext = () => useContext(LoggerContext)

function addEvent(event,state,setState){
    let objIndex = state.findIndex((obj)=>obj.event===event)
    setState(x => {
        x[objIndex].data.push(new Date().getTime())
        return [...x]
    })
    AsyncStorage.setItem("@Log",JSON.stringify(state));

}


export const LoggerProvider = ({children}) =>{
    const [state,setState]= useState([
        {event: "Chocolate",data:[]},
        {event: "Coffee",data:[]},
        {event: "Fruit",data:[]},
        {event: "Walk",data:[]},
    ])

    let _retrieveData = async()=>{
        try{
            const value = await AsyncStorage.getItem("@Log");
            console.log("Retrieved Log")
            if(value!==null){
                setState(JSON.parse(value))
            }
        }catch(error){
            console.log(error)            
        }
    };
    useEffect(()=>{
        _retrieveData()
    },[]);

    return (
        <LoggerContext.Provider value={[state,setState,(x)=>addEvent(x,state,setState)]}>
            {children}
        </LoggerContext.Provider>
    )
}


