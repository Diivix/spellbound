import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import user from '../models/user';
import express from 'express';
import userController from './controllers/userController';

// May require additional time for downloading MongoDB binaries
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

let mongoServer;
// const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above
let app;

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer({
    instance: {
      dbName: "spellbound"
    },
    debug: true
  });
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });

  app = express();
  app.use('/api/users', userController);
  app.listen("443", function () {
    console.log('Jest Express server listening on port 443');
});
});

afterAll(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('...', () => {
  it("shoud create a user", async () => {
    const User = mongoose.model('User', new mongoose.Schema({ name: String }));
    const cnt = await User.count();
    expect(cnt).toEqual(0);

    const url = "http://localhost:443/api/users/create"
    const payload = {
      name: "jest-test",
      email: "jest-test@spellbound.com",
      password: "test",
      passwordConf: "test"
    }

    fetch(url, {
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
    });

    user.findOne({"email": "jest-test@spellbound.com"}, function(err, user) {
      if (err) {
        throw Error(response.statusText);
      }

      expect(user).toEqual(payload);
    });

  });
});