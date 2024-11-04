import express from "express";
import {default as Router} from './routes/index.js';
const app = express();
const port = 3001;


app.use(express.json());
app.use(Router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Exemple of listening : http://localhost:${port}`);
});