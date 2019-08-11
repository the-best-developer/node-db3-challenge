const db = require('../data/schemes.js');

const find = _ => {
      return db('schemes');
}

const findById = async (id) => {
    try{
        const selectedScheme = await db('schemes').where({ id }).first();
        return (selectedScheme) ? selectedScheme : null;
    }
    catch {
        return null;
    }
}

const findSteps = async (id) => {
    const selectedStep = await
        // Select scheme table and alias as sc
        db('schemes as sc')
        // Join steps table row when scheme ID matches scheme_id in steps table
        .join('steps as st', 'sc.id', '=', 'st.scheme_id')
        // Build table using steps and schemem data together
        .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        // Only select steps that match the given scheme
        .where({ scheme_id: id } )
        // Sort by step_number, in ascending order
        .orderBy('st.step_number', 'asc');
        // If everything checks out, return array
        return (selectedStep) ? selectedStep : null;
}

module.exports = {
    find,
    findById,
    findSteps
  }