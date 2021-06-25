import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "ThisMustBeASecret"
const TOKEN_TYPE = 'Bearer'


function getTocken(data) {
    return  TOKEN_TYPE + ' ' + jwt.sign({ data }, JWT_SECRET, { expiresIn: '1h' })
}

function verify(token) {
    return jwt.verify(token, JWT_SECRET)
}


const loginRequireMiddleware = () => {
    return (req, res, next) => {

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === TOKEN_TYPE) {
            let token = req.headers.authorization.split(' ')[1]

            try {
                let result = verify(token)
                req.user = result.data
                next()
            } catch(error) {
                res.status(400).json(error)
            }

        } else {
            res.status(401).json({})
        }
    }
}

export default {
    getTocken,
    verify,
    loginRequireMiddleware
}
