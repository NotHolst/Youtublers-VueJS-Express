const VideoController = require('./controllers/VideoController')

module.exports = (app) => {

    app.get('/videos/upload', (req, res) => {
        VideoController.uploadVideo(req,res)
    })

    app.get('/videos/featured', (req, res) => {
        VideoController.allVideos(req,res)
    })

}