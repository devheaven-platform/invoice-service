const { expect, should } = require( "chai" );

const InvoiceService = require( "../../src/services/InvoiceService" );

describe( "InvoiceService", () => {
    describe( "createInvoice", () => {
        it( "should create a invoice", async () => {
            const newInvoice = {
                client: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };

            const invoice = await InvoiceService.createInvoice( newInvoice );

            expect( invoice.client ).to.equal( newInvoice.client );
            expect( invoice.project ).to.equal( newInvoice.project );
            should().exist( invoice.id );
        } );
    } );
} );
