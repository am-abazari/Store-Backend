const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (error) => console.log("Redis Error : " + error));
redisClient.on("connected", () => console.log("Ready to Use Redis"));
redisClient.on("end", () => console.log("Disconnected From Redis"));

module.exports = redisClient;