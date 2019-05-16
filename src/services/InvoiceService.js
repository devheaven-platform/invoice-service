const axios = require( "axios" );
const Invoice = require( "../models/Invoice" );
const ItemService = require( "./ItemService" );

const ProjectURI = process.env.PROJECT_MANAGEMENT_URI;
const TaskManagementURI = process.env.TASK_MANAGEMENT_URI;

/**
 * Creates a new Invoice and calls the project
 * management service to retrieve the project based on it's id,
 * also calls client service to retrieve the client based on it's id
 *
 * @param {Object} req the invoice that will be added
 * @returns the newly created invoice or null if an error occurred
 */
const createInvoice = async ( req ) => {
    const newInvoice = req;

    let project;
    let startDate;
    let endDate;
    let boards;

    await axios.get( `${ ProjectURI }/projects/${ newInvoice.project }` ).then( ( res ) => {
        project = res.data;
    } );

    if ( newInvoice.startMilestone ) {
        const milestone = project.milestones.find( x => x.id === newInvoice.startMilestone );
        if ( !milestone ) {
            return null;
        }
        startDate = milestone.date;
    }
    if ( newInvoice.endMilestone ) {
        const milestone = project.milestones.find( x => x.id === newInvoice.endMilestone );
        if ( !milestone ) {
            return null;
        }
        endDate = milestone.date;
    }

    // TODO: send event to client-service to retrieve the client
    // TODO: send event to task management service to retrieve the tasks

    // await axios.get( `${ TaskManagementURI }/boards/for/${ newInvoice.project }?start=${ startDate }&end=${ endDate }` ).then( ( res ) => {
    //     boards = res.data;
    // } );

    const margin = 1 + ( project.invoiceMargin / 100 );

    const items = await Promise.all( req.items.map( item => ItemService.createItem( item.description, item.cost * margin ) ) );
    newInvoice.items = items.map( res => res );

    newInvoice.total = newInvoice.items.reduce( ( total, item ) => total + item.cost, 0 );

    const invoice = await new Invoice( newInvoice ).save();

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

const updateInvoice = async ( id, invoice ) => Invoice.findOneAndUpdate( { _id: id }, invoice, { new: true } ).exec();

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
};
