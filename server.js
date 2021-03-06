const express = require('express');
const serveStatic = require("serve-static");
const helmet = require('helmet');
const hpp = require('hpp');


const app = express();
const port = process.env.PORT || 3000;

app.use(serveStatic(__dirname + "/build"));
app.use(helmet());
app.use(hpp());


app.listen(port, '0.0.0.0', function () {
    console.log('server started '+ port);
});

