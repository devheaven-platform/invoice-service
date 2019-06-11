const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const authMiddleware = require( "../config/middleware/Auth" );
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
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Invoices
 */
router.get( "/", authMiddleware, asyncMiddleware( controller.getAllInvoices ) );

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
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Invoices
 */
router.get( "/:id", authMiddleware, asyncMiddleware( controller.getInvoiceById ) );

/**
 * @swagger
 * /invoices/pdf/{id}:
 *    get:
 *      operationId: GetPdfByInvoiceId
 *      summary: Returns the pdf for an invoice
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the invoice to retrieve the pdf for
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/pdf:
 *                schema:
 *                  type: string
 *                  format: binary
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
router.get( "/pdf/:id", asyncMiddleware( controller.getPdfByInvoiceId ) );

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
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Invoices
 */
router.post( "/", authMiddleware, asyncMiddleware( controller.createInvoice ) );

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
 *                archived:
 *                  type: boolean
 *                  description: Wheter the invoice is archived
 *                  example: false
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
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Invoices
 */
router.patch( "/:id", authMiddleware, asyncMiddleware( controller.updateInvoice ) );

/**
 * @swagger
 * /invoices/{id}:
 *    delete:
 *      operationId: DeleteInvoice
 *      summary: Delete one invoice
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the invoice to delete
 *      responses:
 *          '204':
 *            description: No Content
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Invoices
 */
router.delete( "/:id", authMiddleware, asyncMiddleware( controller.deleteInvoice ) );

module.exports = router;
