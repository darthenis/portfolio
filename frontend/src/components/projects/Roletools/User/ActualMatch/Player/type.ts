import { Dispatch, SetStateAction } from "react";
import { registerText, playerStats, playerInitOrder, argsRegisterText, playerAttacks } from '../../../Interfaces/interfaces'

export type playerStateContext = {

        playerStats : playerStats;
        setPlayerStats : Dispatch<SetStateAction<playerStats>>;
        playerAttacks : playerAttacks[];
        setPlayerAttacks : Dispatch<SetStateAction<playerAttacks[]>>;
        playerInitOrder : playerInitOrder[];
        setPlayerInitOrder : Dispatch<SetStateAction<playerInitOrder[]>>;
        selectUnitInitOrder : (id : number) => void;
        registerText : registerText[];
        addRegisterText : (args : argsRegisterText) => void;
        resetRegister : () => void
 }