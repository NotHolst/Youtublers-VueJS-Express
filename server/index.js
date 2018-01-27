const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')
const {User} = require('./models')
const parser = require('body-parser')

const app = express();
app.use(cors());
app.use(parser.json());
app.use(express.static('./public'))

require('./routes')(app)

sequelize.sync().then(() => {  
    app.listen(8081);
})