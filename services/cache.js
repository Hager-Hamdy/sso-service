const redis = require('redis');
const config = require('../config');
const client = redis.createClient(6379);
const { promisify } = require('util');
client.connect()
//const setAsyncEx = promisify(client.setex).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on('error', err => {
    console.log('Error ' + err);
});

async function saveWithTtl(key, value, ttlSeconds = 60) {

    return await client.set(key, value)
    //setAsyncEx(key, ttlSeconds, JSON.stringify(value));
}

async function get(key) {
  //  await client.connect()
return client.get(key)
    // const jsonString = await getAsync(key);
    //
    // if (jsonString) {
    //     return JSON.parse(jsonString);
    // }
}

module.exports = {
    saveWithTtl,
    get
}