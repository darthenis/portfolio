import {Dispatch, SetStateAction} from 'react'
 

export type userStateContext = {
    profile: profile;
    getProfile: (value : string, value2 : string) => void;
    setProfile: Dispatch<SetStateAction<profile>>;
  };

export type profile ={
    user : string;
    friends : string[];
    token : string

}