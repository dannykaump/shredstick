const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://danielrkaump:hamden1216@cluster0.ejksv.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('twain-quotes')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(bodyParser.json())

        app.use(express.static('public'))

        app.listen(3000, function () {
            console.log('listening on 3000')
        })

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))

console.log('May Node be with you')

class Surfboard {
    constructor(info, dims, fins) {
        if (info) {
            this.model = info[0]
            this.brand = info[1]
            this.type = info[2]
            this.condition = info[3]
            this.price = info[4]
        }
        if (dims) {
            this.length = dims[0]
            this.volume = dims[1]
        }
        if (fins) {
            this.finType = fins[0]
            this.finBox = fins[1]
        }
    }
    getPrice = _ => `$${this.price}`
    getVolume = _ => `${this.volume}L`
}

//placeholder literal notaysh
const whitenoiz = new Surfboard(['White Noiz', 'HS', 'shortboard', 'used', 200], ['5\'10', 28.5], ['futures', 'thruster'])

const dreamcatcher = new Surfboard(['Dreamcatcher', 'Robert\'s', 'hybrid', 'good', 1000], ['6\'3', 38], ['futures', '5-fin'])

const unknown = new Surfboard()

const surfboards = [
    whitenoiz,
    dreamcatcher,
    unknown
]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
//all surfboards JSON
app.get('/api', (req, res) => {
    res.json(surfboards)
})
//search board by name 
app.get('/api/:name', (req, res) => {
    const boardName = req.params.name.split(' ').join('').toLowerCase()

    if (surfboards[boardName]) {
        res.json(surfboards[boardName])
    } else {
        res.json(unknown)
    }

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now FIRING on port ${PORT}!`)
})

setTimeout(() => {
    console.log(dreamcatcher.getPrice())
    console.log(dreamcatcher.getVolume())
}, 1000)


const submit = document.getElementById('submit')

submit.addEventListener('click', {

})