/**
 * Retrieve the start date for a invoice
 *
 * @param {Object} invoice the invoice that has the id of the milestone
 * @param {Object} project the project that contains the milestones
 * @returns the start date for the invoice
 */
const getInvoiceStartDate = ( { startMilestone }, { milestones } ) => {
    if ( startMilestone && milestones ) {
        const milestone = milestones.find( m => m.id === startMilestone );
        if ( !milestone ) return null;
        return milestone.date;
    }
    return null;
};

/**
 * Retrieve the end date for a invoice
 *
 * @param {Object} invoice the invoice that has the id of the milestone
 * @param {Object} project the project that contains the milestones
 * @returns the end date for the invoice
 */
const getInvoiceEndDate = async ( { endMilestone }, { milestones } ) => {
    if ( endMilestone && milestones ) {
        const milestone = milestones.find( m => m.id === endMilestone );
        if ( !milestone ) return null;
        return milestone.date;
    }
    return null;
};

module.exports = {
    getInvoiceStartDate,
    getInvoiceEndDate,
};
