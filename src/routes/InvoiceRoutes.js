const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const controller = require( "../controllers/InvoiceController" );

/**
 * @swagger
 * tags:
 *   - name: Invoices
 *     description: All invoice related routes
 */
const router = express.Router();

/**
 * @swagger
 * /invoices/:
 *    get:
 *      operationId: GetAllInvoices
 *      summary: Returns a list of invoices
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Invoice'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Invoices
 */
router.get( "/", asyncMiddleware( controller.getAllInvoices ) );

/**
 * @swagger
 * /invoices/{id}:
 *    get:
 *      operationId: GetInvoiceById
 *      summary: Returns a single invoice
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the invoice to retrieve
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Invoice'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Invoices
 */
router.get( "/:id", asyncMiddleware( controller.getInvoiceById ) );

/**
 * @swagger
 * /invoices/:
 *    post:
 *      operationId: CreateInvoice
 *      summary: Create a invoice
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                project:
 *                  type: string
 *                  description: The id of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                name:
 *                  type: string
 *                  description: The name of the invoice
 *                  example: Project 1 invoice
 *                startMilestone:
 *                  type: string
 *                  description: The id of the startMilestone
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                endMilestone:
 *                  type: string
 *                  description: The id of the startMilestone
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                items:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      description:
 *                        type: string
 *                        description: The description of the item
 *                        example: Hosting
 *                      cost:
 *                        type: number
 *                        description: The cost of the item
 *                        example: 10
 *              required:
 *                - project
 *      responses:
 *          '204':
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Invoice'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Invoices
 */
router.post( "/", asyncMiddleware( controller.createInvoice ) );

module.exports = router;
