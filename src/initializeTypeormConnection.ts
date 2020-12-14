import { User } from './entity/User';
import { createConnection } from 'typeorm';
(async () => {
  try {

    await createConnection({
      type: "mongodb",
      useUnifiedTopology: true,
      useNewUrlParser: true,
      database: "firstproject",
      url: process.env.NODE_ENV === 'production' ? process.env.MONGO_DB_URI : '',
      entities: [
        User
      ]
    });
    console.log('connection is successeded ....');

  } catch (error) {
    console.log(error);

    console.log('connection is failured ...');

  }
})();