const Item = require( "../models/Item" );

const createItem = async ( newItem ) => {
    const item = await new Item( newItem ).save();

    return item;
};

const getItemById = async id => Item.findById( id ).exec();

module.exports = {
    createItem,
    getItemById,
};
