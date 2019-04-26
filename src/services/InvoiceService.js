const Invoice = require( "../models/Invoice" );
const ItemService = require( "./ItemService" );

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

    // TODO: send event to project-management-service to retrieve the project (Use ItemService to create items)
    // TODO: send event to client-service to retrieve the client

    return invoice;
};

/**
 * Gets all invoices from the database
 *
 * @returns a list of invoices
*/
const getAllInvoices = async () => Invoice.find().exec();

/**
 * Gets a single invoice from the database
 *
 * @param {*} id the id of the invoice that will be retrieved
 * @returns the invoice with the given id
 */
const getInvoiceById = async id => Invoice.findById( id ).populate( {
    path: "items",
} ).exec();

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
};
