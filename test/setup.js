const mongoose = require( "mongoose" );
const { MongoMemoryServer } = require( "mongodb-memory-server" );

const axios = require( "axios" );
const MockAdapter = require( "axios-mock-adapter" );

const mock = new MockAdapter( axios );

const ProjectURI = process.env.PROJECT_MANAGEMENT_URI;

let mongoServer;

before( ( done ) => {
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString()
        .then( mongoUri => mongoose.connect( mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } )
            .then( done() )
            .catch( error => done( error ) ) );

    mock.onGet( `${ ProjectURI }/projects/8d50a412-3f38-458e-be0e-06f0e084afb7` ).reply( 200, {
        id: "8d50a412-3f38-458e-be0e-06f0e084afb7",
        invoiceMargin: 20,
        milestones: [
            {
                id: "8d50a412-3f38-458e-be0e-06f0e084aaaa",
            },
            {
                id: "8d50a412-3f38-458e-be0e-06f0e084abbb",
            },
        ],
    } );
} );

after( () => {
    mongoose.disconnect();
    mongoServer.stop();
} );

afterEach( async () => {
    await mongoose.connection.dropDatabase();
} );
