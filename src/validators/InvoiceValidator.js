const GenericValidator = require( "./GenericValidator" );

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

module.exports = {
    id: GenericValidator.id,
    create,
};
