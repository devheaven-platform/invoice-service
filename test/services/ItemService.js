const { expect, should } = require( "chai" );

const ItemService = require( "../../src/services/ItemService" );

describe( "ItemService", () => {
    describe( "createItem", () => {
        it( "should create a item", async () => {
            const testItem = {
                description: "test",
                hours: 5,
            };

            const item = await ItemService.createItem( testItem );

            expect( item.description ).to.equal( testItem.description );
            expect( item.hours ).to.equal( testItem.hours );
            should().exist( item.id );
        } );
    } );

    describe( "getItemById", () => {
        it( "Should return a single item", async () => {
            const testItem = {
                description: "test",
                hours: 4,
            };

            const { id } = await ItemService.createItem( testItem );

            const item = await ItemService.getItemById( id );

            expect( item.description ).to.equal( testItem.description );
            expect( item.hours ).to.equal( testItem.hours );
        } );

        it( "Should return null if no item is found", async () => {
            const item = await ItemService.getItemById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( item );
        } );
    } );
} );
