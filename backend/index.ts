const express = require("express");
const db = require("./database.ts");
const app = express();

const userRoute = require('./routes/users.ts');
const positionRoute = require('./routes/positions.ts');

app.use(express.json());
app.use('/', userRoute);
app.use('/', positionRoute);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
