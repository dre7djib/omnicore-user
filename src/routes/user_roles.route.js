import { Router } from 'express';
import { userRolesController } from '../controllers/user_roles.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserRoleSchema,
  updateUserRoleSchema,
} from '../validators/user_roles.validator.js';

export const userRolesRouter = Router();

/**
 * @swagger
 * /user-roles:
 *   post:
 *     tags: [User Roles]
 *     summary: Assigner un rôle à un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRoleInput'
 *     responses:
 *       201:
 *         description: Association créée
 *       400:
 *         description: Erreur de validation
 */
userRolesRouter.post(
  '/',
  validateBody(createUserRoleSchema),
  asyncHandler(userRolesController.create),
);

/**
 * @swagger
 * /user-roles:
 *   get:
 *     tags: [User Roles]
 *     summary: Lister toutes les associations utilisateur-rôle
 *     responses:
 *       200:
 *         description: Liste des associations
 */
userRolesRouter.get('/', asyncHandler(userRolesController.list));

/**
 * @swagger
 * /user-roles/{userId}:
 *   get:
 *     tags: [User Roles]
 *     summary: Récupérer les rôles d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Rôles de l'utilisateur
 *       404:
 *         description: Non trouvé
 */
userRolesRouter.get('/:userId', asyncHandler(userRolesController.getByIds));

/**
 * @swagger
 * /user-roles/{userId}:
 *   put:
 *     tags: [User Roles]
 *     summary: Mettre à jour l'association utilisateur-rôle
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRoleInput'
 *     responses:
 *       200:
 *         description: Association mise à jour
 *       404:
 *         description: Non trouvé
 */
userRolesRouter.put(
  '/:userId',
  validateBody(updateUserRoleSchema),
  asyncHandler(userRolesController.update),
);

/**
 * @swagger
 * /user-roles/{userId}:
 *   delete:
 *     tags: [User Roles]
 *     summary: Supprimer une association utilisateur-rôle
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Association supprimée
 *       404:
 *         description: Non trouvé
 */
userRolesRouter.delete('/:userId', asyncHandler(userRolesController.remove));

