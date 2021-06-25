import * as express from 'express'
import * as swaggerJsDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import * as fs from 'fs'
import * as path from 'path'
import userRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'
import {config as dotenvConfig} from 'dotenv'
import * as bodyParser from 'body-parser'

import './db'
dotenvConfig()

const app = express()

const cors = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

// Set Response Headers
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({
    limit: '49mb',
}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}))


app.use('/api', userRoutes)
app.use('/api', postRoutes)


// Swagger Docs config
const swaggerFile = path.join(process.cwd(), "swagger.json")
const swaggerData = fs.readFileSync(swaggerFile, 'utf8')
const swaggerDocument = JSON.parse(swaggerData);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))



const PORT = process.env.PORT || 5000
app.listen(PORT,  () => {
    console.log('Server is listening on port ' + PORT);
})

