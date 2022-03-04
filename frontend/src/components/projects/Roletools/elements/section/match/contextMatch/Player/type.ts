import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { registerText, player, playerInitOrder, argsRegisterText, playerAttacks, playerStats } from '../../../../../Interfaces/interfaces'

export type playerStateContext = {

        checkActualMatch : (match : string) => void;
        playerStats : stats;
        initOrder : initOrder;
        attacks : attacks;
        registerText : register;
        resetPlayerSession : () => void;
        CD : number
 }



 type stats = {
         myStateRef: React.MutableRefObject<playerStats>;
         reset : () => void;
         onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
         switchInitRolled : () => void;
         rollInit : () => player

 }

 type initOrder = {

        myStateRef: React.MutableRefObject<playerInitOrder[]>;
        reset : () => void;
        select : (id : number) => void;
 }


 type register = {

        myStateRef : MutableRefObject<registerText[]>;
        addRegisterText : (args : argsRegisterText) => void;
        resetRegister : () => void;
    
    }

type attacks = {
        myStateRef: React.MutableRefObject<playerAttacks[]>;
        onChange : (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id : number) => void;
        addAttack : () => void;
        deleteAttack : (id : number) => void;
        reset : () => void;
        select : (e : React.MouseEvent<HTMLDivElement>, id : number) => void

}