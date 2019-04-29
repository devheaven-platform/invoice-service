const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create invoice request
 * @param {*} body  the body containing the invoice values
 * @returns an error object containing the field errors
 */
const create = ( body ) => {
    const errors = {};

    if ( !GenericValidator.id( body.client ) ) {
        errors.client = "Client must be a valid UUID";
    }

    if ( !GenericValidator.id( body.project ) ) {
        errors.project = "Project must be a valid UUID";
    }

    return errors;
};

/**
 * Validates the update invoice request
 * @param {*} body  the body containing the invoice values
 * @returns an error object containing the field errors
 */
const update = ( body ) => {
    const errors = {};

    if ( body.client !== undefined && !GenericValidator.id( body.client ) ) {
        errors.client = "Client must be a valid UUID";
    }

    if ( body.client !== undefined && !GenericValidator.id( body.project ) ) {
        errors.project = "Project must be a valid UUID";
    }

    if ( body.archived !== undefined && !GenericValidator.isBoolean( body.archived ) ) {
        errors.archived = "Archived must be of type boolean";
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};
/* eslint complexity: 0 */
