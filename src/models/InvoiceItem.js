/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the invoice
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         description:
 *           type: string
 *           description: The description of the specific item
 *           example: Hosting
 *         cost:
 *           type: number
 *           description: The cost of the specific item
 *           example: 10
 *       required:
 *         - description
 *         - cost
 *         - createdAt
 *         - updatedAt
 */
const InvoiceItem = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
}, { timestamps: true } );

InvoiceItem.set( "toJSON", {
    virtuals: true,
    vesionKey: false,
    transform: ( doc, ret ) => { delete ret._id; delete ret.__v; },
} );

module.exports = mongoose.model( "InvoiceItem", InvoiceItem );
/* eslint-enable no-underscore-dangle, no-param-reassign */
