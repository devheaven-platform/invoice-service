const axios = require( "axios" );
const querystring = require( "querystring" );
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
const createInvoice = async ( data ) => {
    const newInvoice = data;

    const { data: project } = await axios.get( `${ projectUri }/projects/${ newInvoice.project }` );
    const startDate = await getInvoiceStartDate( newInvoice, project );
    const endDate = await getInvoiceEndDate( newInvoice, project );
    console.log( `${ taskUri }/boards/for/${ newInvoice.project }${ createQueryString( { start: startDate, end: endDate } ) }` );
    const boards = await axios.get( `${ taskUri }/boards/for/${ newInvoice.project }?${ querystring.stringify( { start: startDate, end: endDate } ) }` );
    console.log( boards.data );
    // TODO: retrieve client from the client service

    const margin = 1 + ( project.invoiceMargin / 100 );

    if ( newInvoice.items ) {
        newInvoice.items = await Promise.all( newInvoice.items.map( item => InvoiceItemService.createInvoiceItem( item.description, item.cost * margin ) ) );
        newInvoice.total = newInvoice.items.reduce( ( total, item ) => total + item.cost, 0 );
    }

    newInvoice.items = [ ...newInvoice.items,
        flatten( await Promise.all(
            boards.data.boards.map( async board => Promise.all(
                board.columns[ 0 ].tasks.map( task => InvoiceItemService.createInvoiceItem(
                    task.name, ( task.hours * project.pricePerPoint ) * margin,
                ) ),
            ) ),
        ) ),
    ];

    const invoice = await new Invoice( newInvoice ).save();
    await PdfService.generate( invoice, project );

    return invoice;
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
};
