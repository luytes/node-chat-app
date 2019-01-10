const path = require('path'); // build in module
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
// const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});

