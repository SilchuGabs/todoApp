const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        /**
         *   We get the token that sends the user. Then we need to get the jwt, for that 
         we need to remove the "Bearer", the beg. portion. 
         If there is no Authorization header, it will return undefined
         *  
         **/
        const token = req.header('Authorization').replace('Bearer ', '')
            //This will tell us if a given token is valid
        const decoded = jwt.verify(token, 'todoApp')
            //If it is valid, then we can proceed to search for the User with authn token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth