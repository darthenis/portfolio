


export interface matchRoom {

            name : string;
            masterID : string;
            playersID : string[]

    }





export interface newRoom {

            name : string;
            user : {
                name : string;
                socketID : string;
            };
            type : string

}