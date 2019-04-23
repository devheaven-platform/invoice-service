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
 *         issuedAt:
 *           type: string
 *           description: Date of issuing
 *           example: 2019-01-01T00:00:00.000Z
 *         invoiceItems:
 *           type: array
 *           description: A list containing the invoice item id's
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
    invoiceItems: [ {
        type: String,
        ref: "InvoiceItem",
    } ],
}, { timestamps: true } );

Invoice.set( "toJSON", {
    virtuals: true,
    vesionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "Invoice", Invoice );
