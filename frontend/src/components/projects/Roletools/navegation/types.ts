import {Dispatch, SetStateAction} from 'react'



export type navigationContext = {

    navigation : navigation;
    setNavigation : Dispatch<SetStateAction<navigation>>

}

export interface navigation{

        actualPage : string;
        actualMatch : string

}