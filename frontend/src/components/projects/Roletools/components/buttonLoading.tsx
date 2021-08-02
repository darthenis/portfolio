import React from 'react'
import {Button, Text, SpinnerLoad} from './buttonStyled'




const ButtonLoading = (props : { isLoading  : boolean, 
                                 insideText : string, 
                                 color      : string,
                                 background : string,
                                 hover      : string, 
                                 onClick : ()=>void }) => {


    const onClickActive = () => {

        if(!props.isLoading){

            return props.onClick()
        }

    }
    


    return(

                <Button isLoading={props.isLoading} color={props.color} background={props.background} hover={props.hover} onClick={onClickActive}> 
                    <SpinnerLoad isLoading={props.isLoading}/>
                    <Text isLoading={props.isLoading}>

                        {props.insideText}

                    </Text>


                  </Button>





    )

}


export default ButtonLoading;