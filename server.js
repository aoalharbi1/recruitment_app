const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app)

app.listen(8000, () => console.log("listening on port 8000"));