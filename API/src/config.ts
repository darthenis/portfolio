import dotenv from 'dotenv'

dotenv.config();

export default {
     MONGO_USER :  process.env.MONGO_USER || 'admin',
     MONGO_PASS :  process.env.MONGO_PASS || 'lorencia676',
     PORT       :  process.env.PORT || 4000,
     WEBURL     :  'https://personalwebapi.herokuapp.com'
}


// dev: http://localhost:3000

// production: https://personalwebapi.herokuapp.com