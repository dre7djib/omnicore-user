import { Router } from 'express';
import { rolesController } from '../controllers/roles.controller.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';

export const rolesRouter = Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     tags: [Roles]
 *     summary: Créer un rôle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Rôle créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Erreur de validation
 */
rolesRouter.post('/', asyncHandler(rolesController.create));

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Lister tous les rôles
 *     responses:
 *       200:
 *         description: Liste des rôles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
rolesRouter.get('/', asyncHandler(rolesController.list));

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Récupérer un rôle par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Rôle trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rôle non trouvé
 */
rolesRouter.get('/:id', asyncHandler(rolesController.getById));

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Mettre à jour un rôle
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
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rôle non trouvé
 */
rolesRouter.put('/:id', asyncHandler(rolesController.update));

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Supprimer un rôle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Rôle supprimé
 *       404:
 *         description: Rôle non trouvé
 */
rolesRouter.delete('/:id', asyncHandler(rolesController.remove));

