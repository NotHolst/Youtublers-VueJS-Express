const {User} = require('../models')
const sha1 = require('sha1');
const jwt = require('jsonwebtoken')

module.exports = {

    signup(req, res) {
        let body = req.body
        body.password = sha1(req.body.password)
        User.create(body).then((user) => {
            let token = jwt.sign({data: user}, 'hashtag', {expiresIn: 60*60*5})
            return res.send({
                token: token,
                user: user
            })
        }).catch( (err) => {
            res.status(400).send({status: 'error', error: err})
        })
    },

    login(req, res) {
        let {username, password} = req.body
        User.findOne({ where: { username: username } }).then((user) => {
            if(sha1(password) === user.password){
                let token = jwt.sign({data: user}, 'hashtag', {expiresIn: 60*60*5})

                return res.send({
                    token: token, 
                    user: user
                })
            }
            return res.status(403).send({error: 'Incorrect credentials'})
        })
    }

}