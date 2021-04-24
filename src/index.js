const app = require('./server')
const port = 9999

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});