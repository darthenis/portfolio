import { RequestHandler } from "express"
import * as Datas from './data.schema'
import jwt from 'jsonwebtoken'
import { confirmationEmail, infoAccount } from "./service.email"
import bcrypt, { hashSync } from 'bcrypt'

const saltRounds = 10;



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

   /* Datas.UserRoleTools.findOne({user : req.body.user})
                .then ((data) => {

                                data && res.json(data)

                        }
                    )
                .catch( (err)=> { res.sendStatus(403) } )*/

        const user = [{  user : 'Darthenis',
                        matchesCreated : ['prueba'],
                        matchesJoined  : [''] },      
                        {user : 'testerone',
                        matchesCreated : [''],
                        matchesJoined  : ['prueba'] }
                    ]

        let solicite = user.find(e => e.user === req.body.user)

        solicite && res.json(solicite)

        console.log('solicite: ', solicite)

            } 



export const loginUser : RequestHandler = async (req, res) => {
            
            /*Datas.UserRoleTools.findOne({user : req.body.user}) 

                    .then ( (user)=>{

                            if(!user) return res.json({message: 'invalid'})

                            bcrypt.compare(req.body.pass, user.pass, function(err, result) {


                                            if(!result){

                                                     return res.json({message: 'invalid'}) 

                                                }

                                            if (user.status === 'Pending'){

                                                        return res.json({message: 'pending'})
                                
                                                        
                                                }
                    
                                                
                    
                                            const userIn = user.user //no se usa¿?
                                            
                                            const token = jwt.sign({user}, 'codificaesto')
                            
                                            const friends = user.friends
                            
                                            res.json({token, friends})

                                    })

                           
            
                        }, (err) => { res.json({message: 'invalid user'}) }
                    
                    ) */

            const users = [{user : 'Darthenis', pass : 'lorencia676'},
                           { user : 'testerone', pass : 'lorencia676'}]

            const result = users.find(e => e.user === req.body.user)

            if(result){

                if(result.pass !== req.body.pass){  res.json({message: 'invalid'})}

                else {

                    const friends : string [] = []

                    const token = jwt.sign(result.user, 'codificaesto')

                    res.json({token, friends})

                }

                                           
 
            }

            
                            
            
    
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

            const code = jwt.sign(req.body.email, 'ads32dggreRERg12')

            bcrypt.genSalt(saltRounds, (err, salt) => {

                bcrypt.hash(req.body.pass, salt, async (err, hash) => {

                    const dataUser ={
                        user : req.body.user,
                        pass : hash,
                        email : req.body.email,
                        confirmationCode : code,
                         resetPassCode: ''   
                    }

                    try{
                        const newUser = new Datas.UserRoleTools(dataUser)
            
                        await newUser.save()
            
                        const token = jwt.sign(req.body.user, 'codificaesto')
            
                        res.json({message : 'user created', tokenGenerated : token})
            
                        confirmationEmail(code, req.body.email)
                                    .then( (send) => console.log('enviado'))
                                    .catch ((e) => console.log(e))
            
                    } catch(err) { console.log(err) }  

                })
            })

        }


export const confirmEmail : RequestHandler = async (req, res) => {

    Datas.UserRoleTools.findOne({
            confirmationCode : req.params.code
    })

        .then((user)=>{

            if(!user) {

                return res.status(404).send({message: 'User Not Found.'})
            }

            if(user.status==='Active') {

                return res.status(404).send({message : 'Already Active'})
            }

            user.status='Active';
            user.save((err)=> {
                if(err) {
                    res.status(500).send({message: err})
                    return
                }
            })
        })

        .catch((e)=> console.log('error', e))



}

export const reSendEmail : RequestHandler = async (req, res) =>{

    Datas.UserRoleTools.findOne({
        user : req.body.user
    })
    .then((user)=>{
        if(!user){
            return res.status(404).send({message: 'error'})
        }

        try{

            confirmationEmail(user.confirmationCode, user.email)
            .then( (send) => res.send({message: 'send'}))
            .catch ((e) => res.send({message: 'error'}))

        } catch(err) { res.send({message:'error'})}
    })
    .catch((e) => console.log('error', e))

}

export const setNewEmail : RequestHandler = async (req, res) => {

    Datas.UserRoleTools.findOne({
        user : req.body.user
    })
    .then( (user) => {

        if(!user){
            return res.status(404).send({message: 'error'})
        }

        user.email = req.body.email
        user.save((err)=> {
            if(err) {
                res.status(500).send({message: err})
                return
            }
        })
        confirmationEmail(user.confirmationCode, req.body.email)
            .then( (send) => res.send({message: 'send'}))
            .catch ((e) => res.send({message: 'error'}))

    })
    .catch((e) => console.log('error', e))


}


export const recoveryAccount : RequestHandler = async (req, res) => {
    
    
    Datas.UserRoleTools.findOne({ email : req.body.email})
    .then((account) => {

            if(!account){
                    return res.status(404).send({message: 'invalid'})
            }

            const token =  Math.floor(1000 + Math.random() * 9000)

            account.resetPassCode=token
            account.save((err)=> {
                if(err) {
                    res.status(500).send({message: err})
                    return
                }
            })

            infoAccount(token, account.email)
                        .then( (send) => res.send({message: 'send'}))
                        .catch ((e) => console.log(e))      
                    
    })
    .catch((e) => console.log('error', e))
}


export const checkCode : RequestHandler = async (req, res) => {

    Datas.UserRoleTools.findOne({ resetPassCode : req.body.code })
    
                            .then((data) => {

                                    if(data){

                                        data.resetPassCode=null
                                        data.save((err)=> {
                                            if(err) {
                                                res.status(500).send({message: err})
                                                return
                                            }
                                        })

                                        res.send({message: 'valid'})

                                        
                                    } else res.send({message: 'invalid'})
                            })
                            .catch((e) => console.log(e))
                            
                        }
                                     

                                  

                            

                        


export const resetPassword : RequestHandler = async (req, res) => {
    
    Datas.UserRoleTools.findOne({ email : req.body.email })

        .then( (user) => {

                if(user){

                    bcrypt.genSalt(saltRounds, (err, salt) => {

                        bcrypt.hash(req.body.pass, salt, (err, hash) => {

                            user.pass=hash;
                            user.save((err)=> {
                                if(err) {
                                    res.status(500).send({message: err})
                                    return
                                }
                            })

                            res.send({message: 'done'})

                        })
                    })

                }

            })

        .catch((e)=>{ console.log(e)})

    } 


