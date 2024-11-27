import express from "express";
import {default as Router} from './routes/index.js';
const app = express();
const port = 3001;

import internalIp from 'internal-ip';

app.use(express.json());
app.use(Router);

const internalIP = internalIp.v4.sync();


app.listen(port,internalIP, () => {
    console.log(`Exemple of listening : http://${internalIP}:${port}`);
});
/*
app.listen(port, () => {
    console.log(`Exemple of listening : http://localhost:${port}`);
});*/