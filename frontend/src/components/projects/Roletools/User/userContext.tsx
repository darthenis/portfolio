import {createContext, useContext} from 'react'

type userStateContext = {
    profile: profile | undefined;
    getProfile: (value : string, value2 : string) => void;
    setProfile: (value : profile) => void;
  };

type profile ={
    user : string;
    friends : string[];
    token : string

}


const UserContext = createContext<userStateContext | undefined>(undefined)

export const useProfile = () => useContext(UserContext);

export default UserContext