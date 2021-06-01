import {NextFunction, RequestHandler} from 'express'

import * as Datas from './data.schema'

import {email, checkToken} from './service.email'

import dotenv from 'dotenv'

import jwt from 'jsonwebtoken'

dotenv.config();


//-----------------------------------MOTOS--------------------------------------------

export const restarmotos : RequestHandler = async (req, res) => {
    const { id } =req.params;
    await Datas.Motos.findOneAndUpdate({ id: id}, {$inc:{motos: -1}}, {new:true})
    const newdata = await Datas.Motos.find();
    return res.json(newdata)
}

export const sumarmotos : RequestHandler = async (req, res) => {
  const { id } =req.params;
  await Datas.Motos.findOneAndUpdate({ id: id}, {$inc:{motos: 1}}, {new:true})
  const newdata = await Datas.Motos.find();
  return res.json(newdata)
}


export const restaurarmotos = async (id:number) =>{

  await Datas.Motos.findOneAndUpdate({ id: id}, {motos: 8}, {new:true})

}

export const insertmoto : RequestHandler = async (req, res) => {

        const moto = new Datas.Motos(req.body);
        const motosaved = await moto.save();
        res.json(motosaved);
 }

 export const getmotos : RequestHandler = async (req, res) => { 
     try{
         const motos = await Datas.Motos.find()
         return res.json(motos);

     } catch (error) {
         res.json(error);
     }

     res.json('getting motos');
 }


//-----------------------------------PLAYERS--------------------------------------

export const getplayers : RequestHandler = async (req, res) => { 
    try{
        const players = await Datas.Players.find();
        console.log(players);
        return res.json(players);

        

    } catch (error) {
        res.json(error);
    }

    res.json('getting players');
}

export const addplayer : RequestHandler = async (req, res) => {

    const player= new Datas.Players(req.body);
    const playersaved = await player.save();
    res.json(playersaved);
    
}

//----------------------------------EMAIL-----------------------------------------


export const sendEmail : RequestHandler = async (req, res) => {

    const message = Object.assign({}, req.body)

    const token = message.token

    const response = await checkToken(token)

    if (response.data.success===true) {

             try {

                await email(message.from, message.name, message.message)

                return res.json({message: 'El mensaje ha sido enviado'})
        
             } catch(err) { console.log(err) }

        } else {return res.json({message:'token denegado'})}

}

//------------------------------adduserroletools-----------------------------


export const ensureToken : RequestHandler =  (req : any, res, next) => {

    const bearerHeader = req.headers["authorization"]

    if(bearerHeader){

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
    
        jwt.verify(bearerToken, 'codificaesto', (err : any, data : any) => {

                    if (err) {

                            res.sendStatus(403)

                    } else {
                        
                            next()
                    
                      }
        
        })
        
    } else {

        res.sendStatus(403)
    }


}

export const getUser : RequestHandler = async (req, res) => {


    Datas.UserRoleTools.findOne({user : req.body})
                .then ((data : any) => {

                                    const newObject={
                                                user : data.user,
                                                friends : data.friends,
                                    }

                                    res.json(newObject)


                        }
                    )
                .then( (err)=> { res.sendStatus(403) } )


            } 



export const loginUser : RequestHandler = async (req, res) => {
            
            Datas.UserRoleTools.findOne({user : req.body.user}) 

                    .then ((doc : any)=>{

                            if (doc.pass === req.body.pass){
                
                                const user = doc.user
                
                                const token = jwt.sign({user}, 'codificaesto')
                
                                res.json({token})
                
                            }
            
                        }, (err) => { res.sendStatus(403) }
                    
                    ) 
    
        }
        
      

        


export const registerUser : RequestHandler = async (req, res) => {


            await Datas.UserRoleTools.findOne({ user : req.body.user})
                        .then((result)=>{ 
                                            if(result) return res.json({message : 'user already exist'})
                                        }
                                    ) 
        
            await Datas.UserRoleTools.findOne({ email : req.body.email})
                        .then((result)=>{ 
                                            if(result) return res.json({message: 'email already exist'})
                                        }
                                    )

            const token = jwt.sign(req.body.email, 'ads32dggreRERg12')

            const dataUser ={
                user : req.body.user,
                pass : req.body.pass,
                email : req.body.email,
                confirmationCode : token
                
            }

    try{

            const newUser = new Datas.UserRoleTools(dataUser)

            await newUser.save()

            const token = jwt.sign(req.body.user, 'codificaesto')

            res.json({message : 'user created', tokenGenerated : token})

        } catch(err) { res.json({message:'error to create new user'}) }
    
}

export const recoveryUser : RequestHandler = async (req, res) => {

    res.json({message: 'todo okkk'})
}

export const recoveryCode : RequestHandler = async (req, res) => {

    res.json({message: 'todo okkk'})

}


