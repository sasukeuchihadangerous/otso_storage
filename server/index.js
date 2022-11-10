import express from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//routers
import authRouter from "./routers/auth.router.js"  

const PORT = config.get('serverPort');

const app = express();

app.use(cors({origin:['http://www.localhost:3000', 'http://localhost:3000'],credentials: true}));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на порту ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();