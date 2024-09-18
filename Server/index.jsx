const express = require('express');
const app = express();

const userRoutes = require('./ROUTES real/User');
const profileRoutes = require('./ROUTES real/Profile');
const paymentRoutes = require('./ROUTES real/Payments');
const courseRoutes = require('./ROUTES real/Course');

const database  = require('./CONFIG/database');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const {cloudinaryConnect} = require('./CONFIG/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

//cloudinary connect
cloudinaryConnect();

//ROUTES
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);


//default route
app.get('/', (req,res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running',
    })
})