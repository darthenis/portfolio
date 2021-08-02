import {Schema, model} from 'mongoose';

const playerSchema = new Schema({

        "nombre": {
            type: String,
            required: true,
            trim: true
        },

        "edad": {
            type: String,
            required: true,
            trim: true
        },

        "pais": {
            type: String,
            required: true

        },

        "dificultad": {
            type: String,
            required: true

        },

        "aciertos": {
            type: String,
            required: true

        }

    }, {
        versionKey: false,
        timestamps: true

})




const motosSchema = new Schema({

    "motos": {
        type : Number
    },

    "id": {
      type : Number
    }

},  {
        versionKey: false,
        timestamps: true
    }
)


const emailSchema = new Schema ({

    from : {
        type : String,
    },
    subject : {
        type : String,
    },

    message : {
        type : String
    }
})

export interface user  extends Document {
    user : string,
    pass : string,
    email: string,
    matchesCreated : string[],
    matchesJoined  : string[],
    friends: string[],
    status : string,
    confirmationCode: string,
    resetPassCode : number | null
}

export interface match extends Document {
    name : string,
    pass : string,
    creator : string[],
    players : string[]
}

const userRoleToolsSchema : Schema = new Schema ({

    user : {
        type : String,
        required: true,
    },

    pass : {
        type : String,
        required: true,
    },

    email : {
        type : String,
        required: true,
    },

    matchesCreated : {
            type : [String],        
    },

    matchesJoined : {
        type : [String]
    },

    friends : {
        type : [String],
        default : []
    },

    status : {
        type : String,
        enum : ['Pending', 'Active'],
        default : 'Pending'
    },

    confirmationCode : {
            type : String,
            unique : true 
    },

    resetPassCode : {
        type : Number,
        default : null
        
    }
    })


const matchRoleToolsSchema : Schema = new Schema ({

    name : {
       type : String
    },

    pass : {
        type : String
    },

    creator : {
        type : String
    },

    players : {
        type : [String],
    }


})


export const Players = model('Player', playerSchema);

export const Motos = model('Moto', motosSchema);

export const Email = model('Email', emailSchema);

export const UserRoleTools = model<user>('User', userRoleToolsSchema)

export const MatchRoleTools = model<match>('Match', matchRoleToolsSchema)
