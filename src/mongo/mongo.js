const {MongoClient, ObjectId} = require("mongodb")

const uri = "mongodb://adminJurnal:admin123@127.0.0.1:27017/jurnal?authSource=jurnal&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=false";
const client = new MongoClient(uri, {useUnifiedTopology: true});

async function run() {
  try {
    await client.connect()
    const database = client.db('jurnal')
    const config_user = database.collection('config_user')
    const query = {};
    const config = await config_user.findOne(query);
    // const config = await config_user.find(query).toArray();
  } finally {
    await client.close()
  }
}

module.exports = {
  run: run
}
