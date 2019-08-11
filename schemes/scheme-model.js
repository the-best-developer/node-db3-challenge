const db = require('../data/schemes.js');

const find = _ => {
      return db('schemes');
}

const findById = (id) => {
    return db('schemes').where({ id }).first();
}

module.exports = {
    find,
    findById
  }