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


export const Players = model('Player', playerSchema);

export const Motos = model('Moto', motosSchema);

export const Email = model('Email', emailSchema);
