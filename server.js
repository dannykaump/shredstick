const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

class Surfboard {
    constructor(model, brand, type, length) {
        this.model = model || 'unknown'
        this.brand = brand || 'unknown'
        this.type = type || 'unknown'
        this.length = length || 'unknown'
    }
}

const whitenoiz = new Surfboard('White Noiz', 'HS', 'hpsb', {
    '5\'10' : {
        'volume' : 28.5
    }
})

const dreamcatcher = new Surfboard('Dreamcatcher', 'Robert\'s', 'hybrid', {
    '6\'3': {
        'volume' : 38
    }
})

const dumpsterdiver = new Surfboard()

const surfboards = {
    whitenoiz,
    dreamcatcher,
    dumpsterdiver
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api', (request, response) => {
    response.json(surfboards)
})

app.get('/api/:name', (request, response) => {
    const boardName = request.params.name.split(' ').join('').toLowerCase()

    if (surfboards[boardName]) {
        response.json(surfboards[boardName])
    } else {
        response.json(surfboards)
    }

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})