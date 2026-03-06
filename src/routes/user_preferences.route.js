import { Router } from 'express';
import { userPreferencesController } from '../controllers/user_preferences.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserPreferenceSchema,
  updateUserPreferenceSchema,
} from '../validators/user_preferences.validator.js';

export const userPreferencesRouter = Router();

/**
 * @swagger
 * /user-preferences:
 *   post:
 *     tags: [User Preferences]
 *     summary: Créer des préférences utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserPreferenceInput'
 *     responses:
 *       201:
 *         description: Préférences créées
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreference'
 *       400:
 *         description: Erreur de validation
 */
userPreferencesRouter.post(
  '/',
  validateBody(createUserPreferenceSchema),
  asyncHandler(userPreferencesController.create),
);

/**
 * @swagger
 * /user-preferences:
 *   get:
 *     tags: [User Preferences]
 *     summary: Lister toutes les préférences
 *     responses:
 *       200:
 *         description: Liste des préférences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPreference'
 */
userPreferencesRouter.get('/', asyncHandler(userPreferencesController.list));

/**
 * @swagger
 * /user-preferences/{id}:
 *   get:
 *     tags: [User Preferences]
 *     summary: Récupérer des préférences par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Préférences trouvées
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreference'
 *       404:
 *         description: Non trouvé
 */
userPreferencesRouter.get('/:id', asyncHandler(userPreferencesController.getById));

/**
 * @swagger
 * /user-preferences/{id}:
 *   put:
 *     tags: [User Preferences]
 *     summary: Mettre à jour des préférences
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
 *             $ref: '#/components/schemas/UpdateUserPreferenceInput'
 *     responses:
 *       200:
 *         description: Préférences mises à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreference'
 *       404:
 *         description: Non trouvé
 */
userPreferencesRouter.put(
  '/:id',
  validateBody(updateUserPreferenceSchema),
  asyncHandler(userPreferencesController.update),
);

/**
 * @swagger
 * /user-preferences/{id}:
 *   delete:
 *     tags: [User Preferences]
 *     summary: Supprimer des préférences
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Préférences supprimées
 *       404:
 *         description: Non trouvé
 */
userPreferencesRouter.delete('/:id', asyncHandler(userPreferencesController.remove));

