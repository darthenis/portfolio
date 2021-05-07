import { io } from 'socket.io-client'

const socket = io('https://personalwebapi.herokuapp.com/', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header":"abcd"
  },


})

export default socket;
