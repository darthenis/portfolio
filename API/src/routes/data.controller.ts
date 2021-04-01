import {RequestHandler} from 'express';

import * as Datas from './data.schema';



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

        const moto= new Datas.Motos(req.body);
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
        const players = await Datas.Player.find();
        return res.json(players);
    } catch (error) {
        res.json(error);
    }

    res.json('getting players');
}

export const addplayer : RequestHandler = async (req, res) => {

    const player= new Datas.Player(req.body);
    const playersaved = await player.save();
    res.json(playersaved);
    
}