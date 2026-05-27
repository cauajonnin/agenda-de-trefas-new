import React,{createContext,useContext,useEffect,useRef} from "react";
import { Alert } from 'react-native';

export const AuthContextList:any= createContext({});

export const AuthProviderList = (props:any):any=>{

    const onOpen  = () =>{
        Alert.alert('ABRIR MODAL')
    }

    return(
        <AuthContextList.Provider value={{onOpen}}>
            {props.children}            
        </AuthContextList.Provider>
    );
};
export const useAuth= () => useContext(AuthContextList)