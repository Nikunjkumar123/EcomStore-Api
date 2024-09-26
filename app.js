const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const PORT = process.env.PORT;
const connectDb = require('./db/connect.db.js')
const morgan = require('morgan');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js')
const authRouter = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const reviewRouter = require('./routes/reviewRoutes.js');
const fileUpload = require('express-fileupload');
const orderRouter = require('./routes/orderRoutes');


app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.static('./public'));
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.send('<h1>WELCOME TO ECCOMERCE STORE API ENDPOINTS</h1>)
})

app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies)
    res.send('ecommerce API')
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

connectDb(process.env.URL);
app.listen(PORT,()=>{
    console.log("connected to PORT ",PORT);
})
