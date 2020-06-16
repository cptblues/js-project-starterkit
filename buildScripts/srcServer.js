import express from 'express';
import path from 'path';
import open from 'open';

import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 1,"firstName":"Tammy","lastName":"Norton","email":"tnorton@gmail.com"},
    {"id": 1,"firstName":"Tina","lastName":"Lee","email":"lee.tina@gmail.com"},
  ]);
});

app.listen(port, (err) => {
  if (err) {
    /* eslint-disable no-console */
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})
