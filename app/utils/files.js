var fs = require("fs");

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      return err ? reject(err) : resolve(data);
      //intitial
    });
  });
};

module.exports = {
  readFile,
};
