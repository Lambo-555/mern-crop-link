const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/links.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  //BACK-END Node.js API
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  //FRONT-END React.js SPA
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.info(`server ON ${PORT}!`)
    });
  } catch (e) {
    console.error('ERROR on start', e.message);
    process.exit(1);
  }
}

start();

