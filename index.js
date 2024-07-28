import express from 'express';
import { connectionDB } from "./DB/connection.js";
import userRouter from "./src/modules/User/user.routes.js";
import messageRouter from "./src/modules/Message/message.routes.js";
import { globalResponse } from './src/middlewares/error-handle.middleware.js';


const app = express();
const port = 3000;

connectionDB();

app.use(express.json());

app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use(globalResponse);

process.on('unhandledRejection', (err)=> {
    console.log('error', err);
});

app.listen(port, () => console.log(`App listening on port ${port}`));


