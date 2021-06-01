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

const userRoleToolsSchema = new Schema ({

    'user' : {
        type : String,
    },

    'pass' : {
        type : String,
    },

    'email' : {
        type : String,
    },

    'friends' : {
        type : [String],
        default : []
    },

    'status' : {
        type : String,
        enum : ['Pending', 'Active'],
        default : 'Pending'
    },

    'confirmationCode': {
            type : String,
            unique : true }
    }
)


export const Players = model('Player', playerSchema);

export const Motos = model('Moto', motosSchema);

export const Email = model('Email', emailSchema);

export const UserRoleTools = model('User', userRoleToolsSchema)
