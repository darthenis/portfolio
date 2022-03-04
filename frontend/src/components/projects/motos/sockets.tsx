import { io } from 'socket.io-client'

const socket = io('http://personalwebapi.herokuapp.com', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header":"abcd"
  },


})

export default socket;


//https://personalwebapi.herokuapp.com
