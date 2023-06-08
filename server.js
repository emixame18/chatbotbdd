const express = require("express")
const app = express()
const {Sequelize} = require("sequelize")
const Chat = require("./models/Chat")

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome"
    })
})

app.get('/allchats', async (req, res) => {

    const allchats = await Chat.findAll();

    res.status(200).json({
        data: allchats
    })
})

app.post('/createchat', (req, res) => {
    const chat = Chat.build({ question: req.body.question, answer: req.body.answer});
    (async function save(){
        await chat.save();
        console.log(chat);
        console.log('Chat was saved to the database!');
    })()
    res.status(200).json({
        message: "created"
    })
})

app.patch('/updatechat', (req, res) =>{

})

app.delete('/deletechat', (req, res) =>{

})

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

(async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})