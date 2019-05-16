const Item = require( "../models/Item" );

const createItem = async ( description, cost ) => {
    const newItem = {
        description,
        cost,
    };
    return new Item( newItem ).save();
};

const getItemById = async id => Item.findById( id ).exec();

module.exports = {
    createItem,
    getItemById,
};
