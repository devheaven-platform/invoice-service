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

    describe( "getAllInvoices", async () => {
        before( async () => {
            const testInvoice1 = {
                client: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
            };
            const testInvoice2 = {
                client: "8d50a412-3f38-458e-be0e-06f0e084afee",
                project: "8d50a412-3f38-458e-be0e-06f0e084afee",
            };

            await InvoiceService.createInvoice( testInvoice1 );
            await InvoiceService.createInvoice( testInvoice2 );
        } );

        it( "Should retrieve all of the invoices described above", async () => {
            const invoices = await InvoiceService.getAllInvoices();

            expect( invoices.length ).to.equal( 2 );
            expect( invoices[ 0 ].client ).to.equal( "8d50a412-3f38-458e-be0e-06f0e084afb7" );
            expect( invoices[ 1 ].client ).to.equal( "8d50a412-3f38-458e-be0e-06f0e084afee" );
        } );
    } );
} );
