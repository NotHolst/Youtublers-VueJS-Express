const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
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
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db