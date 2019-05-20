const { expect, should } = require( "chai" );

const Invoice = require( "../../src/models/Invoice" );
const InvoiceItem = require( "../../src/models/InvoiceItem" );
const InvoiceService = require( "../../src/services/InvoiceService" );

describe( "InvoiceService", () => {
    // describe( "createInvoice", () => {
    //     it( "should create a invoice", async () => {
    //         const newInvoice = {
    //             project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
    //             name: "TestInvoice",
    //             items: [
    //                 {
    //                     description: "Test item 1",
    //                     cost: 10,
    //                 },
    //                 {
    //                     description: "Test item 2",
    //                     cost: 15,
    //                 },
    //             ],
    //         };

    //         const invoice = await InvoiceService.createInvoice( newInvoice );

    //         expect( invoice.client ).to.equal( newInvoice.client );
    //         expect( invoice.project ).to.equal( newInvoice.project );
    //         expect( invoice.total ).to.equal( 60 );
    //         expect( invoice.items.length ).to.equal( 3 );
    //         should().exist( invoice.id );
    //     } );
    // } );

    describe( "getAllInvoices", async () => {
        before( async () => {
            const testInvoice1 = {
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                name: "Test invoice 1",
            };
            const testInvoice2 = {
                project: "8d50a412-3f38-458e-be0e-06f0e084afee",
                name: "Test invoice 2",
            };

            await new Invoice( testInvoice1 ).save();
            await new Invoice( testInvoice2 ).save();
        } );

        it( "Should retrieve all of the invoices described above", async () => {
            const invoices = await InvoiceService.getAllInvoices();

            expect( invoices.length ).to.equal( 2 );
            expect( invoices[ 0 ].project ).to.equal( "8d50a412-3f38-458e-be0e-06f0e084afb7" );
            expect( invoices[ 0 ].name ).to.equal( "Test invoice 1" );
            expect( invoices[ 1 ].project ).to.equal( "8d50a412-3f38-458e-be0e-06f0e084afee" );
            expect( invoices[ 1 ].name ).to.equal( "Test invoice 2" );
        } );
    } );

    describe( "getInvoiceById", () => {
        it( "Should return a single invoice", async () => {
            const item = await new InvoiceItem( {
                description: "test",
                cost: 4,
            } ).save();

            const testInvoice = {
                project: "8d50a412-3f38-458e-be0e-06f0e084afee",
                name: "Test invoice 1",
                items: [
                    item.id,
                ],
            };
            const { id } = await new Invoice( testInvoice ).save();

            const invoice = await InvoiceService.getInvoiceById( id );

            expect( invoice.name ).to.equal( testInvoice.name );
            expect( invoice.project ).to.equal( testInvoice.project );
            expect( invoice.items[ 0 ].description ).to.equal( item.description );
            expect( invoice.items[ 0 ].cost ).to.equal( item.cost );
        } );

        it( "Should return null if no invoice is found", async () => {
            const invoice = await InvoiceService.getInvoiceById( "8d50a412-3f38-458e-be0e-06f0e084afb7" );

            should().not.exist( invoice );
        } );
    } );

    describe( "updateInvoice", async () => {
        it( "Should update a invoice", async () => {
            const testInvoice1 = {
                project: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                name: "Test invoice 1",
            };

            const { id } = await new Invoice( testInvoice1 ).save();

            const invoice = await InvoiceService.updateInvoice( id, {
                archived: true,
            } );

            expect( invoice.archived ).to.equal( true );
            expect( invoice.name ).to.equal( testInvoice1.name );
            expect( invoice.project ).to.equal( testInvoice1.project );
        } );
    } );
} );
