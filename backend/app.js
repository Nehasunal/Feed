const express = require('express');

const path = require('path');
const router = express.Router();

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
const cors = require('cors')
const jwt=require('jsonwebtoken');



// app.use(cors())
app.use(cors({origin: "http://localhost:4200",credentials: true }));

const api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Router checking in router file
app.use('/api', api);

// app.use("/uploads",express.static(path.join("/uploads")));
app.use("/uploads",express.static(__dirname + "/uploads"));
//checking
const url1 =`${__dirname}/uploads`
console.log(url1);
app.get('/', (req, res, next) => res.send('Hello World!'));



app.listen(port, () => console.log(`Node app listening on port ${port}!`));



module.exports = router;
