import express from "express";

const PORT = 8000;

const app = express();

app.get('/hello', (req, resp) => resp.send('Hello!'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));