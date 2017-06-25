const mongoose = require('mongoose');
const co = require('co');
mongoose.Promise = global.Promise;

// Constants
const GITHUB_ISSUE = `gh-3108`;
const BYTE_CAP = 10000000000;
const NUM_JUICES = 500;

// Globals
let Juice;

// run program
exec()
  .catch(error => {
    console.error(`Error: ${error}\n${error.stack}`);
    process.exit(2);
  });


function exec() {
  return createDb()
    .then(() => createCollection())
    .then(() => initialData())
    .then(() => startTailableCursor())
    .then(() => {
      setInterval(createEntries, 3000);
    })
}

// used for setInterval so we can create a fake stream of data
function createEntries() {
  return co(function* () {

    for (let i = 0; i < NUM_JUICES; i++) {
      yield Juice.create({ name: `juice${i}` })
    }

  });
}

// starts the cursor and sets listeners
function startTailableCursor() {
  return new Promise(function(resolve, reject) {
    const cursor = Juice
      .find()
      .tailable()
      .stream();

    cursor.on('data', (doc) => {
      console.log('doc', doc);
    });
    cursor.on('close', function() {
      console.log('closing...');
      resolve();
    });

    cursor.on('error', error => {
      console.error(error);
      cursor.destroy();
      reject(error);
    });

    return co(function* () {
      for (let i = 0; i < NUM_JUICES; i++) {
        yield Juice.create({ name: `juice${i}` })
      }
      resolve();
    }).catch(error => {
      console.error('co error', error);
      cursor.destroy();
      reject(error);
    })
  });
}

// creates initial entry in table 
function initialData() {
  return co(function* () {
    yield Juice.create({ name: 'initial-juice' });
  });
}

// creates Juice collection
function createCollection() {
  return co(function* () {
    const juiceSchema = new mongoose.Schema({
      name: String
    }, { capped: BYTE_CAP });

    Juice = mongoose.model('Juice', juiceSchema);
  });
}

function createDb() {
  return co(function* () {
    const db = mongoose.connect(`mongodb://localhost:27017/${GITHUB_ISSUE}`);
    return db;
  });
}