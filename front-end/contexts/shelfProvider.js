import {useState,useEffect,createContext,useContext} from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"


export const ShelfContext = createContext();
export const useShelfContext = () => useContext(ShelfContext)

function addBook(book,user,state,setState){   
    let objIndex = state.findIndex((obj)=> obj.id===book.id)

    const handleAddBook = ()=>{
        const requestBody = {
            username:user.username,
            title:book.title,
            author:book.authors,
            genre:book.categories,
            docID:book.docID,
           
        }

        fetch('http://172.22.30.84:3000/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.data.token}`,
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data??
            console.log(data);        
        })
        .catch(error => {
            console.error(error);
        });
    };
    


    const added = ()=>{
        ToastAndroid.show(`${book.title} added to shelf`,ToastAndroid.SHORT)
    }
    const notAdded = ()=>{
        ToastAndroid.show(`${book.title} is already on shelf`,ToastAndroid.SHORT)
    }
    if(objIndex===-1){
        setState(x => {x.push(book); return [...x]})    
        AsyncStorage.setItem("@Shelf",JSON.stringify(state));
        handleAddBook();
        added();
    }else{
        notAdded();
    }

}

function removeBook(book, user,state, setState) {
    let objIndex = state.findIndex((obj) => obj.id === book.id);  

    const handleRemoveBook = ()=>{
        const requestBody = {
            username:user.username,
            title:book.title,
            author:book.authors,
            genre:book.categories,
            docID:book.docID,           
        }

        fetch('http://172.22.30.84:3000/api/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.data.token}`,
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data??
            console.log(data);        
        })
        .catch(error => {
            console.error(error);
        });
    };


    const removedBook = ()=>{
        ToastAndroid.show(`${book.title} has been removed from your shelf`,ToastAndroid.SHORT)
    }
    if (objIndex !== -1) {
      setState((x) => {x = x.filter((item) => item.id !== book.id); return [...x];});  
      AsyncStorage.setItem("@Shelf", JSON.stringify(state));
      handleRemoveBook();
      removedBook();
      
    }
}

export const ShelfProvider = ({children}) =>{
    const [state,setState]= useState([])

    let _retrieveData = async()=>{
        try{
            const value = await AsyncStorage.getItem("@Shelf");
            console.log("Retrieved user shelf")
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
        <ShelfContext.Provider value={[state,setState,(x,y)=>addBook(x,y,state,setState,y),(x,y)=>removeBook(x,y,state,setState)]}>
            {children}
        </ShelfContext.Provider>
    )
}


