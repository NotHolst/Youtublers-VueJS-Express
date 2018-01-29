const AuthenticationController = require('./controllers/AuthenticationController')
const VideoController = require('./controllers/VideoController')
const multer = require('multer')
const path = require('path')

module.exports = (app, sockets) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            let fileExt = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + Date.now() + fileExt)
        }
      })
    
    const upload = multer({ storage: storage })

    app.post('/signup', (req, res) => {
        AuthenticationController.signup(req, res)
    })

    app.post('/login', (req, res) => {
        AuthenticationController.login(req, res)
    })

    app.post('/videos/upload', upload.single('video'), (req, res) => {
        VideoController.uploadVideo(req,res)
    })

    app.get('/videos/popular', (req, res) => {
        VideoController.allVideos(req,res)
    })

    app.get('/video', (req, res) => {
        VideoController.getVideo(req,res)
    })

    app.get('/videocomments', (req, res) => {
        VideoController.getVideoComments(req,res)
    })

    app.post('/comment', (req, res) => {
        VideoController.addComment(req,res, sockets)
    })

    app.post('/user/videos', (req, res) => {
        VideoController.userVideos(req,res)
    })

}