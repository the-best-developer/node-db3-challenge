const db = require('../data/schemes.js');

const find = _ => {
      return db('schemes');
}

module.exports = {
    find
  }