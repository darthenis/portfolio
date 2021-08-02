import React, {useState, Dispatch} from 'react'
import { SetStateAction } from 'react';
import {Inputs, Messageinvalid, Messageempty} from './input-style'


    const Input = (props :{  
                            setInputState    : Dispatch<SetStateAction<any>>,
                            inputState       : any,
                            label            : string,
                            classLabel       : string,
                            className        : string, 
                            type             : string, 
                            placeholder      : string, 
                            name             : string,
                            expresion        : RegExp,
                            errorinput       : string,
                            errorempty       : string,
                            errorMessageClass: string,
                            user             : any,
                            setUser          : Dispatch<SetStateAction<any>> }) => {


 


    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) =>{

                             props.setUser({
                                
                                ...props.user,
                                
                                [event.currentTarget.name] : event.currentTarget.value
                                    })
                                
                                  }
                                  

    const validation = (e:React.FormEvent<HTMLInputElement>, expresion:RegExp) => {
    
        if (e.currentTarget.value!=='')

                props.setInputState({...props.inputState, [e.currentTarget.name] : expresion.test(e.currentTarget.value) })

            
        else    props.setInputState({...props.inputState, [e.currentTarget.name] : true })


        }



    return (
                <>
                    <label  style     ={{color: (!props.inputState[props.name] && props.user[props.name]!=='') ? 'red' : 'white'}} 
                            className ={props.classLabel} 
                            htmlFor   ={props.name}>{props.label}
                            </label>

                    <Inputs type        ={props.type}
                            placeholder ={props.placeholder}
                            name        ={props.name}
                            value       ={props.user[props.name]}
                            onChange    ={handleInputChange}
                            onKeyUp     ={(e) => validation(e, props.expresion)}
                            isActive    ={props.inputState[props.name]}
                            className   ={props.className}
                            />
                    <p className={props.errorMessageClass}>
                    <Messageinvalid isActive={props.inputState[props.name]}>{props.errorinput}</Messageinvalid>
                    <Messageempty isActive={props.inputState.incomplete && props.user[props.name]==='' ? true : false}>{props.errorempty}</Messageempty>
                    </p>

                                    </>








    )




}


export default Input;