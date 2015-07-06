// TODO: Should be some way to make this into a lib: `redis-from-config`
var redis = require("then-redis");
var config = require("config");

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
