const InvoiceItem = require( "../models/InvoiceItem" );

const getInvoiceItemById = async id => InvoiceItem.findById( id ).exec();

const createInvoiceItem = async ( description, cost ) => {
    const newItem = {
        description,
        cost,
    };
    return new InvoiceItem( newItem ).save();
};

module.exports = {
    getInvoiceItemById,
    createInvoiceItem,
};
