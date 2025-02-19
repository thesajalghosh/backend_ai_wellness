const express = require('express');
require('./db/conn');
const app = express();
const port = process.env.Port || 4000;
const voteRouter =  require("./routes/vote");
const nomineeRouter =  require("./routes/nominee");

// for Vote Routes
app.use('/api/v1',voteRouter);
// for nominee routes
app.use('/api/v1',nomineeRouter);

app.listen(port,() =>{
    console.log(`listening on ${port}`);
})