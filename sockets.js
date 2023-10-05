let ReadyPlayerCount=0;
function listen(io){
    const pongNameSpace= io.of('/pong')
    console.log('Setting...')
   
    pongNameSpace.on('connection', (socket)=>{
        let room;
        console.log('A user has connected!', socket.id);
        socket.on('ready', ()=>{
            room= 'room' + Math.floor(ReadyPlayerCount/2)
            
            socket.join(room);    
            console.log('Player ready', socket.id , ' In room ', room)
            ReadyPlayerCount++;
            if(ReadyPlayerCount % 2===0){
                pongNameSpace.in(room).emit('startGame', socket.id)
            }
        })
    
        //Send data except the sender
        socket.on('paddleMove', (paddleData)=>{
            socket.to(room).emit('paddleMove', (paddleData))
        })
    
        socket.on('ballMove', (ballData)=>{
            console.log('Sending Info Ball to ', room )
            socket.to(room).emit('ballMove', ballData);
        })
        
        socket.on('disconnect', (reason)=>{
            console.log(`Client ${socket.id} disconnected ${reason}`)
            socket.leave(room)
        })
    })
    
}

module.exports = {
    listen,
}