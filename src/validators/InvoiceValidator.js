const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create invoice request
 * @param {*} body  the body containing the invoice values
 * @returns an error object containing the field errors
 */
const create = ( body ) => {
    const errors = {};

    if ( !GenericValidator.id( body.project ) ) {
        errors.project = "Project must be a valid UUID";
    }

    if ( body.endMilestone && !GenericValidator.id( body.endMilestone ) ) {
        errors.endMilestone = "End milestone must be a valid UUID";
    }

    if ( body.startMilestone ) {
        if ( !body.endMilestone ) {
            errors.startMilestone = "There must be a end milestone if there is a start milestone";
        } else if ( !GenericValidator.id( body.startMilestone ) ) {
            errors.startMilestone = "Start milestone must be a valid UUID";
        }
    }

    if ( body.items && body.items.length > 0 ) {
        body.items.forEach( ( item ) => {
            if ( !GenericValidator.isString( item.description ) ) {
                errors.description = "Item description must be of type string";
            }
            if ( !GenericValidator.isNumber( item.cost ) ) {
                errors.cost = "Item cost must be of type number";
            }
        } );
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
