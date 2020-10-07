const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

async function start(){
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {console.info(`server ON ${PORT}!`)});
  } catch (e) {
    console.error('ERROR on start', e.message);
    process.exit(1);
  }
}

start();

