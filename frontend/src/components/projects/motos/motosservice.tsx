import config from '../../../config'
import axios from 'axios';

  export const getMotos = async () => {

        const data = await axios.get(config.APIURL+'/motos')

        return data;
}

  export const restarMoto = async (id : number) => {

      await axios.post(config.APIURL+'/motosrest/'+id)

      return true;


}

  export const sumarMoto = async (id:number) => {

    await axios.post(config.APIURL+'/motossum/'+id)

    return true;

  }
