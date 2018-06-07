const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.eventNames.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
