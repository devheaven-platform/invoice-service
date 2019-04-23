/**
 * Gets all the invoices from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getAllInvoices = async ( req, res ) => {};

/**
 * Gets a single invoice by it's id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getInvoiceById = async ( req, res ) => {};

/**
 * Creates a new invoice
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createInvoice = async ( req, res ) => {};

/**
 * Updates a existing invoice
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateInvoice = async ( req, res ) => {};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
};
