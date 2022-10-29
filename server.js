require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

// external packages
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// connect db function
const connect = require('./db/connect')

// initiate external packages
app.use(morgan('dev'))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())

// import routes
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const profileRoutes = require('./routes/profileRoute')

// using routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/contact', contactRoutes)
app.use('/api/v1/profile', profileRoutes)

const start = () => {
    
    try {
        connect(process.env.MONGO_URL)        
        app.listen(process.env.PORT || 3001, () => {
            console.log('server is running')
        })
    } catch (error) {
        console.log(error);
    }
}

start()
