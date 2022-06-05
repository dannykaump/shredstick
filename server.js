const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

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

class Longboard extends Surfboard {
    constructor(info, dims) {
        super(info, dims)
        this.type = 'longboard'
    }
}

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
//all surfboards
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