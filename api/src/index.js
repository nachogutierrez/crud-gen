const Generator = require('./generator')
const PORT = process.env.PORT || 3000

const app = require('express')()

app.get('/items', (req, res) => {
    const { n = 16, seed = 'foo' } = req.query
    
    const obj = Generator(seed).generateObject()
    const items = []
    for (let i = 0; i < n; i++) {
        items.push(obj.generator())
    }
    res.send(items)
})

app.get('/items/:id', (req, res) => {
    const { seed = 'foo' } = req.query
    const id = parseInt(req.params.id, 10)

    const obj = Generator(seed).generateObject()
    const items = []
    for (let i = 0; i < id; i++) {
        obj.generator()
    }
    res.send(obj.generator())
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})