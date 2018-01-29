const { execSync } = require('child_process');
const {Video} = require('../models')
const {Comment} = require('../models')
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {

    uploadVideo(req,res){
        
        if(req.body.token == undefined || jwt.verify(req.body.token, 'hashtag') == null){
            return res.status(403).send({error: 'unauthenticated'})
        }
        let user = jwt.verify(req.body.token, 'hashtag')

        let body = req.body;
        body.id = shortid.generate();
        body.UserId = user.data.id
        
        let ext = path.extname(req.file.filename)
        
        if(ext != '.mp4'){
            return res.status(400).send('incorrect format')
        }else{
            Video.create(body, {UserId: user.data.id}).then((video) => {
                let newPath = './public/videos/' + body.id + ext;
                fs.renameSync(path.resolve(req.file.path), path.resolve(newPath))
                execSync('ffmpeg -i ' + path.resolve(newPath) +' -vf "select=gte(n\\,1000)" -vframes 1 '+path.resolve('./public/thumbnails/'+body.id+'.png'))
                res.send(video)
            }).catch((err) => {
                res.send({message: 'incorrect parameters', error: err})
            })
        }
    },

    allVideos (req, res) {
        Video.findAll({include: ['User']}).then((videos) => {
            res.send(videos);
        })
    },

    userVideos (req, res){
        if(req.body.token == undefined || jwt.verify(req.body.token, 'hashtag') == null){
            return res.status(403).send({error: 'unauthenticated'})
        }
        let user = jwt.verify(req.body.token, 'hashtag')

        let videos = Video.findAll({where: {
            UserId: user.data.id
        }}).then((vids) => {
            return res.send(vids)
        })
    },

    getVideo (req, res) {
        Video.findOne({where: {id: req.query.v}, include: ['User']}).then((video) => {
            return res.send(video)
        })
    },

    getVideoComments (req, res) {
        Comment.findAll({where: {VideoId: req.query.v}, include: ['User']}).then((comments) => {
            return res.send(comments)
        })
    },

    addComment (req, res, sockets) {
        if(req.body.token == undefined || jwt.verify(req.body.token, 'hashtag') == null){
            return res.status(403).send({error: 'unauthenticated'})
        }
        let user = jwt.verify(req.body.token, 'hashtag')

        let body = req.body
        body.UserId = user.data.id

        Comment.create(body, {UserId: user.data.id}).then((comment) => {
            for (const key in sockets) {
                if (sockets.hasOwnProperty(key)) {
                    const socket = sockets[key];
                    console.log(JSON.stringify(key))
                    if(key != req.body.token) socket.emit('notification', {message: 'new comment on video', key: key})
                }
            }
            return res.send(comment)
        })

    }
}