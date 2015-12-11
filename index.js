// TODO: Should be some way to make this into a lib: `redis-from-config`
var redis = require("redis");
var bluebird = require("bluebird");
var config = require("config");

// NOTE: Promisify all redis methods
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// Create and configure the redis client
var client = redis.createClient(
  {
    "port": config.get("redis.port"),
    "host": config.get("redis.host"),
    "auth_pass": config.get("redis.password")
  }
);

// Export the redis client
module.exports = client;

// Select the database index (think name in traditional SQL)
client.select(config.get("redis.database"));
