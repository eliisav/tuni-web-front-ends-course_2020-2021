const router = require('express').Router()
const axios = require('axios');
const bcrypt = require('bcrypt')

const usersURL = 'http://localhost:3004/users';


router.get('/', async (request, response) => {

    // --
    // 2021-04-26 / TiM
    // const res = await axios.get(usersURL);
    const res = await axios.get(`${usersURL}?_embed=blogs`);
    // --

    response.json(res.data);
})


router.post('/', async (request, response, next) => {

    try {
        const body = request.body

        if (!body.password) {
            throw {
                name: 'ValidationError',
                message: 'User validation failed: Path `password` is required.'
            }
        }

        if (body.password.length < 3) {
            throw {
                name: 'ValidationError',
                message: 'User validation failed: Path `password` is shorter than minimum allowed length (3).'
            }
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = {
            username: body.username,
            name: body.name,
            passwordHash,
        }

        const res = await axios.post(usersURL, user)
        response.status(201).json(res.data)

    }
    catch (error) { next(error) }
})

module.exports = router
