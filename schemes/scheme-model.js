const db = require('../data/schemes.js');

const find = _ => {
      return db('schemes');
}

const findById = async(id) => {
    try{
        const selectedScheme = await db('schemes').where({ id }).first();
        return (selectedScheme) ? selectedScheme : null;
    }
    catch {
        return null;
    }
}

module.exports = {
    find,
    findById
  }