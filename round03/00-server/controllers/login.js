const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios');
const loginRouter = require('express').Router()

const usersURL = 'http://localhost:3004/users';


loginRouter.post('/', async (request, response) => {

    const body = request.body

    const res = await axios.get(`${usersURL}?username=${body.username}`);

    const user = res.data[0]

    const passwordCorrect = !user
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    // console.log('userForToken', userForToken)
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
