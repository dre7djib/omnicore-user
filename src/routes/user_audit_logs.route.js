import { Router } from 'express';
import { userAuditLogsController } from '../controllers/user_audit_logs.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserAuditLogSchema,
  updateUserAuditLogSchema,
} from '../validators/user_audit_logs.validator.js';

export const userAuditLogsRouter = Router();

/**
 * @swagger
 * /user-audit-logs:
 *   post:
 *     tags: [User Audit Logs]
 *     summary: Créer une entrée de log d'audit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserAuditLogInput'
 *     responses:
 *       201:
 *         description: Log créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAuditLog'
 *       400:
 *         description: Erreur de validation
 */
userAuditLogsRouter.post(
  '/',
  validateBody(createUserAuditLogSchema),
  asyncHandler(userAuditLogsController.create),
);

/**
 * @swagger
 * /user-audit-logs:
 *   get:
 *     tags: [User Audit Logs]
 *     summary: Lister tous les logs d'audit
 *     responses:
 *       200:
 *         description: Liste des logs d'audit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAuditLog'
 */
userAuditLogsRouter.get('/', asyncHandler(userAuditLogsController.list));

/**
 * @swagger
 * /user-audit-logs/{id}:
 *   get:
 *     tags: [User Audit Logs]
 *     summary: Récupérer un log d'audit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Log trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAuditLog'
 *       404:
 *         description: Log non trouvé
 */
userAuditLogsRouter.get('/:id', asyncHandler(userAuditLogsController.getById));

/**
 * @swagger
 * /user-audit-logs/{id}:
 *   put:
 *     tags: [User Audit Logs]
 *     summary: Mettre à jour un log d'audit
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
 *             $ref: '#/components/schemas/UpdateUserAuditLogInput'
 *     responses:
 *       200:
 *         description: Log mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAuditLog'
 *       404:
 *         description: Log non trouvé
 */
userAuditLogsRouter.put(
  '/:id',
  validateBody(updateUserAuditLogSchema),
  asyncHandler(userAuditLogsController.update),
);

/**
 * @swagger
 * /user-audit-logs/{id}:
 *   delete:
 *     tags: [User Audit Logs]
 *     summary: Supprimer un log d'audit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Log supprimé
 *       404:
 *         description: Log non trouvé
 */
userAuditLogsRouter.delete('/:id', asyncHandler(userAuditLogsController.remove));

