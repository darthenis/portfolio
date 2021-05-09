
import axios from 'axios';

  export const getMotos = async () => {

        const data = await axios.get('https://personalwebapi.herokuapp.com/motos')

        return data;
}

  export const restarMoto = async (id : number) => {

      await axios.post('https://personalwebapi.herokuapp.com/motosrest/'+id)

      return true;


}

  export const sumarMoto = async (id:number) => {

    await axios.post('https://personalwebapi.herokuapp.com/motossum/'+id)

    return true;

  }
