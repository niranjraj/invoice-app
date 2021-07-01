import React,{useState,createContext} from 'react';

export const FormContext=createContext();

export const FormProvider=({children})=>{
    const [formIsOpen, setFormIsOpen] = useState(false);
    return(
        <FormContext.Provider value={[formIsOpen,setFormIsOpen]}>
            {children}
        </FormContext.Provider>
    )
}