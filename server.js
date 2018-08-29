const express = require('express');
const serveStatic = require("serve-static");
const helmet = require('helmet');
const hpp = require('hpp');


const app = express();
const port = process.env.PORT || 5000;

app.use(serveStatic(__dirname + "/build"));
app.use(helmet());
app.use(hpp());

app.listen(port, function () {
    console.log('server started '+ port);
});

