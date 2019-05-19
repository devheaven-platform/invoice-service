const ApiError = require( "../models/Error" );
const validate = require( "../validators/InvoiceValidator" );
const InvoiceService = require( "../services/InvoiceService" );

/**
 * Gets all the invoices from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getAllInvoices = async ( req, res ) => {
    const invoices = await InvoiceService.getAllInvoices();
    return res.json( invoices );
};

/**
 * Gets a single invoice by it's id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getInvoiceById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const invoice = await InvoiceService.getInvoiceById( req.params.id );

    if ( !invoice ) {
        return res.status( 400 ).json( new ApiError( "Invoice not found" ) );
    }

    return res.json( invoice );
};

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

    if ( !invoice ) {
        return res.status( 404 ).json( new ApiError( "One or more milestones are not found" ) );
    }

    return res.status( 201 ).json( invoice );
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
};
