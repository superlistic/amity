const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://app-user-joke:${process.env.MONGO_PW}@cluster0.nq5ro.mongodb.net/<dbname>?retryWrites=true&w=majority`;

module.exports.connect = collectionName => {
  return new Promise((resolve, reject) => {
    console.log('MongoDB: connecting');
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB: getting collection ${collectionName}..`);
    client.connect(async err => {
      if (err) reject(err);
      process.on('SIGINT', () => {
        client.close(() => {
          console.log(
            `MongoDB: connetion to collection ${collectionName} closed.`
          );
          process.exit(0);
        });
      });
      const db = await client.db('test').collection(collectionName);
      console.log('MongoDB: got collection ' + collectionName);
      resolve(db);
    });
  });
};
