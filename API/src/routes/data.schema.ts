import {Schema, model} from 'mongoose';

const playerSchema = new Schema({

        "name": {
            type: String,
            required: true,
            trim: true
        },

        "country": {
            type: String,
            required: true,
            trim: true
        },

        "age": {
            type: Number,
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

export const Player = model('Player', playerSchema);

export const Motos = model('Moto', motosSchema);
