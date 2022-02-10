const express = require('express')
const apiRoutes = require('./routes/api')
const adminRoutes = require('./routes/admin')

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(express.json())

app.use('/api', apiRoutes)
app.use("/", adminRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});