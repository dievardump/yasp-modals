/**
 * /!\ WARNING
 *
 * What follow is only for development purpose.
 * Do not put this in production
 */
let express = require('express');
let path = require('path');
let app = express();
let directories = require('./examples.json');

app.use(express.static(__dirname));
app.set('views', path.resolve(__dirname));

// setting up /
app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// setting up all examples
directories.forEach((example_dir) => {
  const route = example_dir;
  app.get(`/${route}/*`, async function (req, res) {
    res.sendFile(path.join(__dirname, example_dir, 'index.html'));
  });
});

const port = process.env.PORT || 3333;
app.listen(port, function () {
  console.log(`Connect to the page: http://localhost:${port}`);
});
