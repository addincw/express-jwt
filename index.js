const express = require('express')
const jwt = require('jsonwebtoken')

const isAuthorized = require('./middlewares/isAuthorized')

const Member = require('./models/Member')

const app = express()

const PORT = process.env.PORT || 3000

//set parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set routes
app.get('/', (request, response) => {
    return response.json({ message: 'welcome to the API' })
})
app.post('/api/login', (request, response) => {
    let member = Member.first(request.body.username);

    if(Object.keys(member).length === 0) {
        return response.json({ message: 'username not found' })
    }

    // jwt.sign({user: member}, 'secret', (error, token) => {
    jwt.sign({user: member}, 'secret', {expiresIn: '30s'}, (error, token) => {
        member.token = token
        return response.json(member)
    })
    
})
app.get('/api/members', isAuthorized, (request, response) => {
    jwt.verify(request.token, 'secret', (error, authData) => {
        if(error) return response.json({ message: 'token not match'})

        return response.json(Member.get())
    })
})


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
