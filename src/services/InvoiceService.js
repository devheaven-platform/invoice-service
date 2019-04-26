const Invoice = require( "../models/Invoice" );

/**
 * Creates a new Invoice and calls the project
 * management service to retrieve the project based on it's id,
 * also calls client service to retrieve the client based on it's id
 *
 * @param {Object} newInvoice the invoice that will be added
 * @returns the newly created invoice or null if an error occurred
 */
const createInvoice = async ( newInvoice ) => {
    const invoice = new Invoice( newInvoice ).save();

    // TODO: send event to project-management-service to retrieve the project
    // TODO: send event to client-service to retrieve the client

    return invoice;
};

/**
 * Gets all invoices from the database
 *
 * @returns a list of invoices
*/
const getAllInvoices = async () => Invoice.find().exec();

module.exports = {
    createInvoice,
    getAllInvoices,
};
