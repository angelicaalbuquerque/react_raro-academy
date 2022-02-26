// import { createClient, RedisClientType } from 'redis';
const redis = require('redis');


const client = redis.createClient({
  url: `redis://localhost:6379`,
  password: 'redis-password-here'
});


console.log('vou escrever no redis.');
client.set('ola', 'mundo', (err) => {
  if (err) {
    return;
  }

  console.log('vou ler o valor do redis.');
  client.get('ola', (errorget, responseGet) => {
    if (errorget) {
      console.log(errorget);
      return;
    }

    console.log(responseGet);
    client.quit();
  });
});