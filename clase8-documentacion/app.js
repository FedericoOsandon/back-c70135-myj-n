const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const appRouter = require('./routes/index.js')



const cors = require('cors')
const { configObject } = require('./config/index.js')
const { fork } = require('child_process')
const { handleError } = require('./middleware/handleError.middleware.js')
const { addLogger, logger } = require('./utils/logger.js')

//importar módulo de swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
// const { dirname } = require('path')


const app = express() 
const { port, mongo_url }  = configObject

const PORT = port
const connection = mongoose.connect(mongo_url)

/* The lines `app.use(express.json())`, `app.use(cookieParser())`, `app.use(cors())`, and
`app.use(addLogger)` are setting up middleware functions in an Express.js application. */
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(addLogger)

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentación de app web de Adoptame',
            description: 'Esta es la documentación api de una app web para adopción de mascotas'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(appRouter)
app.use(handleError)

const serverListen = () => {
    return app.listen(PORT,()=> logger.info(`Listening on ${PORT}`))

}
module.exports = {
    serverListen
}
