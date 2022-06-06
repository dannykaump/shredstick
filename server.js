const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

app.use(cors())

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now FIRING on port ${PORT}!`)
})

MongoClient.connect('mongodb+srv://danielrkaump:hamden1216@cluster0.ejksv.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to Database')
        const db = client.db('shredstick')
        const surfCollection = db.collection('surfboards')
        const userCollection = db.collection('users')
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(bodyParser.json())

        app.use(express.static(__dirname + '/dist/'))

        app.get('/', (req, res) => {
            db.collection('surfboards').find().toArray()
                .then(results => {
                    res.render('index.ejs', { surfboards: results })
                    console.log(results)
                })
                .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection('users').find().toArray()
                .then(results => {
                    res.render('index.ejs', { users: results })
                    console.log(results)
                })
                .catch(error => console.error(error))
        })
        // create surfboard obj in database
        app.post('/surfboards', (req, res) => {
            surfCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        // create user obj in database
        app.post('/users', (req, res) => {
            userCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        //index
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })
        //all surfboards JSON
        app.get('/api', (req, res) => {
            surfCollection.find().toArray()
                .then(results => {
                    res.json(results)
                })
                .catch(error => console.error(error))
        })
        //search board by name || brand
        app.get('/api/:name', (req, res) => {
            const boardName = req.params.name.split(' ').join('').toLowerCase()
            surfCollection.find().toArray()
                .then(results => {
                    res.json(results.filter(obj => obj.model.toLowerCase().includes(boardName) || obj.brand.toLowerCase().includes(boardName)))
                })
                .catch(error => console.error(error))
        })

    })

    .catch(error => console.error(error))


// class Surfboard {
//     constructor(info, dims, fins) {
//         if (info) {
//             this.model = info[0]
//             this.brand = info[1]
//             this.type = info[2]
//             this.condition = info[3]
//             this.price = info[4]
//         }
//         if (dims) {
//             this.length = dims[0]
//             this.volume = dims[1]
//         }
//         if (fins) {
//             this.finType = fins[0]
//             this.finBox = fins[1]
//         }
//     }
//     getPrice = _ => `$${this.price}`
//     getVolume = _ => `${this.volume}L`
// }

//placeholder literal notaysh
// const whitenoiz = new Surfboard(['White Noiz', 'HS', 'shortboard', 'used', 200], ['5\'10', 28.5], ['futures', 'thruster'])

// const dreamcatcher = new Surfboard(['Dreamcatcher', 'Robert\'s', 'hybrid', 'good', 1000], ['6\'3', 38], ['futures', '5-fin'])

// const unknown = new Surfboard()

// const surfboards = [
//     whitenoiz,
//     dreamcatcher,
//     unknown
// ]

