const { expect, should } = require( "chai" );

const ItemService = require( "../../src/services/ItemService" );
const Item = require( "../../src/models/Item" );

describe( "ItemService", () => {
    describe( "createItem", () => {
        it( "should create a item", async () => {
            const testItem = {
                description: "test",
                cost: 5,
            };

            const item = await ItemService.createItem( testItem.description, testItem.cost );

            expect( item.description ).to.equal( testItem.description );
            expect( item.cost ).to.equal( testItem.cost );
            should().exist( item.id );
        } );
    } );

    describe( "getItemById", () => {
        it( "Should return a single item", async () => {
            const testItem = {
                description: "test",
                cost: 4,
            };

            const { id } = await new Item( testItem ).save();

            const item = await ItemService.getItemById( id );

            expect( item.description ).to.equal( testItem.description );
            expect( item.cost ).to.equal( testItem.cost );
        } );

        it( "Should return null if no item is found", async () => {
            const item = await ItemService.getItemById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( item );
        } );
    } );
} );
