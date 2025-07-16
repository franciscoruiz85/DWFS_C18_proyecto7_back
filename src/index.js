const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const PORT = process.env.PORT || 5000
const serverUrl = process.env.URL || `http://localhost:${port}`

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for managing users and products'
        },
        servers: [
            {
                url: serverUrl,
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

connectDB()
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = isProd
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_DEV;

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})
