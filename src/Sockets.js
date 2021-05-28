
import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
let socket



function Sockets({dataServer,currentUser,setShowLive}) {
  const [messages, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState('123')
  
  useEffect(() => {
     initiateSocket(room);
   
    enterChat((err, data) => {
      if(err) return;
      setChat(existingdata =>[data, ...existingdata])
    });
    return () => {
      disconnectSocket();
    }
  }, [room]
  )

  
 const initiateSocket = (room) => {
    socket = io(dataServer,{transports: ['websocket']});
    console.log(`Connecting`);
    if (socket && room) socket.emit('join', room);
  }
   const disconnectSocket = () => {
    console.log('Disconnecting');
    if(socket) socket.disconnect();
  }
   const enterChat = (data) => {
    if (!socket) return;
    socket.on('chat', message => {
      console.log('message reieved');
      return data(null, message);
    });
  }

  const name = currentUser[0].name+' :'
   
  const sendMessage = (room, messages) => {
    const message = currentUser[0].name+': '+ messages
    if (socket) socket.emit('chat', { message,room});
  }

  const handleInput = (event) => {
    setMessage(event.target.value)
  }

  

  return (
    <React.Fragment>
    <div style={{marginRight:'10%',overflowY:'scroll',maxHeight:'50%',maxWidth:'80%'}} className="email">




      
      { chat.map((message,i) => 
      <p key={i}>{message}</p>) } 
         
 
    </div>    
    <div className="messbox">
    <span
        onClick={() => setShowLive(false)}
        style={{
          color: "red",
          cursor: "pointer",
          position: "absolute",
          left: "98%",
        }}
      >
        x
      </span>
     <textarea type="text" onChange={handleInput} value={messages}/>
     <button style={{width:'100px'}}  onClick={()=> sendMessage(room,messages)}>Send</button>
     </div>
     </React.Fragment>
  );
}
export default Sockets;