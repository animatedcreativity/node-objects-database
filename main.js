var NoSQL = require('nosql'), db;
exports.start = function(dbName) {
  db = NoSQL.load(dbName + ".nosql");
}
exports.db = function() {
  return db;
}
exports.set = function(key, object) {
  return new Promise(function(resolve, reject) {
    exports.get(key, object[key]).then(function(response) {
      if (response.length > 0) {
        exports.update(key, object).then(function(response) {
          resolve(response);
        }).catch(function(error) {
          reject(error);
        });
      } else {
        exports.insert(key, object).then(function(response) {
          resolve(response);
        }).catch(function(error) {
          reject(error);
        });
      }
    }).catch(function(error) {
      reject(error);
    });
  });
}
exports.get = function(key, value) {
  return new Promise(function(resolve, reject) {
    db.find().where(key, value).callback(function(error, response) {
      if (error) {
        reject(error);
        return false;
      }
      resolve(response);
    });
  });
}
exports.insert = function(key, object) {
  return new Promise(function(resolve, reject) {
    db.insert(object, true).where(key, object[key]).callback(function(error, response) {
      if (error) {
        reject(error);
        return false;
      }
      resolve(response);
    });
  });
}
exports.update = function(key, object) {
  return new Promise(function(resolve, reject) {
    db.update(object).where(key, object[key]).callback(function(error, response) {
      if (error) {
        reject(error);
        return false;
      }
      resolve(response);
    });
  });
}
exports.remove = function(key, value) {
  return new Promise(function(resolve, reject) {
    db.remove().where(key, value).callback(function(error, response) {
      if (error) {
        reject(error);
        return false;
      }
      resolve(response);
    });
  });
}
exports.clear = function() {
  return new Promise(function(resolve, reject) {
    db.clear().callback(function(error, response) {
      if (error) {
        reject(error);
        return false;
      }
      resolve(response);
    });
  });
}
exports.find = function(arg1, arg2) {
  if (typeof arg1 !== "object") {
    if (typeof arg1 !== "undefined") {
      var obj = {};
      obj[arg1] = arg2;
      arg1 = obj;
    } else {
      arg1 = {};
    }
  }
  return new Promise(function(resolve, reject) {
    db.find().make(function(filter) {
      for (var key in arg1) {
        filter.where(key, arg1[key]);
      }
      filter.callback(function(error, response) {
        if (error) {
          reject(error);
          return false;
        }
        resolve(response);
      });
    });
  });
}
exports.count = async function(key) {
  return await new Promise(function(resolve, reject) {
    exports.find().then(function(response) {
      if (typeof key !== "undefined") {
        var results = [];
        for (var i=0; i<=response.length-1; i++) {
          if (typeof response[i][key] !== "undefined") results.push(response[i]);
        }
        resolve(results);
      } else {
        resolve(response);
      }
    }).catch(function(error) {
      reject(error);
    });
  });
}