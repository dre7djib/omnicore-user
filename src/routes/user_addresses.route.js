import { Router } from 'express';
import { userAddressesController } from '../controllers/user_addresses.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserAddressSchema,
  updateUserAddressSchema,
} from '../validators/user_addresses.validator.js';

export const userAddressesRouter = Router();

/**
 * @swagger
 * /user-addresses:
 *   post:
 *     tags: [User Addresses]
 *     summary: Créer une adresse utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserAddressInput'
 *     responses:
 *       201:
 *         description: Adresse créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAddress'
 *       400:
 *         description: Erreur de validation
 */
userAddressesRouter.post(
  '/',
  validateBody(createUserAddressSchema),
  asyncHandler(userAddressesController.create),
);

/**
 * @swagger
 * /user-addresses:
 *   get:
 *     tags: [User Addresses]
 *     summary: Lister toutes les adresses
 *     responses:
 *       200:
 *         description: Liste des adresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAddress'
 */
userAddressesRouter.get('/', asyncHandler(userAddressesController.list));

/**
 * @swagger
 * /user-addresses/{id}:
 *   get:
 *     tags: [User Addresses]
 *     summary: Récupérer une adresse par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Adresse trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAddress'
 *       404:
 *         description: Adresse non trouvée
 */
userAddressesRouter.get('/:id', asyncHandler(userAddressesController.getById));

/**
 * @swagger
 * /user-addresses/{id}:
 *   put:
 *     tags: [User Addresses]
 *     summary: Mettre à jour une adresse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserAddressInput'
 *     responses:
 *       200:
 *         description: Adresse mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAddress'
 *       404:
 *         description: Adresse non trouvée
 */
userAddressesRouter.put(
  '/:id',
  validateBody(updateUserAddressSchema),
  asyncHandler(userAddressesController.update),
);

/**
 * @swagger
 * /user-addresses/{id}:
 *   delete:
 *     tags: [User Addresses]
 *     summary: Supprimer une adresse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Adresse supprimée
 *       404:
 *         description: Adresse non trouvée
 */
userAddressesRouter.delete('/:id', asyncHandler(userAddressesController.remove));

