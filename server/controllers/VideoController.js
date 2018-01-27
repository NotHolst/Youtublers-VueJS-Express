const {Video} = require('../models')
const shortid = require('shortid')
module.exports = {

    uploadVideo(req,res){
        console.log(req.file, req.files)
        res.send('OK')
        // let body = req.body;
        // body.id = shortid.generate();
        // Video.create(body).then((video) => {
        //     res.send(video)
        // }).catch((err) => {
        //     res.send({message: 'incorrect parameters', error: err})
        // })
    },

    allVideos (req, res) {
        Video.findAll().then((videos) => {
            res.send(videos);
        })
    }
}