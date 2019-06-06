const axios = require( "axios" );
const { flatten } = require( "lodash" );

const PdfService = require( "./PdfService" );
const Invoice = require( "../models/Invoice" );
const InvoiceItemService = require( "./InvoiceItemService" );
const { createQueryString } = require( "../utils/QueryString" );
const { getInvoiceStartDate, getInvoiceEndDate } = require( "../utils/Date" );

const projectUri = process.env.PROJECT_MANAGEMENT_URI;
const taskUri = process.env.TASK_MANAGEMENT_URI;

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

/**
 * Creates a new Invoice and calls the project
 * management service to retrieve the project based on it's id,
 * also calls client service to retrieve the client based on it's id
 *
 * @param {Object} data the invoice that will be added
 * @returns the newly created invoice or null if an error occurred
 */
const createInvoice = async ( data, token ) => {
    const newInvoice = data;

    const { data: project } = await axios.get( `${ projectUri }/projects/${ newInvoice.project }`, { headers: { Authorization: token } } );
    const startDate = await getInvoiceStartDate( newInvoice, project );
    const endDate = await getInvoiceEndDate( newInvoice, project );

    const boards = await axios.get( `${ taskUri }/boards/for/${ newInvoice.project }${ createQueryString( { start: startDate, end: endDate } ) }`, { headers: { Authorization: token } } );

    // TODO: retrieve client from the client service

    const margin = 1 + ( project.invoiceMargin / 100 );

    if ( newInvoice.items ) {
        newInvoice.items = await Promise.all( newInvoice.items.map( item => InvoiceItemService.createInvoiceItem( item.description, item.cost * margin ) ) );
    } else {
        newInvoice.items = [];
    }

    if ( boards.data ) {
        newInvoice.items = flatten( [ ...newInvoice.items,
            flatten( await Promise.all(
                boards.data.map( async board => Promise.all(
                    board.columns[ 0 ].tasks.map( task => InvoiceItemService.createInvoiceItem(
                        task.name, ( task.hours * project.pricePerPoint ) * margin,
                    ) ),
                ) ),
            ) ),
        ] );
    }

    newInvoice.total = newInvoice.items.reduce( ( total, item ) => total + item.cost, 0 );

    const invoice = await new Invoice( newInvoice ).save();
    await PdfService.generate( invoice, project );

    return invoice;
};

/**
 * Updates an invoice from the database
 *
 * @param {String} id the id of the invoice to update
 * @param {Object} invoice the new object with the updated values
 */
const updateInvoice = async ( id, invoice ) => Invoice.findOneAndUpdate( { _id: id }, invoice, { new: true } ).exec();

/**
 * Deletes an invoice from the database
 *
 * @param {String} id the id of the invoice to delete
 * @returns the deleted invoice or null if an error occurred
 */
const deleteInvoice = async id => Invoice.findByIdAndRemove( id ).exec();

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
