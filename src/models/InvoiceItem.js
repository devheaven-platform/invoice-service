/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *   schemas:
 *     FacturedItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the invoice
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         description:
 *           type: string
 *           description: The description of the specific task
 *           example: Create board
 *         hours:
 *           type: number
 *           description: The amount of hours worked on the specific task
 *           example: 10
 *
 *       required:
 *         - description
 *         - hours
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
    hours: {
        type: Number,
        required: true,
    },
}, { timestamps: true } );

InvoiceItem.set( "toJSON", {
    virtuals: true,
    vesionKey: false,
    transform: ( doc, ret ) => { delete ret._id; },
} );

module.exports = mongoose.model( "InvoiceItem", InvoiceItem );
