import { RequestHandler } from "express";
import * as Datas from './data.schema'


export const createMatch : RequestHandler = async (req, res) =>{

            await Datas.MatchRoleTools.findOne({ name : req.body.match.name})
                        .then( async (result) => { 

                                            if (result) { 
                                                
                                                    res.json({message : 'name already exist'})
                                        
                                        
                                            } else {

                                                const match = new Datas.MatchRoleTools(req.body.match);
                                                const matchSaved = await match.save(); 

                                                addCreatedMatch(req.body.user, req.body.match.name)

                                                res.json({message: 'match saved'})
                                            }
                                        }
                                    )
                                } 

const addCreatedMatch = (name : string, match : string) => {

        Datas.UserRoleTools.findOne({user : name})
        .then((user) =>{

                    if(user){

                        if(user.matchesCreated){

                            let newArray = user.matchesCreated.concat(match)
                            user.matchesCreated= newArray,
                            user.save()

                        }else{

                        user.matchesCreated = [match]
                        user.save()

                    }

                }

            })


    }   


export const seekMatch : RequestHandler = async (req, res) => {

        Datas.MatchRoleTools.findOne({name : req.body.match.name})
                    .then( (match) => {

                                if (!match) return res.json({message : 'invalid name'})

                                if (!match.pass) {
                                    
                                    addJoinedMatch(req.body.user, req.body.match.name)

                                    addNewPlayer(req.body.user, req.body.match.name)

                                    return res.json({message : 'done'})}

                                if (!req.body.match.pass) return res.json({message : 'pass'})

                                if (match.pass===req.body.match.pass){ 

                                        addJoinedMatch(req.body.user, req.body.match.name)

                                        addNewPlayer(req.body.user, req.body.match.name)

                                        return res.json({message : 'done'})                                  

                                    } else { return res.json({message : 'invalid pass'}) }

                             }
                             
                        )
                                        
                    }


const addJoinedMatch = (name : string, match : string) =>{

    Datas.UserRoleTools.findOne({user : name})
            .then((user) =>{

                if(user){

                    if(user.matchesJoined){

                        let newArray = user.matchesJoined.concat(match)
                        user.matchesJoined = newArray,
                        user.save()

                    }else{

                    user.matchesJoined = [match]
                    user.save()

                }

            }

        })


}

const addNewPlayer =  (player : string, matchName : string) => {

    Datas.MatchRoleTools.findOne({ name : matchName})
                .then( (match) => { 

                        if (!match) console.log('match: ', matchName, ' no existe')

                        else {
                            
                            if(match.players){

                                let newArray = match.players.concat(player)
                                match.players = newArray
                                match.save()

                            } else {
        
                                match.players = [player]
                                match.save()

                            }

                        }

                    }) 
            }


export const myMatch : RequestHandler = (req, res) => {

           /* Datas.MatchRoleTools.findOne({name : req.body.match})
                            .then ((match) => {

                                                    if (match) {
                                                        
                                                        if(match.players){

                                                            if (match.players.includes(req.body.user)) return res.json({message: 'done'})

                                                        }
                                                       
                                                       if (match.creator.includes(req.body.user)) return res.json({message: 'done'})

                                                       return res.json({message: 'invalid'})

                                                    }

                                   })*/

        const matches = [{name : 'prueba',
                            pass : '',
                        creator : 'Darthenis',
                        players : ['testerone']}]

        let match = matches.find(e => e.name === req.body.match)

        if (match) {
                                                        
            if(match.players){

                if (match.players.includes(req.body.user)) return res.json({message: 'done'})

            }
           
           if (match.creator.includes(req.body.user)) return res.json({message: 'done'})

           return res.json({message: 'invalid'})

        } 
        
        return res.json({message: 'invalid match'})
}