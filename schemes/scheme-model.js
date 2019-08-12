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

const add = async (scheme) => {

    try {
        // Check if scheme_name exists
        !(scheme.scheme_name) && null
        // If so, insert scheme into database
        const insertedScheme = await db('schemes').insert(scheme);
        // db.insert returns ID of newly added scheme, check if valid
        !(insertedScheme) && null;
        // select scheme from the database that matches the ID of the newly inserted scheme
        const selectedInsteredScheme = await db('schemes').where({ id: insertedScheme[0] }).first();
        // Check if valid
        !(selectedInsteredScheme) && null
        // Return added scheme
        return selectedInsteredScheme;
    }
    catch (err) {
        return err.message;
    }
}

const update = async (newData, id) => {
    try {
        // Attempt to select scheme at specified ID
        const checkSchemeExists = await db('schemes').where({ id });
        // If available, move on. If not, return null
        !(checkSchemeExists) && null;
        // Update scheme entry with newData
        const updatedScheme = await db('schemes').where({ id }).update(newData);
        // db.update returns the number of changes made. Check if entry updated
        !(updatedScheme) && null;
        // Select updated scheme entry to be returned
        const selectUpdatedScheme = await db('schemes').where({ id });
        // Check if scheme could be selected
        !(selectUpdatedScheme) && null;
        // Return updated scheme
        return selectUpdatedScheme;
    }
    catch (err) {
        return err.message;
    }
}

const remove = async (id) => {
    try{
        // Select scheme at id
        const selectScheme = await db('schemes').where({ id }).first();
        // If not found return null;
        !(selectScheme) && null;
        // Delete scheme by id
        const deletedScheme = await db('schemes').where({ id}).del();
        // deletedScheme returns number of changes made. Check if delete was successful
        !(deletedScheme) && null;
        // Return deleted scheme
        return selectScheme;

    }
    catch (err) {
        return err.message;
    }
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
  }