import {Dispatch, SetStateAction} from 'react'
 

export type userStateContext = {
    profile: profile;
    getProfile: () => void;
    setProfile: Dispatch<SetStateAction<profile>>;
  };

export interface profile {
    user : string;
    matchesCreated : string[],
    matchesJoined  : string[],
    token : string
}