const {Video} = require('../models')
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

module.exports = {

    uploadVideo(req,res){
        // console.log(req.file, req.files)

        let body = req.body;
        body.id = shortid.generate();
        
        let ext = path.extname(req.file.filename)
        
        if(ext != '.mp4'){
            return res.status(400).send('incorrect format')
        }else{
            fs.renameSync(req.file.path, './public/videos/' + body.id + ext)
            
            Video.create(body).then((video) => {
                res.send(video)
            }).catch((err) => {
                res.send({message: 'incorrect parameters', error: err})
            })
        }
    },

    allVideos (req, res) {
        Video.findAll().then((videos) => {
            res.send(videos);
        })
    }
}