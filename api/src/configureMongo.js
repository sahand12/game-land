const { MongoClient } = require('mongodb');
const assert = require('assert');
// import uuid from 'uuid/v1';

async function configureMongo(dbname) {
  // connection url
  const url = `mongodb://localhost:27017/${dbname}`;
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db(dbname);
    return [client, db];
  } catch (err) {
    console.log(err.stack);

    // Close Connection
    return client.close();
  }
}

// run().catch(err => console.log('ERROR', err.message, err.stack));

export default configureMongo;
