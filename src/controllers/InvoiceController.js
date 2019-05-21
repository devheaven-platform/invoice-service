const path = require( "path" );
const fs = require( "fs" );

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
        return res.status( 404 ).json( new ApiError( "Invoice not found" ) );
    }

    return res.json( invoice );
};

/**
 * Gets a pdf from an invoice.
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getPdfByInvoiceId = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const invoice = await InvoiceService.getInvoiceById( req.params.id );

    if ( !invoice ) {
        return res.status( 404 ).json( new ApiError( "Invoice not found" ) );
    }

    const pdf = path.resolve( `${ __dirname }/../../invoices/${ req.params.id }.pdf` );

    if ( !fs.existsSync( pdf ) ) {
        return res.status( 404 ).json( new ApiError( "Pdf not found" ) );
    }

    return res.sendFile( pdf );
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

/**
 * Updates a existing invoice
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateInvoice = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    if ( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are required" ) );
    }

    const errors = validate.update( req.body );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const invoice = await InvoiceService.updateInvoice( req.params.id, req.body );

    return res.status( 200 ).json( invoice );
};

/**
 * Deletes a invoice
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteInvoice = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const invoice = await InvoiceService.deleteInvoice( req.params.id );

    if ( !invoice ) {
        return res.status( 404 ).json( new ApiError( "Invoice not found" ) );
    }

    return res.status( 204 ).send();
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    getPdfByInvoiceId,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
