import { Dispatch, SetStateAction } from "react";
import {monsterStat, initOrder, registerText, argsRegisterText } from '../../../Interfaces/interfaces'

export type masterStateContext = {

    monsterStat : monsterStat[];
    setMonsterStat : Dispatch<SetStateAction<monsterStat[]>>;
    initOrder : initOrder[];
    setInitOrder : Dispatch<SetStateAction<initOrder[]>>;
    selectUnitInit : (id : number) => void;
    registerText : registerText[];
    addRegisterText : (args : argsRegisterText) => void;
    resetMatchesSession : () => void;

}