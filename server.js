// Including Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'production') {
 require('dotenv').config();   
({extended:false})};
app.use(bodyParser.json());
app.use(morgan(''))

// settings
app.set('port', process.env.PORT || 4000);


app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});