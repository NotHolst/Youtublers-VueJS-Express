const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const seq = new Sequelize(
    'youtublers', 'root', '',
    {
        dialect: 'sqlite',
        host: 'sqlite',
        storage: './youtublers.db'
    }
)
const db = {}

fs.readdirSync(__dirname).filter((f) => f != 'index.js')
.forEach((file) => {
    let model = seq.import(path.join(__dirname, file))
    db[model.name] = model
})

let User = seq.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
})
db['User'] = User

let Video = seq.define('Video', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING
})
Video.belongsTo(User)
db['Video'] = Video

let Comment = seq.define('Comment', {
    message: Sequelize.STRING
})
Comment.belongsTo(Video)
Comment.belongsTo(User)
db['Comment'] = Comment

let Rating = seq.define('Rating', {
    rating: Sequelize.BOOLEAN
})
User.belongsToMany(Video, {through: Rating})
db['Rating'] = Rating

let View = seq.define('View', {
})
View.belongsTo(User)
View.belongsTo(Video)
db['View'] = View


db.sequelize = seq
db.Sequelize = Sequelize

module.exports = db