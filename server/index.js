const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const path = require("path");
app.use(express.static(path.join(__dirname, "../build")));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})