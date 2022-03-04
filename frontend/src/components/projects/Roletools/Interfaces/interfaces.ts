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
    bonusInit : number;
    initRolled : boolean;
    id : number;
    AC : number;
    totalHP : number;
    actualHP : number
    
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
    bonusInit : number;
    init : number;
    AC : number;
    attack : number;
    diceDmg : number;
    bonusDmg : number;
    totalHP : number,
    actualHP: number,
    selected : boolean,
    initRolled : boolean,
    rolled   : number;
    dmg      : number;
    id : number

}


export interface initOrder {
                            bonusInit : number;
                            init : number;
                            selected : boolean;
                            totalHP : number;
                            actualHP : number;
                            AC : number;
                            id : number
}


export interface newInitOrder {

    bonusInit : number;
    init : number;
    id : number;
}


export interface playerInitOrder{
    name : string;
    init : number,
    state : string;
    AC : number;
    selected : boolean;
    id : number;
}


export interface player{
    name : string;
    bonusInit : number;
    init : number;
    selected? : boolean;
    id : number;
    AC : number;
    totalHP : number;
    actualHP : number;

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
            ventaja : boolean | null;
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
    ventaja : boolean | null;
    critic? : boolean;
    bonusDice? : number;
    diceDmg? : number;
    dmg? : number;
    bonusDmg? : number;
    exit? : boolean | null;
}


export interface attackRolledSocket {
    
                    bonusDice : number;
                    bonusDmg : number;
                    rolle : number;
                    critic : boolean;
                    exit : boolean;
                    diceDmg : number;
                    dmg : number;
                    ventaja : boolean | null

}


export interface resultAttack {

            data : attackRolledSocket;
            combatients : {attacker : number, target : number}

}
