const express = require("express");
const app = express();
const router = require('./routers/request')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at :${port}...`);
});