import { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);






export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    let _retrieveUserData = async () => {
    
    try {
            const value = await AsyncStorage.getItem('@User');
            console.log('Retrieved user data');
            if (value !== null) {
                setUser(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
     _retrieveUserData();
    }, []);  

    const removeUser = async () => {
    try {
            await AsyncStorage.removeItem('@User');
            setUser(null);
            console.log('User removed');
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
        console.log(`New data was added for ${newUserData.username} - ${newUserData.data}`)
        AsyncStorage.setItem('@User', JSON.stringify(newUserData));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};