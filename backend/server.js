const express = require('express');
const cors = require('cors');


const config = require("./utils/config");
const result = require("./utils/result")
const authorization = require('./routes/authorization');
const reviewRoutes = require('./routes/reviewsRoutes');
const movieRouter = require('./routes/movieRoutes')

const userRouter = require('./routes/userRoutes')


const app = express();

app.use(cors());
app.use(express.json());
app.use(authorization);


app.use('/user', userRouter);
app.use('/review', reviewRoutes)
app.use('/movie', movieRouter)

app.listen(config.port, () => {
    console.log(`Server Started On Port ${config.port}`)
})


