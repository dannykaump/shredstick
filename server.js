const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

class Surfboard {
    constructor(model, brand, condition, price, length, type) {
        this.model = model || 'n/a'
        this.brand = brand || 'n/a'
        this.type = type || 'n/a'
        this.condition = condition || 'n/a'
        this._price = price || 0
        this.price = this._price
        this.length = length || 'n/a'
    }
    getPrice = _ => `$${this.price}`
}

class Hybrid extends Surfboard {
    constructor(model, brand, condition, price, length) {
        super(model, brand, condition, price, length)
        this.type = 'hybrid'
    }
}

class Shortboard extends Surfboard {
    constructor(model, brand, condition, price, length) {
        super(model, brand, condition, price, length)
        this.type = 'shortboard'
    }
}

class Longboard extends Surfboard {
    constructor(model, brand, condition, price, length) {
        super(model, brand, condition, price, length)
        this.type = 'longboard'
    }
}

const whitenoiz = new Shortboard('White Noiz', 'HS', 'used', 200, {
    '5\'10': {
        'volume': 28.5
    }
})

const dreamcatcher = new Hybrid('Dreamcatcher', 'Robert\'s', 'good', 1000, {
    '6\'3': {
        'volume': 38
    }
})

const unknown = new Surfboard()

const surfboards = [
    whitenoiz,
    dreamcatcher,
    unknown
]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req, res) => {
    res.json(surfboards)
})

app.get('/api/:name', (req, res) => {
    const boardName = req.params.name.split(' ').join('').toLowerCase()

    if (surfboards[boardName]) {
        res.json(surfboards[boardName])
    } else {
        res.json(unknown)
    }

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now firing on port ${PORT}!`)
})

setTimeout(() => {
    console.log(dreamcatcher.getPrice())
}, 1000)