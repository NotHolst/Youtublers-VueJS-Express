const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')
const {User} = require('./models')
const parser = require('body-parser')
const fs = require('fs')
const jwt = require('jsonwebtoken')

if(!fs.existsSync('./uploads/'))fs.mkdirSync('./uploads/')
if(!fs.existsSync('./public/'))fs.mkdirSync('./public/')
if(!fs.existsSync('./public/videos/'))fs.mkdirSync('./public/videos/')
if(!fs.existsSync('./public/thumbnails/'))fs.mkdirSync('./public/thumbnails/')

const app = express();
const io = require('socket.io')(1337);

var authenticatedSockets = {}
io.on('connection', (socket) => {
    console.log('socket connected')

    socket.on('authenticate', (data) => {
        try {
            let user = jwt.verify(data.token, 'hashtag')
            socket.emit('notification', {message: 'authenticated'})
            authenticatedSockets[data.token] = socket
        } catch (error) {
            console.log(data)
            socket.disconnect(true)
        }
    })
})

app.use(cors());
app.use(parser.json());
app.use(express.static('./public/'))

require('./routes')(app, authenticatedSockets)

sequelize.sync().then(() => {  
    app.listen(8081);
})



process.openStdin().addListener('data', (data) => {
    switch(data.toString().trim()){
        case 'notify_all':
            io.emit('notification', {
                type: 'info',
                message: 'Test notification'
            })
        break;
    }
})