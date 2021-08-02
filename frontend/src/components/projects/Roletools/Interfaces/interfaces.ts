export interface match {

    name : string,
    pass? : string,
    creator? : string

}

export interface profile {

    user: string,
    token : string

}

export interface playerStats {

    name : string;
    init : number;
    initRolled : boolean;
    playerId : number;
    AC : number;
    hitPoint : number
    
}

export interface playerAttacks{

    name : string;
    attack : number;
    diceDmg : number;
    bonusDmg : number;
    selected : boolean;
    id: number

}


export interface monsterStat {

    name : string;
    init : number;
    AC : number;
    attack : number;
    diceDmg : number;
    bonusDmg : number;
    hitPoint : number,
    initEnabled : boolean,
    initRolled : boolean,
    rolled   : number;
    dmg      : number;
    id : number

}

export interface initOrder {
bonusInit : number;
init : number;
selected : boolean;
id : number;
}


export interface playerInitOrder{
    name : string;
    init : number,
    state : string;
    selected : boolean;
    id : number;
}


export interface player{

    bonusInit : number;
    init : number;
    selected : boolean;
    id : number;
    AC : number;
    hitPoint : number

}

export interface buttonState {
        
        init : boolean;
        duplicate : boolean;
        attack : boolean;
        passTurn : boolean;

}


export interface registerText {
    
            name : string;
            dice : number;
            rolled: number;
            ventaja : string;
            critic : boolean;
            bonusDice : number;
            diceDmg : number;
            dmg : number;
            bonusDmg : number;
            exit : boolean | null;

}

export interface argsRegisterText {
        
    name : string;
    dice : number;
    rolled : number;
    ventaja : string;
    critic? : boolean;
    bonusDice? : number;
    diceDmg? : number;
    dmg? : number;
    bonusDmg? : number;
    exit? : boolean | null;
}