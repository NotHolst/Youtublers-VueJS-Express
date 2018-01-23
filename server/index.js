const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./models')
const {User} = require('./models')

const app = express();
app.use(parser.json());
app.use(cors());

const CreateUserTest = async (req, res) => {
    const user = await User.create({email: 'test', password: 'test'})
    res.send(user)
}

//need to look at part 2  before <21:22 for controllers

app.get('/', CreateUserTest);

sequelize.sync().then(() => {  
    app.listen(8081);
})