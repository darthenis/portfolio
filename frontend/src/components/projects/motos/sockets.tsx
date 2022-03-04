import { io } from 'socket.io-client'
import config from '../../../config'

const socket = io(config.APIURL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header":"abcd"
  },


})

export default socket;


//https://personalwebapi.herokuapp.com
