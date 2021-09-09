const configValues = {
  "mongo.username": "MONGO_USERNAME",
  "mongo.password": "MONGO_PASSWORD",
  "mongo.host": "MONGO_HOST",
  "mongo.db": "MONGO_DB",
};

function validateConfig(config) {
  Object.entries(configValues).forEach(([key, value]) => {
    const found = key.split(".").reduce((config, k) => config[k], config);
    if (!found) {
      console.warn(`Config Missing '${value}' env variable`);
    }
  });
}

module.exports = validateConfig;
