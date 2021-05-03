
import axios from 'axios';

  export const getMotos = async () => {

        const data = await axios.get('http://localhost:4000/motos')

        return data;
}

  export const restarMoto = async (id : number) => {

      await axios.post('http://localhost:4000/motosrest/'+id)

      return true;


}

  export const sumarMoto = async (id:number) => {

    await axios.post('http://localhost:4000/motossum/'+id)

    return true;

  }
