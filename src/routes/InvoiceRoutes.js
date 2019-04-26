const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/async" );
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
 *                client:
 *                  type: string
 *                  description: The id of the client of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                project:
 *                  type: string
 *                  description: The id of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *              required:
 *                - client
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

/**
 * @swagger
 * /invoices/{id}:
 *    patch:
 *      operationId: UpdateInvoice
 *      summary: Update a existing invoice
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the invoice to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                client:
 *                  type: string
 *                  description: The id of the client of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                project:
 *                  type: string
 *                  description: The id of the project
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
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
router.patch( "/", asyncMiddleware( controller.updateInvoice ) );

module.exports = router;
