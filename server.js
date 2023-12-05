const express = require('express'); // importing the express module 
const app = express() // creates an instance of an express application
const http =require('http').createServer(app) // creates an HTTP server using the express application


const PORT =process.env.PORT || 3000 //sets the server to listen on a specified port (either the one defined in the PORT environment variable or 3000 if that variable is not set)

http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`) //logging message to the console that the server is listening on the specified port
})

app.use(express.static(__dirname +'/public'))

//creates a router to handle the route requests. 
app.get('/',(req,res) =>{
    //sending index.html file to client when they request the root route
    res.sendFile(__dirname+'/index.html')
})


//Socket

const io =require('socket.io')(http)

io.on('connection',(socket) =>{
    console.log('connected...')
    socket.on('message',(msg) => {
        socket.broadcast.emit('message',msg)
    })
})