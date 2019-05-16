const Item = require( "../models/Item" );

const createItem = async ( description, cost ) => {
    const newItem = {
        description,
        cost,
    };
    const item = await new Item( newItem ).save();

    return item;
};

const getItemById = async id => Item.findById( id ).exec();

module.exports = {
    createItem,
    getItemById,
};
