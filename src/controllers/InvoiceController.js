const ApiError = require( "../models/Error" );
const validate = require( "../validators/InvoiceValidator" );
const InvoiceService = require( "../services/InvoiceService" );

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
const createInvoice = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const invoice = await InvoiceService.createInvoice( req.body );

    return res.status( 201 ).json( invoice );
};

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
