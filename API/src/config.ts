import dotenv from 'dotenv'

dotenv.config();

export default {
     MONGO_USER :  process.env.MONGO_USER,
     MONGO_PASS :  process.env.MONGO_PASS,
     PORT       :  4000 
}
