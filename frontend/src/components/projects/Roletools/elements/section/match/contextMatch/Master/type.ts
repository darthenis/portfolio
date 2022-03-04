import React, { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import {monsterStat, initOrder, registerText, argsRegisterText, playerStats, player } from '../../../../../Interfaces/interfaces'

export type masterStateContext = {

    checkActualMatch : (match : string) => void;
    monsterStats : monsters;
    initOrder : initOrderList;
    registerText : register;
    playerStats : playersStats;
    resetMatchesSession : () => void;
    rollInit : () => void;
    resetInitOrder : () => void;
    monsterAttack : (ventaja : boolean | null) => void

}

type monsters = {

    myStateRef : MutableRefObject<monsterStat[]>;
    onChange : (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id:number) => void;
    selectMonster : (id : number) => void;
    resetMonsterStat : () => void;
    addMonster : () => void;
    duplicate : () => void;
    deleteMonster : (id : number) => void;
    attack : (initOrder : initOrder[], ventaja : boolean | null, playerStats : player[]) => void;
    rollInit : () => monsterStat[];
    initEnabledOff : () => void;
    dmg : (id : number, dmg : number) => void;
    findId : (id : number) => monsterStat | undefined

}

type initOrderList = {

    myStateRef : MutableRefObject<initOrder[]>;
    deleteInit : (id : number) => void;
    selectUnitInit : (id : number) => void;
    createInitOrder : ( monsterStat : monsterStat[] ) => void;
    addPlayerInit : ( playerStats : player) => void;
    resetInitOrder : () => void;
    moveTurn : (id : number, direction : string) => void;
    passTurn : () => void;
    findId : (id : number) => initOrder | undefined


}

type register = {

    myStateRef : MutableRefObject<registerText[]>;
    addRegisterText : (args : argsRegisterText) => void;
    resetRegister : () => void;

}

type playersStats = {

    myStateRef : MutableRefObject<player[]>;
    findId : (id : number) => player | undefined
}

