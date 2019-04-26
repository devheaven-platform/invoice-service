/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the invoice
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         client:
 *           type: string
 *           description: The id of the client of the project
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         project:
 *           type: string
 *           description: The id of the project
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         total:
 *           type: number
 *           description: The amount that is being billed to the client
 *           example: 1000
 *         path:
 *           type: string
 *           description: Path to the generated pdf file
 *           example: localhost:8080/pdf/55417624-c159-4eab-9260-d4679a2e9b31
 *         items:
 *           type: array
 *           description: A list containing the item id's
 *           items:
 *             type: string
 *       required:
 *         - client
 *         - project
 *         - createdAt
 *         - updatedAt
 */
const Invoice = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    client: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
    path: {
        type: String,
    },
    items: [ {
        type: String,
        ref: "Item",
    } ],
}, { timestamps: true } );

Invoice.set( "toJSON", {
    virtuals: true,
    vesionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "Invoice", Invoice );
/* eslint-enable no-underscore-dangle, no-param-reassign */
