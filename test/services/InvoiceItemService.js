const { expect, should } = require( "chai" );

const InvoiceItem = require( "../../src/models/InvoiceItem" );
const InvoiceItemService = require( "../../src/services/InvoiceItemService" );

describe( "ItemService", () => {
    describe( "createItem", () => {
        it( "should create a item", async () => {
            const testItem = {
                description: "test",
                cost: 5,
            };

            const item = await InvoiceItemService.createInvoiceItem( testItem.description, testItem.cost );

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

            const { id } = await new InvoiceItem( testItem ).save();

            const item = await InvoiceItemService.getInvoiceItemById( id );

            expect( item.description ).to.equal( testItem.description );
            expect( item.cost ).to.equal( testItem.cost );
        } );

        it( "Should return null if no item is found", async () => {
            const item = await InvoiceItemService.getInvoiceItemById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( item );
        } );
    } );
} );
