const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./models')
const {User} = require('./models')

const app = express();
app.use(parser.json());
app.use(cors());

require('./routes')(app)

sequelize.sync().then(() => {  
    app.listen(8081);
})