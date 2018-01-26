const {Video} = require('../models')

module.exports = {

    uploadVideo(req,res){
        Video.create(req.body).then((video) => {
            res.send(video)
        }).catch((err) => {
            res.send({message: 'incorrect parameters', error: err})
        })
    },

    allVideos (req, res) {
        Video.findAll().then((videos) => {
            res.send(videos);
        })
    }
}