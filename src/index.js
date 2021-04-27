const app = require('./server')
const { port } = require('./tools/config')

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});